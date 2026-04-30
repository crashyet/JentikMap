import React, { useState } from 'react';
import { AlertTriangle, MapPin, CheckCircle, Clock, Send, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDarurat() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [tindakanText, setTindakanText] = useState('');

  // Dummy data for incoming reports
  const [reports, setReports] = useState([
    {
      id: 'DR-002',
      kader: 'Siti Aminah',
      kaderId: 'K-042',
      date: '2026-04-30 11:30',
      location: 'RT 04/RW 02 (Selokan Mampet)',
      photo: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=400',
      status: 'pending',
      tindakan: null,
    },
    {
      id: 'DR-001',
      kader: 'Budi Santoso',
      kaderId: 'K-015',
      date: '2026-04-30 08:15',
      location: 'Jl. Merdeka No.45 (Belakang Rumah Kosong)',
      photo: 'https://images.unsplash.com/photo-1584474813589-9a744cc10594?auto=format&fit=crop&q=80&w=400',
      status: 'verified',
      tindakan: 'Lakukan fogging segera. Tim fogging akan meluncur jam 14:00.',
    }
  ]);

  const handleVerifikasi = (e) => {
    e.preventDefault();
    if (!tindakanText) {
      alert('Mohon isi instruksi tindakan!');
      return;
    }

    setReports(reports.map(r => 
      r.id === selectedReport.id 
        ? { ...r, status: 'verified', tindakan: tindakanText }
        : r
    ));
    
    setSelectedReport(null);
    setTindakanText('');
    alert('Laporan berhasil diverifikasi dan tindakan telah dikirim ke Kader!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="text-rose-500 w-7 h-7" /> Manajemen Laporan Darurat
          </h1>
          <p className="text-slate-500 mt-1">Verifikasi laporan darurat dari Kader dan berikan instruksi tindakan.</p>
        </div>
        <div className="bg-rose-100 text-rose-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          {reports.filter(r => r.status === 'pending').length} Menunggu Verifikasi
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800 uppercase font-semibold text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID Laporan</th>
                <th className="px-6 py-4">Pelapor (Kader)</th>
                <th className="px-6 py-4">Waktu Laporan</th>
                <th className="px-6 py-4">Lokasi & Keterangan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{report.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{report.kader}</div>
                    <div className="text-xs text-slate-400">{report.kaderId}</div>
                  </td>
                  <td className="px-6 py-4">{report.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#008AC9]" />
                      <span className="max-w-[200px] truncate">{report.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {report.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3" /> Selesai
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                        <AlertTriangle className="w-3 h-3" /> Perlu Tindakan
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedReport(report)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-[#008AC9] text-slate-600 hover:text-white rounded-lg transition-colors font-medium text-xs"
                    >
                      <Eye className="w-4 h-4" /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail & Verifikasi */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  Detail Laporan {selectedReport.id}
                </h3>
                <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-rose-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Info & Foto Laporan */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Foto Bukti Darurat</h4>
                    <img 
                      src={selectedReport.photo} 
                      alt="Bukti Darurat" 
                      className="w-full h-48 object-cover rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Pelapor</div>
                      <div className="font-semibold text-slate-800">{selectedReport.kader} ({selectedReport.kaderId})</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Waktu</div>
                      <div className="font-semibold text-slate-800">{selectedReport.date}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Lokasi / Catatan</div>
                      <div className="font-semibold text-slate-800 flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-[#008AC9] mt-0.5 shrink-0" />
                        {selectedReport.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Verifikasi / Tindakan */}
                <div className="flex flex-col h-full">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#008AC9]" /> 
                    {selectedReport.status === 'verified' ? 'Tindakan yang Telah Diberikan' : 'Berikan Instruksi Tindakan'}
                  </h4>

                  {selectedReport.status === 'verified' ? (
                    <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex flex-col">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                        <CheckCircle className="w-5 h-5" /> Laporan Selesai
                      </div>
                      <p className="text-slate-700">{selectedReport.tindakan}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleVerifikasi} className="flex-1 flex flex-col">
                      <div className="flex-1 mb-4">
                        <textarea
                          className="w-full h-full min-h-[150px] border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/20 resize-none"
                          placeholder="Contoh: Terimakasih infonya. Instruksikan warga menjauhi area, tim fogging segera dikirim ke lokasi Anda."
                          value={tindakanText}
                          onChange={(e) => setTindakanText(e.target.value)}
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-[#008AC9] hover:bg-[#0076ad] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" /> Verifikasi & Kirim Tindakan
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
