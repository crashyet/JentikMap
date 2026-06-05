import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Map, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const KaderLayout = () => {
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
    { path: '/kader', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/kader/validasi', icon: <ClipboardCheck size={20} />, label: 'Validasi Laporan' },
    { path: '/kader/peta', icon: <Map size={20} />, label: 'Peta Area' },
    { path: '/kader/darurat', icon: <ClipboardCheck size={20} />, label: 'Laporan Darurat' },
    // { path: '/kader/pengaturan', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
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
            className="fixed inset-y-0 left-0 z-40 w-64 bg-[#008AC9] text-white shadow-xl flex flex-col lg:relative lg:translate-x-0"
          >
            <div className="p-6 flex items-center justify-center border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-[#008AC9] font-bold text-xl">K</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-wide">JentikMap</h1>
                  <p className="text-xs text-cyan-100">Panel Kader</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-md border border-white/20' 
                          : 'text-cyan-50 hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/20">
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ x: 5, backgroundColor: "rgba(239,68,68,0.2)" }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:text-red-100 transition-colors cursor-pointer"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Keluar</span>
                </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-slate-50 w-full">
        {/* Top Header Placeholder */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10">
          <div className="ml-12 lg:ml-0">
            <h2 className="text-xl font-semibold text-slate-800">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard Kader'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-medium text-slate-700">Siti Aminah</p>
              <p className="text-xs text-slate-500">Kader RW 03</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-50 border-2 border-cyan-300 overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
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

export default KaderLayout;
