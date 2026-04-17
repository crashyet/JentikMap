import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Map as MapIcon, PlusCircle, ScanLine, Radar, LogOut, LayoutDashboard, User, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImg from '../../assets/shield.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  // Effect untuk memantau status login setiap kali route berubah
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const role = localStorage.getItem('user_role') || 'warga'; // Default fallback
    const name = localStorage.getItem('user_name') || 'Warga';

    setIsAuthenticated(!!token);
    setUserRole(role);
    setUserName(name);
  }, [location.pathname]);

  // Menu Navigasi Utama (Ditampilkan jika sudah login)
  const mainNavLinks = [
    { name: 'Peta', path: '/map', icon: <MapIcon className="w-4 h-4" /> },
    { name: 'Lapor', path: '/report', icon: <PlusCircle className="w-4 h-4" /> },
    { name: 'Scan AI', path: '/scan', icon: <ScanLine className="w-4 h-4" /> },
    { name: 'Radar', path: '/radar', icon: <Radar className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={heroImg} alt="JentikMap Logo" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform" />
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">
              Jentik<span className="text-[#008AC9]">Map</span>
            </span>
          </Link>

          {/* Menu Desktop */}
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-10">
              <a href="#fitur" className="text-sm font-medium text-slate-500 hover:text-[#008AC9] transition-colors">Fitur</a>
              <a href="#tentang" className="text-sm font-medium text-slate-500 hover:text-[#008AC9] transition-colors">Tentang</a>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200">
              {/* Render Keempat Menu Utama */}
              {mainNavLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                      isActive 
                        ? "bg-white text-[#008AC9] shadow-sm" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Action Buttons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Tombol Khusus Warga */}
                {userRole === 'warga' && (
                   <button 
                     onClick={() => navigate('/warga/history')}
                     className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-[#008AC9] border border-slate-200 transition-colors"
                     title="Riwayat Laporan Saya"
                   >
                     <History className="w-4 h-4" /> Riwayat
                   </button>
                )}

                {/* Tombol Khusus Kader/Admin */}
                {(userRole === 'kader' || userRole === 'admin') && (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-[#008AC9] border border-slate-200 transition-colors"
                    title="Dashboard"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                )}
                
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-800 leading-none">
                      {userName}
                    </span>
                    <span className="text-[10px] font-bold text-[#008AC9] uppercase tracking-wider">
                      {userRole}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#008AC9] to-cyan-400 flex items-center justify-center text-white shadow-md border-2 border-white">
                    <User className="w-5 h-5" />
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors"
                    title="Keluar"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => navigate('/auth')}
                className="bg-[#008AC9] hover:bg-[#0076ad] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
              >
                Masuk
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {!isAuthenticated ? (
              <>
                 <a href="#fitur" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-600 hover:bg-slate-50 transition-colors">Fitur</a>
                 <a href="#tentang" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-600 hover:bg-slate-50 transition-colors">Tentang</a>
                 <button onClick={() => { navigate('/auth'); setIsOpen(false); }} className="flex items-center justify-center w-full px-4 py-3 mt-4 rounded-2xl text-base font-bold text-white bg-[#008AC9] shadow-md">Masuk ke Akun</button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#008AC9] to-cyan-400 flex items-center justify-center text-white shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      {userName}
                    </span>
                    <span className="text-[10px] font-bold text-[#008AC9] uppercase tracking-wider">
                      {userRole}
                    </span>
                  </div>
                </div>

                {mainNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-colors",
                        isActive ? "bg-blue-50 text-[#008AC9]" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  );
                })}
                
                <div className="h-px bg-slate-100 my-2"></div>

                {/* Mobile Extra Links */}
                {userRole === 'warga' && (
                   <Link
                      to="/warga/history"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-colors",
                        location.pathname === '/warga/history' ? "bg-blue-50 text-[#008AC9]" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <History className="w-5 h-5" /> Riwayat Laporan
                    </Link>
                )}

                {(userRole === 'kader' || userRole === 'admin') && (
                   <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-colors",
                        location.pathname === '/dashboard' ? "bg-blue-50 text-[#008AC9]" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                )}

                <div className="h-px bg-slate-100 my-4"></div>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Keluar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;