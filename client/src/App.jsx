import { Routes, Route, Navigate } from 'react-router-dom'
import Display from './pages/Display.jsx'
import Edit from './pages/Edit.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/display" replace />} />
      <Route path="/display" element={<Display />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  )
}
