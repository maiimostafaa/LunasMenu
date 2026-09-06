import { useEffect, useRef, useState } from 'react'
import { fetchSpecials, connectSocket } from '../api.js'

export default function Display() {
  const [data, setData] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    fetchSpecials().then(setData).catch(() => {})
    const disconnect = connectSocket(setData)
    return disconnect
  }, [])

  const items = (data?.items || []).filter((it) => it.active !== false)

  // Count-based sizing lives in CSS; this only steps in when one long item
  // name would still overflow horizontally at that size.
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled || !listRef.current) return
      el.style.removeProperty('--width-scale')
      const widest = Math.max(0, ...[...el.children].map((li) => li.scrollWidth))
      const available = window.innerWidth * 0.78
      if (widest > available) {
        el.style.setProperty('--width-scale', (available / widest).toFixed(3))
      }
    })
    return () => {
      cancelled = true
    }
  }, [items.map((it) => it.name + it.price).join('|')])

  return (
    <div className="board">
      <img className="board-doodle top-left" src="/doodles/coffee.svg" alt="" />
      <img className="board-doodle top-right" src="/doodles/egg.svg" alt="" />
      <img className="board-doodle bottom-left" src="/doodles/pancakes.svg" alt="" />
      <img className="board-doodle bottom-right" src="/doodles/olive-branch.svg" alt="" />
      <img className="board-doodle mid-left" src="/doodles/sparkles-left.svg" alt="" />
      <img className="board-doodle mid-right" src="/doodles/sparkles-right.svg" alt="" />
      <img className="board-doodle bottom-center" src="/doodles/bottom-heart.svg" alt="" />

      <div className="board-title-row">
        <img className="spark" src="/doodles/spark-left.svg" alt="" />
        <h1 className="board-title">{data?.title || 'Daily Specials'}</h1>
        <img className="spark" src="/doodles/spark-right.svg" alt="" />
      </div>

      {items.length === 0 ? (
        <p className="board-empty">No specials posted yet — add some from the edit page.</p>
      ) : (
        <ul className="board-list" ref={listRef} style={{ '--item-count': items.length }}>
          {items.map((item) => (
            <li key={item.id} className="board-item">
              {item.name.toUpperCase()}
              <span className="price">${Number(item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
