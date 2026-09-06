import { io } from 'socket.io-client'

// In dev, Vite's proxy (see vite.config.js) forwards these to the Express
// server on :3000. In production the client is served BY that same server,
// so relative paths just work with no config needed.

export async function fetchSpecials() {
  const res = await fetch('/api/specials')
  if (!res.ok) throw new Error('Failed to load specials')
  return res.json()
}

export async function login(pin) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Login failed')
  }
  return res.json() // { token }
}

export async function saveSpecials(token, data) {
  const res = await fetch('/api/specials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Save failed')
  }
  return res.json()
}

export function connectSocket(onUpdate) {
  const socket = io('/', { path: '/socket.io' })
  socket.on('specials:update', onUpdate)
  return () => socket.disconnect()
}
