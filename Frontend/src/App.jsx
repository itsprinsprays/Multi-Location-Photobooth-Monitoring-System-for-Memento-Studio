import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import BoothManagement from './pages/BoothManagement'
import Layout from './components/layout/Layout'
import BoothArchived from './components/ui/Booth Management/BoothArchived'
import UserManagement from './pages/UserManagement'

export default function App() {
  return (
      <Routes>
      {/* <Route path="/" element={<Login />} /> */}

      <Route element={<Layout />}>
        <Route path="/booth-fleet-management" element={<BoothManagement />} />
        <Route path="/archived-booths" element={<BoothArchived />}/>

        <Route path="/user-management" element={<UserManagement />}/>
      </Route>
    </Routes>
  )
}
