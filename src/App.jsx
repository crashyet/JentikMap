import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/auth'
import LandingPage from './pages/landing'
import DashboardPage from './pages/dashboard'
import MapPage from './pages/map'
import ReportPage from './pages/features/report'
import ScanPage from './pages/features/scan'
import RadarPage from './pages/features/radar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/radar" element={<RadarPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

