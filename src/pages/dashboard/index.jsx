import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h1 className="text-4xl font-bold text-[#008AC9] mb-4">Dashboard</h1>
      <p className="mb-4 text-gray-600">Selamat datang di Jentik Map Dashboard.</p>
      {user && <p className="mb-8 font-semibold">User: {user.namaLengkap || user.email}</p>}
      <button 
        onClick={() => {
          AuthService.logout();
          navigate('/auth');
        }}
        className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
