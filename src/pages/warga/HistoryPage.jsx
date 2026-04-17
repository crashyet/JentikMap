import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, CheckCircle2, XCircle, MapPin, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '../../components/layout/navbar';

const HistoryPage = () => {
  const navigate = useNavigate();

  const [reports] = useState([
    {
      id: 'REP-001',
      date: '24 Apr 2026, 09:30',
      location: 'Jl. Gatot Subroto No. 12',
      description: 'Genangan air di ban bekas belakang rumah',
      status: 'pending',
      type: 'Aedes aegypti (Jentik)',
    },
    {
      id: 'REP-002',
      date: '20 Apr 2026, 14:15',
      location: 'Area Taman Kelurahan',
      description: 'Vas bunga tidak terpakai penuh air',
      status: 'valid',
      type: 'Aedes aegypti (Jentik)',
    },
    {
      id: 'REP-003',
      date: '15 Apr 2026, 08:00',
      location: 'Selokan depan pos ronda',
      description: 'Hanya air kotor, sepertinya bukan jentik',
      status: 'rejected',
      type: 'Bukan Jentik Berbahaya',
    },
  ]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return { icon: <Clock className="w-4 h-4" />, text: 'Menunggu Validasi Kader', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
      case 'valid':
        return { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Laporan Valid (Dikonfirmasi)', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'rejected':
        return { icon: <XCircle className="w-4 h-4" />, text: 'Ditolak (Bukan Ancaman)', color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' };
      default:
        return { icon: <Clock className="w-4 h-4" />, text: 'Status Tidak Diketahui', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#008AC9]/20">
      <Navbar />
      
      <main className="pt-28 pb-16 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate('/map')}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-[#008AC9] transition-colors" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Riwayat Laporan Saya</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Pantau status laporan yang telah Anda kirimkan.</p>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => {
            const statusConfig = getStatusConfig(report.status);
            return (
              <div key={report.id} className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 border border-slate-100 hover:border-blue-100 transition-colors group">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#008AC9]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{report.id}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3 h-3" /> {report.date}
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
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Lokasi Temuan</p>
                      <p className="text-sm font-bold text-slate-700 flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 shrink-0 text-[#008AC9] mt-0.5" />
                        {report.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Hasil Deteksi AI</p>
                      <p className="text-sm font-bold text-slate-700">{report.type}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Catatan Warga</p>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">"{report.description}"</p>
                  </div>
                </div>

              </div>
            );
          })}

          {reports.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">Belum ada laporan</h3>
              <p className="text-slate-500">Anda belum pernah mengirimkan laporan temuan jentik.</p>
              <button 
                onClick={() => navigate('/report')}
                className="mt-6 px-6 py-3 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-xl font-bold transition-colors"
              >
                Buat Laporan Pertama
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default HistoryPage;