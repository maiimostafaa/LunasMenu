import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'specials.json')
const SEED_FILE = path.join(DATA_DIR, 'default-seed.json')

function ensureSeeded() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  if (!existsSync(DATA_FILE)) {
    const seed = readFileSync(SEED_FILE, 'utf-8')
    writeFileSync(DATA_FILE, seed)
  }
}

export function readSpecials() {
  ensureSeeded()
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
}

export function writeSpecials(data) {
  // Write to a temp file first and rename over the real one, so a crash or
  // power loss mid-write can't corrupt the board (the Pi won't always shut
  // down cleanly).
  const tmpFile = `${DATA_FILE}.tmp`
  writeFileSync(tmpFile, JSON.stringify(data, null, 2))
  renameSync(tmpFile, DATA_FILE)
  return data
}
