import { motion } from 'framer-motion';
import { Users, UserPlus, AlertTriangle, TrendingUp, Activity, Map } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { 
      id: 1, 
      label: 'Total Warga Terdaftar', 
      value: '2,543', 
      trend: '+12%',
      trendUp: true,
      icon: <Users size={22} className="text-[#008AC9]" />,
      bg: 'bg-cyan-50',
    },
    { 
      id: 2, 
      label: 'Kader Aktif', 
      value: '124', 
      trend: '+3%',
      trendUp: true,
      icon: <UserPlus size={22} className="text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
    { 
      id: 3, 
      label: 'Laporan Masuk (Bulan Ini)', 
      value: '842', 
      trend: '+24%',
      trendUp: true,
      icon: <Activity size={22} className="text-blue-600" />,
      bg: 'bg-blue-50',
    },
    { 
      id: 4, 
      label: 'Area Rawan Tinggi', 
      value: '12', 
      trend: '-2%',
      trendUp: false,
      icon: <AlertTriangle size={22} className="text-rose-600" />,
      bg: 'bg-rose-50',
    },
  ];

  const recentActivities = [
    { id: 1, text: 'Kader Siti Aminah memvalidasi laporan LAP-002', time: '10 menit yang lalu', type: 'validation' },
    { id: 2, text: 'Sistem mendeteksi peningkatan jentik di RW 05', time: '1 jam yang lalu', type: 'alert' },
    { id: 3, text: 'Pengguna baru (Warga) mendaftar dari RT 02', time: '2 jam yang lalu', type: 'user' },
    { id: 4, text: 'Laporan mingguan sistem berhasil di-generate', time: '5 jam yang lalu', type: 'system' },
    { id: 5, text: 'Kader Budi memperbarui status area RW 01', time: '1 hari yang lalu', type: 'validation' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ikhtisar Sistem JentikMap</h1>
          <p className="text-slate-500 mt-1 text-sm">Pantau aktivitas sistem dan statistik utama secara real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Activity size={16} />
            Generate Laporan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            variants={itemVariants}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 transition-transform group-hover:scale-110 ${stat.bg}`}></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trendUp ? 'text-emerald-700 bg-emerald-100' : 'text-emerald-700 bg-emerald-100'}`}>
                {stat.trendUp ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180 text-rose-700" />}
                <span className={stat.trendUp ? '' : 'text-rose-700'}>{stat.trend}</span>
              </div>
            </div>
            
            <div className="mt-4 relative z-10">
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart/Map Placeholder */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-800">Distribusi Area Rawan Jentik</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold cursor-pointer">Bulan Ini</span>
              <span className="px-3 py-1 text-slate-500 rounded-md text-xs font-medium cursor-pointer hover:bg-slate-50">Tahun Ini</span>
            </div>
          </div>
          <div className="flex-1 p-5 min-h-[300px] flex items-center justify-center relative bg-slate-50/50 rounded-b-xl overflow-hidden">
             {/* Map Placeholder Graphic */}
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="text-center relative z-10 max-w-sm">
                <div className="mx-auto w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                  <Map size={32} className="text-[#008AC9]" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Peta Sebaran Global</h3>
                <p className="text-slate-500 text-sm mt-2">Visualisasi peta interaktif seluruh wilayah yang tercover sistem akan tampil di sini, menunjukkan heatmap tingkat kerawanan jentik nyamuk.</p>
                <button className="mt-5 px-5 py-2 bg-[#008AC9] text-white rounded-lg text-sm font-medium hover:bg-[#0076ad] transition-colors shadow-md shadow-cyan-200">
                  Buka Peta Interaktif
                </button>
             </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800">Aktivitas Terbaru</h2>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="relative flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10
                    ${activity.type === 'validation' ? 'bg-emerald-100 text-emerald-600' : 
                      activity.type === 'alert' ? 'bg-rose-100 text-rose-600' : 
                      activity.type === 'user' ? 'bg-cyan-50 text-[#008AC9]' : 'bg-blue-100 text-blue-600'}`}>
                    {activity.type === 'validation' && <CheckCircle size={16} />}
                    {activity.type === 'alert' && <AlertTriangle size={16} />}
                    {activity.type === 'user' && <UserPlus size={16} />}
                    {activity.type === 'system' && <Activity size={16} />}
                    {/* fallback if icons not imported individually */}
                    {activity.type === 'validation' ? <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> : null}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-slate-700 font-medium">{activity.text}</p>
                    <span className="text-xs text-slate-400 mt-1 block flex items-center gap-1">
                       <Clock size={12} /> {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Lihat Semua Log
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Mini icons helper for activity feed
const CheckCircle = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const Clock = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

export default AdminDashboard;
