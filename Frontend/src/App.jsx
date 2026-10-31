import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import BoothManagement from './pages/BoothManagement'
import Layout from './components/layout/Layout'


export default function App() {
  return (
      <Routes>
      {/* <Route path="/" element={<Login />} /> */}

      <Route element={<Layout />}>
        <Route path="/" element={<BoothManagement />} />
      </Route>
    </Routes>
  )
}
