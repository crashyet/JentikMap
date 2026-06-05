import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, CheckCircle2, XCircle, MapPin, Calendar, FileText, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '../../components/layout/navbar';
import userService from '../../services/userService';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await userService.getHistory();
      setReports(data);
    } catch (err) {
      setError('Gagal memuat riwayat laporan. Pastikan koneksi internet stabil.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Sesuaikan status dengan data kembalian API Backend
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { icon: <Clock className="w-4 h-4" />, text: 'Menunggu Verifikasi', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
      case 'accepted':
        return { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Laporan Diterima', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'rejected':
        return { icon: <XCircle className="w-4 h-4" />, text: 'Laporan Ditolak', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' };
      case 'resolved':
        return { icon: <ShieldCheck className="w-4 h-4" />, text: 'Selesai Ditangani', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      default:
        return { icon: <Clock className="w-4 h-4" />, text: 'Status Diproses', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#008AC9]/20">
      <Navbar />
      
      <main className="pt-28 pb-16 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate('/map')}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-[#008AC9] transition-colors" />
          </button>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Riwayat Laporan Saya</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Pantau status laporan yang telah Anda kirimkan.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-3 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <Loader2 className="w-12 h-12 text-[#008AC9] animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Memuat data dari server...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">Belum ada laporan</h3>
              <p className="text-slate-500">Anda belum pernah mengirimkan laporan temuan jentik.</p>
              <button 
                onClick={() => navigate('/report')}
                className="mt-6 px-6 py-3 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-xl font-bold transition-colors shadow-md"
              >
                Buat Laporan Pertama
              </button>
            </div>
          ) : (
            reports.map((report) => {
              const statusConfig = getStatusConfig(report.status);
              return (
                <div key={report.id} className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 border border-slate-100 hover:border-blue-100 transition-colors group">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-4">
                      {/* Tampilkan gambar bukti jika ada */}
                      {report.image_url ? (
                        <img 
                          src={`${BASE_URL}${report.image_url}`} 
                          alt="Bukti Laporan" 
                          className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-[#008AC9] border border-blue-100">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-bold text-slate-800 uppercase">LAPORAN #{report.id}</h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1">
                          <Calendar className="w-3 h-3" /> 
                          {new Date(report.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                        </div>
                      </div>
                    </div>
                    
                    <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border", statusConfig.bg, statusConfig.color, statusConfig.border)}>
                      {statusConfig.icon}
                      {statusConfig.text}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Titik Koordinat (GPS)</p>
                        <p className="text-sm font-bold text-slate-700 flex items-start gap-1.5">
                          <MapPin className="w-4 h-4 shrink-0 text-[#008AC9] mt-0.5" />
                          Lat: {report.lat}, Lng: {report.lng}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Tingkat Bahaya</p>
                        <p className="text-sm font-bold text-slate-700 capitalize">{report.tingkat_bahaya || report.jenis_laporan || 'Reguler'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Catatan Anda</p>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                        "{report.deskripsi || 'Tidak ada catatan tambahan disertakan.'}"
                      </p>
                    </div>

                    {/* Catatan dari Admin (Jika ada) */}
                    {report.catatan_admin && (
                       <div className="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                         <p className="text-[10px] font-extrabold text-[#008AC9] uppercase tracking-wider mb-1">Tanggapan Admin / Petugas</p>
                         <p className="text-sm text-slate-700 font-medium">"{report.catatan_admin}"</p>
                       </div>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
};

export default HistoryPage;