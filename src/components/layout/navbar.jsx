import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../../assets/shield.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img src={heroImg} alt="JentikMap Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">JentikMap</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#fitur" className="text-sm font-medium text-gray-500 hover:text-[#008AC9] transition-colors">Fitur</a>
            <a href="#tentang" className="text-sm font-medium text-gray-500 hover:text-[#008AC9] transition-colors">Tentang</a>
          </div>

          <div>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-[#008AC9] hover:bg-[#0076ad] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
