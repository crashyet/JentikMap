import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Bug, CheckCircle, Clock, Map, Loader2, AlertTriangle } from 'lucide-react';
import kaderService from '../../services/kaderService';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id';

const KaderDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data riwayat laporan saat halaman dimuat
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const data = await kaderService.getHistory();
      setReports(data);
    } catch (err) {
      setError('Gagal memuat riwayat laporan. Pastikan koneksi internet stabil.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Menghitung statistik berdasarkan data laporan dari API
  const totalLaporan = reports.length;
  const laporanPending = reports.filter(r => r.status === 'pending').length;
  const laporanDiterima = reports.filter(r => r.status === 'accepted').length;
  const laporanDarurat = reports.filter(r => r.jenis_laporan === 'suspek_dbd').length;

  const stats = [
    { 
      id: 1, 
      label: 'Total Laporan Anda', 
      value: totalLaporan.toString(), 
      icon: <FileText size={24} className="text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    { 
      id: 2, 
      label: 'Laporan Darurat (DBD)', 
      value: laporanDarurat.toString(), 
      icon: <Bug size={24} className="text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    { 
      id: 3, 
      label: 'Divalidasi / Masuk Peta', 
      value: laporanDiterima.toString(), 
      icon: <CheckCircle size={24} className="text-[#008AC9]" />,
      bg: 'bg-cyan-50',
      border: 'border-[#008AC9]/20'
    },
    { 
      id: 4, 
      label: 'Menunggu Validasi Admin', 
      value: laporanPending.toString(), 
      icon: <Clock size={24} className="text-amber-500" />,
      bg: 'bg-amber-50',
      border: 'border-amber-100'
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

  // Helper untuk merender Badge Status
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-bold border bg-amber-50 text-amber-600 border-amber-200">Menunggu</span>;
      case 'accepted':
        return <span className="px-3 py-1 rounded-full text-xs font-bold border bg-emerald-50 text-emerald-600 border-emerald-200">Diterima</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-bold border bg-rose-50 text-rose-600 border-rose-200">Ditolak</span>;
      case 'resolved':
        return <span className="px-3 py-1 rounded-full text-xs font-bold border bg-blue-50 text-blue-600 border-blue-200">Selesai/Ditangani</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold border bg-slate-50 text-slate-600 border-slate-200">{status}</span>;
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Kader</h1>
          <p className="text-slate-500 mt-1">Ringkasan aktivitas pelaporan jentik nyamuk dan suspek DBD Anda.</p>
        </div>
        <div className="hidden sm:block">
          <div className="bg-blue-100 text-[#008AC9] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 border border-blue-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#008AC9] animate-pulse"></span>
            Akses: Kader Kesehatan
          </div>
        </div>
      </div>

      {/* Tampilkan pesan Error jika gagal fetch API */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-2 font-bold text-sm">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
            className={`p-6 rounded-2xl ${stat.bg} border ${stat.border} shadow-sm transition-all duration-300`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-slate-400 mt-2" /> : stat.value}
                </h3>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Reports List */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Riwayat Laporan Anda</h2>
            <button 
              onClick={fetchHistory}
              className="text-sm text-[#008AC9] font-semibold hover:text-[#0076ad] transition-colors"
            >
              Refresh Data
            </button>
          </div>
          
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-100">Foto & Info</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Tanggal</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Status</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Catatan Admin</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-slate-500">
                       <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#008AC9]" />
                       Memuat riwayat laporan...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-slate-500 font-medium">
                       Anda belum pernah membuat laporan.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 border-b border-slate-50 flex items-center gap-3">
                        {report.image_url ? (
                          <img src={`${BASE_URL}${report.image_url}`} alt="Bukti" className="w-12 h-12 rounded-lg object-cover bg-slate-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {report.jenis_laporan === 'suspek_dbd' ? '🚨 Darurat Suspek DBD' : '🔍 Temuan Jentik'}
                          </p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">Lat: {report.lat}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600 border-b border-slate-50">
                        {new Date(report.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                      </td>
                      <td className="p-4 text-sm border-b border-slate-50">
                        {renderStatusBadge(report.status)}
                      </td>
                      <td className="p-4 text-xs text-slate-600 border-b border-slate-50 max-w-[200px] truncate">
                        {report.catatan_admin || <span className="text-slate-400 italic">Belum ada catatan</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Action Panel / Mini Map Placeholder */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-rose-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <AlertTriangle size={100} />
            </div>
            <h2 className="text-lg font-bold text-white relative z-10">Laporan Darurat</h2>
            <p className="text-rose-100 text-sm mt-1 relative z-10">Temuan Suspek DBD</p>
          </div>
          <div className="flex-1 bg-slate-50 min-h-[250px] p-6 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 border border-rose-100">
               <Bug size={28} className="text-rose-600" />
             </div>
             <h3 className="text-slate-800 font-bold mb-2">Ada warga terjangkit DBD?</h3>
             <p className="text-sm text-slate-500 mb-6">Laporkan segera untuk memicu notifikasi peringatan darurat ke Admin dan Puskesmas terdekat.</p>
             
             <button 
               onClick={() => navigate('/kader/darurat')}
               className="w-full py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-colors shadow-md shadow-rose-200 flex items-center justify-center gap-2"
             >
               <AlertTriangle className="w-4 h-4" /> Buat Laporan Darurat
             </button>
          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default KaderDashboard;