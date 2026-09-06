import { useEffect, useState } from 'react'
import { fetchSpecials, connectSocket } from '../api.js'
import { CoffeeMug, FriedEgg, PancakeStack, OliveBranch, SwirlDivider } from '../components/Doodles.jsx'

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
      <CoffeeMug className="board-corner top-left" />
      <FriedEgg className="board-corner top-right" />
      <PancakeStack className="board-corner bottom-left" />
      <OliveBranch className="board-corner bottom-right" />

      <div className="board-title-row">
        <span>»</span>
        <h1 className="board-title">{data?.title || 'Daily Specials'}</h1>
        <span>«</span>
      </div>

      <SwirlDivider className="board-divider" />

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
