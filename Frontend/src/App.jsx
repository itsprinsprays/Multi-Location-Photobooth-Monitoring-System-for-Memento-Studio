import { Routes, Route, Navigate } from 'react-router-dom'

import BoothManagement from './pages/BoothManagement'
import Layout from './components/layout/Layout'
import BoothArchived from './components/ui/Booth Management/BoothArchived'
import UserManagement from './pages/UserManagement'
import EmployeeArchived from './components/ui/User Management/EmployeeArchived'
import Login from './pages/Login'
import { authService } from './services/authService'


function AdminRoute({ children }) {
  const user = authService.getCurrentUser();
  if (user?.role !== "ADMIN") {
    // If not Admin, redirect them to booth management
    return <Navigate to="/booth-fleet-management" replace />;
  }
  return children;
}

export default function App() {
  return (
      <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/booth-fleet-management" element={<BoothManagement />} />
        <Route path="/archived-booths" element={<BoothArchived />}/>

        <Route path="/user-management" element={<AdminRoute>
                                                  <UserManagement /> 
                                                </AdminRoute>}/>

        <Route path="/archived-employee" element={<AdminRoute> 
                                                    <EmployeeArchived /> 
                                                  </AdminRoute>}/>

      </Route>
    </Routes>
  )
}
