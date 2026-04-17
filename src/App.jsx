import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/auth'
import LandingPage from './pages/landing'
import DashboardPage from './pages/dashboard'
import MapPage from './pages/map'
import ReportPage from './pages/features/report'
import ScanPage from './pages/features/scan'
import RadarPage from './pages/features/radar'
import HistoryPage from './pages/warga/HistoryPage' // <--- Import baru
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Fitur Utama */}
        <Route 
          path="/map" 
          element={
            <ProtectedRoute allowedRoles={['warga', 'kader', 'admin']}>
              <MapPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/report" 
          element={
            <ProtectedRoute allowedRoles={['warga', 'kader']}>
              <ReportPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/scan" 
          element={
            <ProtectedRoute allowedRoles={['warga', 'kader']}>
              <ScanPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/radar" 
          element={
            <ProtectedRoute allowedRoles={['warga']}>
              <RadarPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Dashboard Spesifik */}
        <Route 
          path="/warga/history" 
          element={
            <ProtectedRoute allowedRoles={['warga']}>
              <HistoryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['kader', 'admin']}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App