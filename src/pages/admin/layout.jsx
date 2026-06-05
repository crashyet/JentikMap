import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  MapPin, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    navigate('/auth');
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/kader', icon: <UserSquare2 size={20} />, label: 'Manajemen Kader' },
    { path: '/admin/warga', icon: <Users size={20} />, label: 'Manajemen Warga' },
    // { path: '/admin/wilayah', icon: <MapPin size={20} />, label: 'Data Wilayah' },
    { path: '/admin/darurat', icon: <MapPin size={20} />, label: 'Darurat (Tindakan)' },
    // { path: '/admin/statistik', icon: <BarChart3 size={20} />, label: 'Statistik Global' },
    { path: '/admin/pengaturan', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md text-[#008AC9] focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 shadow-2xl flex flex-col lg:relative lg:translate-x-0"
          >
            <div className="p-6 flex items-center justify-center border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#008AC9] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-wide">JentikMap</h1>
                  <p className="text-xs text-cyan-300 uppercase tracking-widest font-semibold mt-0.5">Admin Portal</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu Utama</div>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-[#008AC9] text-white shadow-md' 
                          : 'hover:text-white'
                      }`}
                    >
                      <div className={`${isActive ? 'text-white' : 'text-slate-400'}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ x: 5, backgroundColor: "rgba(239,68,68,0.1)" }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut size={20} />
                  <span className="font-medium text-sm">Keluar</span>
                </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-slate-50 w-full">
        {/* Top Header Placeholder */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 shadow-sm">
          <div className="ml-12 lg:ml-0">
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard Admin'}
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-sm text-right hidden sm:block">
                <p className="font-semibold text-slate-700">Administrator</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-9 h-9 rounded-md bg-cyan-50 border border-cyan-200 overflow-hidden flex items-center justify-center">
                <span className="text-[#008AC9] font-bold">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
