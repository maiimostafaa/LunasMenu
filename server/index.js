import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { randomUUID, randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { readSpecials, writeSpecials } from './data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load server/.env explicitly by absolute path rather than relying on the
// process's working directory — systemd and `npm run start` from the repo
// root both launch this file with the project root as cwd, which would
// otherwise cause dotenv to silently miss server/.env.
dotenv.config({ path: path.join(__dirname, '.env') })

const PORT = process.env.PORT || 3000
const EDIT_PIN = process.env.EDIT_PIN || '1234'

if (!process.env.EDIT_PIN) {
  console.warn('[specials-board] EDIT_PIN not set in server/.env — using the default "1234". Change this before it goes live.')
}

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(cors())
app.use(express.json())

// --- very small session-token auth ---------------------------------------
// One shared PIN unlocks editing. On success we hand back a random token
// that lives in memory for the life of the process; the phone stores it and
// sends it back as a Bearer token on writes. This is deliberately simple:
// there's one board, one PIN, and the worst case is someone on your WiFi
// edits the specials, not a real security boundary.
const validTokens = new Set()

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (token && validTokens.has(token)) return next()
  return res.status(401).json({ error: 'Not authorized. Enter the PIN again.' })
}

app.post('/api/login', (req, res) => {
  const { pin } = req.body || {}
  if (pin !== EDIT_PIN) {
    return res.status(401).json({ error: 'Wrong PIN' })
  }
  const token = randomBytes(24).toString('hex')
  validTokens.add(token)
  res.json({ token })
})

// --- specials data ----------------------------------------------------------
app.get('/api/specials', (req, res) => {
  res.json(readSpecials())
})

app.post('/api/specials', requireAuth, (req, res) => {
  const { title, items } = req.body || {}
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' })
  }
  const cleanItems = items
    .filter((it) => it && typeof it.name === 'string' && it.name.trim().length > 0)
    .map((it) => ({
      id: it.id || randomUUID(),
      name: it.name.trim(),
      price: Number(it.price) || 0,
      active: it.active !== false,
    }))

  const data = writeSpecials({
    title: typeof title === 'string' && title.trim() ? title.trim() : 'Daily Specials',
    items: cleanItems,
  })

  io.emit('specials:update', data)
  res.json(data)
})

// --- serve the built React app in production ---------------------------
const clientDist = path.join(__dirname, '..', 'client', 'dist')
if (existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Client build not found. Run "npm run build" from the project root, or "npm run dev" for local development.')
  })
}

io.on('connection', (socket) => {
  // Nothing to do on connect — clients fetch current state over REST and
  // then just listen here for future changes.
  socket.on('disconnect', () => {})
})

httpServer.listen(PORT, () => {
  console.log(`[specials-board] listening on http://localhost:${PORT}`)
})
