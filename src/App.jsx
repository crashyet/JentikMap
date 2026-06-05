import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public & General Pages
import AuthPage from './pages/auth';
import LandingPage from './pages/landing';
import MapPage from './pages/map';
import ReportPage from './pages/features/report';
import ScanPage from './pages/features/scan';
import RadarPage from './pages/features/radar';

// Warga (User) Pages
import HistoryPage from './pages/warga/HistoryPage';

// Kader Pages
import KaderLayout from './pages/kader/layout';
import KaderDashboard from './pages/kader/index';
import KaderValidasi from './pages/kader/validasi';
import KaderPeta from './pages/kader/peta';
import KaderPengaturan from './pages/kader/pengaturan';
import KaderDarurat from './pages/kader/darurat';

// Admin Pages
import AdminLayout from './pages/admin/layout';
import AdminDashboard from './pages/admin/index';
import AdminKader from './pages/admin/kader';
import AdminWarga from './pages/admin/warga';
import AdminWilayah from './pages/admin/wilayah';
import AdminStatistik from './pages/admin/statistik';
import AdminPengaturan from './pages/admin/pengaturan';
import AdminDarurat from './pages/admin/darurat';

// Protected Route Component
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/radar" element={<RadarPage />} />
        
        {/* AUTHENTICATED GENERAL FEATURES */}
        <Route 
          path="/report" 
          element={
            <ProtectedRoute allowedRoles={['user', 'kader']}>
              <ReportPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/scan" 
          element={
            <ProtectedRoute allowedRoles={['user', 'kader', 'admin']}>
              <ScanPage />
            </ProtectedRoute>
          } 
        />
        
        {/* WARGA (USER) SPECIFIC ROUTES */}
        <Route 
          path="/warga/history" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <HistoryPage />
            </ProtectedRoute>
          } 
        /> 
        
        {/* KADER ROUTES */}
        <Route 
          path="/kader" 
          element={
            <ProtectedRoute allowedRoles={['kader', 'admin']}>
              <KaderLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<KaderDashboard />} />
          <Route path="validasi" element={<KaderValidasi />} />
          <Route path="peta" element={<KaderPeta />} />
          <Route path="darurat" element={<KaderDarurat />} />
          <Route path="pengaturan" element={<KaderPengaturan />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="kader" element={<AdminKader />} />
          <Route path="warga" element={<AdminWarga />} />
          <Route path="wilayah" element={<AdminWilayah />} />
          <Route path="statistik" element={<AdminStatistik />} />
          <Route path="darurat" element={<AdminDarurat />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
        </Route>

        {/* CATCH ALL (404 REDIRECT) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;