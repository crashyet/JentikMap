import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  
  const isAuthenticated = localStorage.getItem('user_token');
  const userRole = localStorage.getItem('user_role'); // Ambil role dari storage

  // 1. Cek apakah user sudah login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. Cek apakah user memiliki role yang diizinkan (jika allowedRoles diberikan)
  // Jika allowedRoles ada, DAN role user saat ini tidak termasuk di dalamnya...
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Arahkan ke halaman unauthorized atau dashboard default mereka
    // Untuk saat ini kita arahkan saja ke /map
    return <Navigate to="/map" replace />; 
  }

  return children;
};

export default ProtectedRoute;