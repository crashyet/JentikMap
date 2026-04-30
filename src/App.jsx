import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/auth'
import LandingPage from './pages/landing'
import MapPage from './pages/map'
import ReportPage from './pages/features/report'
import ScanPage from './pages/features/scan'
import RadarPage from './pages/features/radar'
import HistoryPage from './pages/warga/HistoryPage'
import ProtectedRoute from './components/layout/ProtectedRoute'

import KaderLayout from './pages/kader/layout'
import KaderDashboard from './pages/kader/index'
import KaderValidasi from './pages/kader/validasi'
import KaderPeta from './pages/kader/peta'
import KaderPengaturan from './pages/kader/pengaturan'

import AdminLayout from './pages/admin/layout'
import AdminDashboard from './pages/admin/index'
import AdminKader from './pages/admin/kader'
import AdminWarga from './pages/admin/warga'
import AdminWilayah from './pages/admin/wilayah'
import AdminStatistik from './pages/admin/statistik'
import AdminPengaturan from './pages/admin/pengaturan'
import AdminDarurat from './pages/admin/darurat'

import KaderDarurat from './pages/kader/darurat'

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
              <MapPage />
          } 
        />
        <Route 
          path="/report" 
          element={
            // UBAH 'warga' menjadi 'user'
            <ProtectedRoute allowedRoles={['user', 'kader']}>
              <ReportPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/scan" 
          element={
            // UBAH 'warga' menjadi 'user'
            <ProtectedRoute allowedRoles={['user', 'kader', 'admin']}>
              <ScanPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/radar" 
          element={
            // <ProtectedRoute allowedRoles={['user']}>
              <RadarPage />
            // </ProtectedRoute>
          } 
        />
        
        {/* Dashboard Spesifik */}
        <Route path="/kader" element={<ProtectedRoute allowedRoles={['kader', 'admin']}><KaderLayout /></ProtectedRoute>}>
          <Route index element={<KaderDashboard />} />
          <Route path="validasi" element={<KaderValidasi />} />
          <Route path="peta" element={<KaderPeta />} />
          <Route path="pengaturan" element={<KaderPengaturan />} />
          <Route path="darurat" element={<KaderDarurat />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="kader" element={<AdminKader />} />
          <Route path="warga" element={<AdminWarga />} />
          <Route path="wilayah" element={<AdminWilayah />} />
          <Route path="statistik" element={<AdminStatistik />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
          <Route path="darurat" element={<AdminDarurat />} />
        </Route>

        <Route 
          path="/warga/history" 
          element={
            // UBAH 'warga' menjadi 'user'
            <ProtectedRoute allowedRoles={['user']}>
              <HistoryPage />
            </ProtectedRoute>
          } 
        /> 
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App