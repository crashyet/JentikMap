import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, AlertTriangle, TrendingUp, Activity, Clock, CheckCircle2, XCircle, FileText, MapPin, X, Loader2, MessageSquare, RefreshCw } from 'lucide-react';
import adminService from '../../services/adminService';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id';

const AdminDashboard = () => {
  // State Data (Default aman)
  const [dashboardStats, setDashboardStats] = useState({ total_warga: 0, kader_aktif: 0, laporan_pending: 0, notifikasi_darurat: 0 });
  const [pendingReports, setPendingReports] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  
  // State UI
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchAllData();
    let sseConnection = null;

    // KODE ANTI CRASH: Cek apakah fungsi listenEmergencyNotifications ada di adminService
    if (typeof adminService.listenEmergencyNotifications === 'function') {
      sseConnection = adminService.listenEmergencyNotifications(
        (newData) => {
          console.log("🚨 Notifikasi Darurat Masuk:", newData);
          setEmergencyAlerts(prev => [newData, ...prev]);
        },
        (error) => {
          console.error("Koneksi SSE Terputus", error);
        }
      );
    } else {
      console.warn("⚠️ Fungsi listenEmergencyNotifications tidak ditemukan di adminService.js");
    }

    return () => {
      if (sseConnection && typeof sseConnection.close === 'function') sseConnection.close();
    };
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      
      // Mencegah crash jika fungsi getDashboardSummary belum di-save di adminService
      const statsPromise = typeof adminService.getDashboardSummary === 'function' 
        ? adminService.getDashboardSummary() 
        : Promise.resolve({});
        
      const reportsPromise = typeof adminService.getPendingReports === 'function'
        ? adminService.getPendingReports()
        : Promise.resolve([]);

      const [statsData, reportsData] = await Promise.all([statsPromise, reportsPromise]);
      
      // KODE ANTI CRASH: Amankan data Statistik
      setDashboardStats({
        total_warga: statsData?.total_warga || 0,
        kader_aktif: statsData?.kader_aktif || 0,
        laporan_pending: statsData?.laporan_pending || 0,
        notifikasi_darurat: statsData?.notifikasi_darurat || 0
      });

      // KODE ANTI CRASH: Pastikan reportsData benar-benar sebuah Array sebelum di set
      const safeReportsArray = Array.isArray(reportsData) 
        ? reportsData 
        : (reportsData?.data || []);
        
      setPendingReports(Array.isArray(safeReportsArray) ? safeReportsArray : []);

    } catch (error) {
      console.error("Gagal memuat data dashboard", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    if (typeof adminService.verifyReport !== 'function') {
      alert("Fungsi verifyReport tidak ditemukan di adminService.js. Pastikan sudah di-save.");
      return;
    }

    const catatan = window.prompt(
      `Tanggapan Admin untuk ${status === 'accepted' ? 'MENERIMA' : 'MENOLAK'} laporan ini (Opsional):`, 
      status === 'accepted' ? 'Laporan valid dan telah dimasukkan ke peta.' : 'Bukti tidak sesuai.'
    );

    if (catatan === null) return;

    try {
      setIsVerifying(true);
      await adminService.verifyReport(id, status, catatan);
      alert(`Laporan berhasil ${status === 'accepted' ? 'diterima' : 'ditolak'}.`);
      
      fetchAllData(); 
      setSelectedReport(null); 
    } catch (error) {
      alert(error.response?.data?.error || "Terjadi kesalahan saat memverifikasi laporan.");
    } finally {
      setIsVerifying(false);
    }
  };

  const stats = [
    { id: 1, label: 'Total Warga', value: dashboardStats.total_warga, trend: 'Terdaftar', trendUp: true, icon: <Users size={22} className="text-[#008AC9]" />, bg: 'bg-cyan-50' },
    { id: 2, label: 'Kader Aktif', value: dashboardStats.kader_aktif, trend: 'Terverifikasi', trendUp: true, icon: <UserPlus size={22} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { id: 3, label: 'Menunggu Validasi', value: dashboardStats.laporan_pending, trend: 'Laporan', trendUp: true, icon: <Activity size={22} className="text-amber-600" />, bg: 'bg-amber-50' },
    { id: 4, label: 'Darurat Suspek DBD', value: dashboardStats.notifikasi_darurat, trend: 'Segera Tindak', trendUp: false, icon: <AlertTriangle size={22} className="text-rose-600" />, bg: 'bg-rose-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ikhtisar Sistem JentikMap</h1>
          <p className="text-slate-500 mt-1 text-sm">Pantau aktivitas sistem dan antrean laporan secara real-time.</p>
        </div>
        <button 
          onClick={fetchAllData}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh Data
        </button>
      </div>

      {/* STATS KARTU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 transition-transform group-hover:scale-110 ${stat.bg}`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.trendUp ? 'text-emerald-700 bg-emerald-100 border border-emerald-200' : 'text-rose-700 bg-rose-100 border border-rose-200'}`}>
                {stat.trendUp ? <TrendingUp size={12} /> : <AlertTriangle size={12} />}
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="mt-5 relative z-10">
              <h3 className="text-3xl font-black text-slate-800">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-slate-300 my-1" /> : stat.value}
              </h3>
              <p className="text-slate-500 text-sm font-bold mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ANTREAN VERIFIKASI */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#008AC9]" /> Antrean Verifikasi Laporan Masuk
            </h2>
          </div>
          <span className="bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {pendingReports.length} Antrean
          </span>
        </div>
        
        <div className="p-6 flex-1 bg-slate-50/30">
          {/* Notifikasi SSE */}
          {emergencyAlerts.length > 0 && (
            <div className="mb-6 space-y-3">
              <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-2">Peringatan Darurat Real-Time</h3>
              {emergencyAlerts.map((alert, index) => (
                <div key={`alert-${index}`} className="p-4 bg-rose-50 border border-rose-200 rounded-xl shadow-sm animate-in slide-in-from-top-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-rose-600 rounded-full shrink-0 animate-pulse"><AlertTriangle size={20} className="text-white" /></div>
                    <div>
                      <p className="text-base text-rose-800 font-bold">{alert.message}</p>
                      <p className="text-sm text-rose-600 mt-1 font-mono bg-rose-100/50 inline-block px-2 py-0.5 rounded">Titik: {alert.lat}, {alert.lng}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid Antrean */}
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <Loader2 className="w-10 h-10 text-[#008AC9] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Memuat antrean laporan...</p>
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 text-slate-400">
              <CheckCircle2 size={48} className="mb-4 text-emerald-200" />
              <h3 className="text-lg font-bold text-slate-600">Antrean Bersih!</h3>
              <p className="text-sm mt-1">Tidak ada laporan yang menunggu verifikasi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingReports.map((report) => (
                <div key={report?.id || Math.random()} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  
                  <div className="relative h-48 bg-slate-100 border-b border-slate-100">
                    {report?.image_url ? (
                      <img src={`${BASE_URL}${report.image_url}`} alt="Bukti" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <FileText size={32} className="mb-2" />
                        <span className="text-xs font-bold uppercase">Tanpa Foto</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3"><span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">Pending</span></div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-3 bg-slate-50 inline-block w-fit px-2 py-1 rounded-md border border-slate-100">
                      <Clock size={12} /> {report?.created_at ? new Date(report.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : 'Waktu tidak diketahui'}
                    </div>
                    
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin size={16} className="text-[#008AC9] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Koordinat</p>
                        <p className="text-sm font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{report?.lat || '-'}, {report?.lng || '-'}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button onClick={() => handleVerify(report.id, 'accepted')} disabled={isVerifying} className="py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50">
                        <CheckCircle2 size={16} /> Terima
                      </button>
                      <button onClick={() => setSelectedReport(report)} className="py-2 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                        <MessageSquare size={16} /> Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL DETAIL LAPORAN --- */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-5 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Detail Laporan #{selectedReport?.id || '-'}</h3>
                <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-rose-500 bg-slate-50 p-1.5 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5">
                {selectedReport?.image_url ? (
                  <div className="w-full bg-slate-100 rounded-xl overflow-hidden mb-5 border border-slate-200">
                    <img src={`${BASE_URL}${selectedReport.image_url}`} alt="Detail Bukti" className="w-full h-auto max-h-[400px] object-contain" />
                  </div>
                ) : (
                  <div className="w-full bg-slate-50 rounded-xl p-10 flex flex-col items-center justify-center text-slate-400 mb-5 border border-slate-200 border-dashed">
                    <FileText size={48} className="mb-3 opacity-50" />
                    <p className="font-bold">Pelapor tidak menyertakan foto bukti</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Waktu Dibuat</p>
                    <p className="text-sm font-medium text-slate-700">
                      {selectedReport?.created_at ? new Date(selectedReport.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' }) : '-'}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Koordinat Area</p>
                    <p className="text-sm font-mono font-bold text-[#008AC9]">{selectedReport?.lat || '-'}, {selectedReport?.lng || '-'}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button onClick={() => handleVerify(selectedReport.id, 'rejected')} disabled={isVerifying} className="flex-1 py-3 border border-rose-200 bg-rose-50 text-rose-700 font-bold rounded-xl hover:bg-rose-100 transition-colors flex justify-center items-center gap-2">
                  <XCircle size={18} /> Tolak
                </button>
                <button onClick={() => handleVerify(selectedReport.id, 'accepted')} disabled={isVerifying} className="flex-[2] py-3 bg-[#008AC9] text-white font-bold rounded-xl hover:bg-[#0076ad] shadow-md transition-colors flex justify-center items-center gap-2">
                  <CheckCircle2 size={18} /> Terima & Pindahkan ke Peta
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;