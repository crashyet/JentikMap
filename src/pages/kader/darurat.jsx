import React, { useState } from 'react';
import { Camera, MapPin, Send, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KaderDarurat() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [note, setNote] = useState('');

  // Dummy data for existing reports
  const [reports, setReports] = useState([
    {
      id: 'DR-001',
      date: '2026-04-30 08:15',
      location: 'Jl. Merdeka No.45 (Belakang Rumah Kosong)',
      status: 'verified', // 'pending', 'verified'
      tindakan: 'Lakukan fogging segera. Tim fogging akan meluncur jam 14:00.',
    },
    {
      id: 'DR-002',
      date: '2026-04-30 11:30',
      location: 'RT 04/RW 02 (Selokan Mampet)',
      status: 'pending',
      tindakan: null,
    }
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleGetLocation = () => {
    setLoading(true);
    setTimeout(() => {
      setLocation({ lat: -7.72, lng: 109.01, text: 'Lokasi berhasil didapatkan (GPS)' });
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photo || !location) {
      alert('Mohon lengkapi foto dan lokasi!');
      return;
    }
    
    const newReport = {
      id: `DR-00${reports.length + 1}`,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      location: note || location.text,
      status: 'pending',
      tindakan: null,
    };
    
    setReports([newReport, ...reports]);
    setPhoto(null);
    setLocation(null);
    setNote('');
    alert('Laporan Darurat Berhasil Dikirim!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Darurat</h1>
          <p className="text-slate-500">Laporkan temuan kritis yang membutuhkan penanganan segera dari Admin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Form Input */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden"
        >
          <div className="bg-rose-50 border-b border-rose-100 p-4">
            <h2 className="font-bold text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Buat Laporan Baru
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Upload Foto */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Temuan (Wajib)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                {photo ? (
                  <div className="relative inline-block">
                    <img src={photo} alt="Preview" className="max-h-48 rounded-lg" />
                    <button 
                      type="button" 
                      onClick={() => setPhoto(null)} 
                      className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1"
                    >
                      <AlertTriangle className="w-4 h-4" /> {/* Fallback for X icon since we don't have X imported here */}
                      <span className="sr-only">Hapus</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                      id="darurat-photo" 
                    />
                    <label htmlFor="darurat-photo" className="cursor-pointer flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-2">
                        <Camera className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-[#008AC9]">Klik untuk Upload Foto</span>
                      <span className="text-xs text-slate-500 mt-1">Format: JPG, PNG (Maks 5MB)</span>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Koordinat (Wajib)</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  {loading ? 'Mengambil GPS...' : 'Dapatkan Lokasi Saat Ini'}
                </button>
              </div>
              {location && (
                <div className="mt-2 p-3 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 text-sm font-medium border border-emerald-100">
                  <CheckCircle className="w-4 h-4" /> {location.text}
                </div>
              )}
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan Detail Lokasi</label>
              <textarea
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Misal: Di belakang rumah pak RT 04, selokan tersumbat sampah penuh jentik."
                className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#008AC9] focus:ring-1 focus:ring-[#008AC9]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-200"
            >
              <Send className="w-5 h-5" /> Kirim Laporan Darurat
            </button>
          </form>
        </motion.div>

        {/* Kolom Kanan: Riwayat & Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Riwayat Laporan Anda</h2>
          
          <div className="space-y-4">
            {reports.map((report) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${
                  report.status === 'verified' ? 'border-l-emerald-500' : 'border-l-amber-500'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-500">{report.id} • {report.date}</span>
                    <h3 className="font-semibold text-slate-800 mt-1">{report.location}</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    report.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {report.status === 'verified' ? (
                      <><CheckCircle className="w-3 h-3" /> Diverifikasi Admin</>
                    ) : (
                      <><Clock className="w-3 h-3" /> Menunggu Admin</>
                    )}
                  </div>
                </div>

                {report.status === 'verified' && report.tindakan && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex items-center gap-2 text-[#008AC9] font-bold mb-1">
                      <Info className="w-4 h-4" /> Tindakan dari Admin:
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{report.tindakan}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
