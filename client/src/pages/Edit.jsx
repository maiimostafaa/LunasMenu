import { useEffect, useState } from 'react'
import { fetchSpecials, saveSpecials, login } from '../api.js'

const TOKEN_KEY = 'specials-board-token'

// crypto.randomUUID only exists on secure origins (https/localhost); phones
// load this page over plain http from the Pi, so fall back to a cheap id.
function makeId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function emptyItem() {
  return { id: makeId(), name: '', price: '', active: true }
}

export default function Edit() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')

  const [title, setTitle] = useState('Daily Specials')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchSpecials()
      .then((data) => {
        setTitle(data.title || 'Daily Specials')
        setItems(data.items || [])
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    setPinError('')
    try {
      const { token: newToken } = await login(pin)
      localStorage.setItem(TOKEN_KEY, newToken)
      setToken(newToken)
    } catch (err) {
      setPinError(err.message)
    }
  }

  function updateItem(id, patch) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()])
  }

  function moveItem(index, direction) {
    setItems((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  async function handleSave() {
    setStatus('Saving...')
    try {
      await saveSpecials(token, { title, items })
      setStatus('Saved — the TV should update now.')
    } catch (err) {
      if (err.message?.toLowerCase().includes('not authorized')) {
        // Token expired (server restarted) — send them back to the PIN screen.
        localStorage.removeItem(TOKEN_KEY)
        setToken('')
      }
      setStatus(`Couldn't save: ${err.message}`)
    }
    setTimeout(() => setStatus(''), 4000)
  }

  if (!token) {
    return (
      <div className="edit-page">
        <h1 className="edit-header">Unlock Editing</h1>
        <form className="pin-form" onSubmit={handleLogin}>
          <input
            type="password"
            inputMode="numeric"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
          />
          <button className="btn" type="submit">Unlock</button>
          <p className="error-text">{pinError}</p>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="edit-page">
        <h1 className="edit-header">Loading…</h1>
      </div>
    )
  }

  return (
    <div className="edit-page">
      <h1 className="edit-header">Edit Specials</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Board title"
        style={{
          width: '100%',
          fontSize: '1.1rem',
          padding: 10,
          borderRadius: 8,
          border: '1px solid var(--muted)',
          background: '#262420',
          color: 'var(--fg)',
          marginBottom: 16,
        }}
      />

      {items.map((item, index) => (
        <div className={`item-row${item.active === false ? ' inactive' : ''}`} key={item.id}>
          <input
            type="text"
            placeholder="Item name"
            value={item.name}
            onChange={(e) => updateItem(item.id, { name: e.target.value })}
          />
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={item.price}
            onChange={(e) => updateItem(item.id, { price: e.target.value })}
          />
          <div className="row-actions">
            <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label="Move up">▲</button>
            <button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} aria-label="Move down">▼</button>
          </div>
          <button
            type="button"
            className="btn small secondary"
            onClick={() => updateItem(item.id, { active: item.active === false })}
            title={item.active === false ? 'Hidden from the board — tap to show' : 'Visible on the board — tap to hide'}
          >
            {item.active === false ? 'Hidden' : 'Shown'}
          </button>
          <button type="button" className="delete-btn" onClick={() => removeItem(item.id)} aria-label="Delete">✕</button>
        </div>
      ))}

      <button type="button" className="btn secondary" onClick={addItem} style={{ width: '100%', marginTop: 8 }}>
        + Add item
      </button>

      <p className="save-status">{status}</p>

      <div className="edit-footer">
        <button type="button" className="btn" onClick={handleSave}>Save to TV</button>
      </div>
    </div>
  )
}
