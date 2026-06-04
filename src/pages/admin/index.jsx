import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, AlertTriangle, TrendingUp, Activity, Map, Clock, CheckCircle2, XCircle } from 'lucide-react';
import adminService from '../../services/adminService';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id';

const AdminDashboard = () => {
  // State untuk API
  const [pendingReports, setPendingReports] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA API SAAT KOMPONEN DIMUAT
  useEffect(() => {
    fetchPendingReports();
    setupSSE();

    // Membersihkan koneksi SSE saat komponen ditutup
    return () => {
      if (window.adminEventSource) {
        window.adminEventSource.close();
      }
    };
  }, []);

  const fetchPendingReports = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getPendingReports();
      setPendingReports(data);
    } catch (error) {
      console.error("Gagal memuat laporan pending", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupSSE = () => {
    // Sesuai Dokumentasi API: Endpoint Server-Sent Events (SSE)
    const streamUrl = `${BASE_URL}/api/v1/admin/notifications/stream`;
    const eventSource = new EventSource(streamUrl);
    
    eventSource.addEventListener('emergency', (event) => {
      const data = JSON.parse(event.data);
      console.log("🚨 Notifikasi Darurat Masuk:", data);
      
      // Tambahkan alert baru ke state (tampilkan di paling atas)
      setEmergencyAlerts(prev => [data, ...prev]);
    });

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    window.adminEventSource = eventSource;
  };

  // Fungsi Dummy Sementara untuk Statistik Atas (Karena belum ada di API)
  const stats = [
    { 
      id: 1, label: 'Total Warga Terdaftar', value: '2,543', trend: '+12%', trendUp: true,
      icon: <Users size={22} className="text-[#008AC9]" />, bg: 'bg-cyan-50',
    },
    { 
      id: 2, label: 'Kader Aktif', value: '124', trend: '+3%', trendUp: true,
      icon: <UserPlus size={22} className="text-emerald-600" />, bg: 'bg-emerald-50',
    },
    { 
      id: 3, label: 'Laporan Pending', value: pendingReports.length.toString(), trend: 'Real-time', trendUp: true,
      icon: <Activity size={22} className="text-blue-600" />, bg: 'bg-blue-50',
    },
    { 
      id: 4, label: 'Notifikasi Darurat', value: emergencyAlerts.length.toString(), trend: 'Real-time', trendUp: false,
      icon: <AlertTriangle size={22} className="text-rose-600" />, bg: 'bg-rose-50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
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
          <p className="text-slate-500 mt-1 text-sm">Pantau aktivitas sistem dan antrean laporan secara real-time.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchPendingReports}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Clock size={16} /> Refresh Data
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
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trendUp ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                {stat.trendUp ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                <span>{stat.trend}</span>
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
        
        {/* Kolom Kiri: Peta Sebaran */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-800">Distribusi Area Rawan Jentik</h2>
          </div>
          <div className="flex-1 p-5 min-h-[300px] flex items-center justify-center relative bg-slate-50/50 rounded-b-xl overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="text-center relative z-10 max-w-sm">
                <div className="mx-auto w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                  <Map size={32} className="text-[#008AC9]" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Peta Sebaran Global</h3>
                <p className="text-slate-500 text-sm mt-2">Visualisasi peta interaktif seluruh wilayah yang tercover sistem akan tampil di sini.</p>
             </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Antrean Laporan dari API */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col max-h-[500px]">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-800">Antrean Verifikasi</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{pendingReports.length}</span>
          </div>
          
          <div className="p-5 flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="w-8 h-8 border-4 border-[#008AC9]/20 border-t-[#008AC9] rounded-full animate-spin"></div>
              </div>
            ) : pendingReports.length === 0 && emergencyAlerts.length === 0 ? (
              <div className="text-center text-slate-400 py-10">
                <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-300" />
                <p className="text-sm">Tidak ada laporan yang menunggu verifikasi.</p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* 1. Tampilkan Peringatan Darurat (SSE) jika ada */}
                {emergencyAlerts.map((alert, index) => (
                  <div key={`alert-${index}`} className="p-3 bg-rose-50 border border-rose-200 rounded-lg shadow-sm animate-pulse">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={18} className="text-rose-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-rose-800 font-bold">{alert.message}</p>
                        <p className="text-xs text-rose-600 mt-1">Koordinat: {alert.lat}, {alert.lng}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 2. Tampilkan Laporan Pending */}
                {pendingReports.map((report) => (
                  <div key={report.id} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Pending</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(report.created_at).toLocaleDateString('id-ID', { hour: '2-digit', minute:'2-digit' })}
                      </span>
                    </div>
                    
                    {report.image_url && (
                      <img 
                        src={`${BASE_URL}${report.image_url}`} 
                        alt="Bukti Laporan" 
                        className="w-full h-24 object-cover rounded-md mb-2 bg-slate-200"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    
                    <p className="text-xs text-slate-600 font-mono mt-1">
                      Lat: {report.lat}<br/>Lng: {report.lng}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button className="py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold rounded flex items-center justify-center gap-1">
                        <CheckCircle2 size={14} /> Terima
                      </button>
                      <button className="py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded flex items-center justify-center gap-1">
                        <XCircle size={14} /> Tolak
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;