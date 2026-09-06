import { useEffect, useState } from 'react'
import { fetchSpecials, connectSocket } from '../api.js'

export default function Display() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchSpecials().then(setData).catch(() => {})
    const disconnect = connectSocket(setData)
    return disconnect
  }, [])

  const items = (data?.items || []).filter((it) => it.active !== false)

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
        <ul className="board-list">
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
