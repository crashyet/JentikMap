import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Send, AlertTriangle, CheckCircle, Clock, Info, X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import kaderService from '../../services/kaderService'; // Pastikan path ini sesuai dengan struktur folder Anda

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id';

export default function KaderDarurat() {
  // State Form
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null); // File asli untuk dikirim ke API
  const [photoPreview, setPhotoPreview] = useState(null); // URL untuk preview UI
  const [location, setLocation] = useState(null); // { lat, lng }
  const fileInputRef = useRef(null);

  // State Riwayat
  const [reports, setReports] = useState([]);
  const [fetchingReports, setFetchingReports] = useState(true);

  // Ambil riwayat saat halaman dimuat
  useEffect(() => {
    fetchEmergencyHistory();
  }, []);

  const fetchEmergencyHistory = async () => {
    try {
      setFetchingReports(true);
      const data = await kaderService.getHistory();
      // Filter hanya untuk menampilkan laporan darurat (suspek DBD) di halaman ini
      const emergencyReports = data.filter(r => r.jenis_laporan === 'suspek_dbd');
      setReports(emergencyReports);
    } catch (error) {
      console.error("Gagal memuat riwayat:", error);
    } finally {
      setFetchingReports(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran gambar terlalu besar. Maksimal 5MB.");
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGetLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung deteksi lokasi (GPS).");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ 
          lat: position.coords.latitude, 
          lng: position.coords.longitude 
        });
        setLocationLoading(false);
      },
      (error) => {
        console.error("GPS Error:", error);
        alert("Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin diberikan.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      alert('Mohon dapatkan Titik Lokasi (GPS) terlebih dahulu!');
      return;
    }
    
    setLoading(true);

    try {
      // Membuat format FormData sesuai API Docs (multipart/form-data)
      const formData = new FormData();
      formData.append('lat', location.lat.toString());
      formData.append('lng', location.lng.toString());
      
      // Foto bersifat opsional, append jika ada
      if (photoFile) {
        formData.append('image', photoFile);
      }

      // Tembak API via Service
      await kaderService.reportEmergency(formData);
      
      alert('Laporan Darurat Berhasil Dikirim ke Admin dan Puskesmas!');
      
      // Reset Form setelah sukses
      removePhoto();
      setLocation(null);
      
      // Refresh riwayat data
      fetchEmergencyHistory();

    } catch (error) {
      // Menangkap pesan error dari backend jika ada
      const errMessage = error.response?.data?.error || "Gagal mengirim laporan. Periksa koneksi Anda.";
      alert(errMessage);
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk Status Badge (Warna dan Ikon)
  const getStatusDisplay = (status) => {
    switch(status) {
      case 'accepted':
      case 'resolved':
        return { color: 'bg-emerald-100 text-emerald-700', border: 'border-l-emerald-500', icon: <CheckCircle className="w-3 h-3" />, text: 'Diverifikasi Admin' };
      case 'rejected':
        return { color: 'bg-rose-100 text-rose-700', border: 'border-l-rose-500', icon: <X className="w-3 h-3" />, text: 'Ditolak' };
      case 'pending':
      default:
        return { color: 'bg-amber-100 text-amber-700', border: 'border-l-amber-500', icon: <Clock className="w-3 h-3" />, text: 'Menunggu Admin' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Darurat</h1>
          <p className="text-slate-500">Laporkan temuan kritis (Suspek DBD) yang membutuhkan penanganan segera.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* KOLOM KIRI: FORM INPUT DARURAT */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden h-fit"
        >
          <div className="bg-rose-50 border-b border-rose-100 p-4">
            <h2 className="font-bold text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Buat Laporan Darurat
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Lokasi (Wajib) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Koordinat (Wajib)</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {locationLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Mengambil GPS...</>
                  ) : (
                    <><MapPin className="w-5 h-5" /> {location ? 'Perbarui Lokasi GPS' : 'Dapatkan Lokasi Saat Ini'}</>
                  )}
                </button>
              </div>
              {location && (
                <div className="mt-2 p-3 bg-emerald-50 text-emerald-700 rounded-xl flex flex-col gap-1 text-sm font-medium border border-emerald-100 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" /> Titik Kordinat Berhasil Didapatkan
                  </div>
                  <div className="font-mono text-xs ml-6 opacity-80">
                    Lat: {location.lat}, Lng: {location.lng}
                  </div>
                </div>
              )}
            </div>

            {/* Upload Foto (Opsional) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Temuan (Opsional)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                {photoPreview ? (
                  <div className="relative inline-block">
                    <img src={photoPreview} alt="Preview" className="max-h-48 rounded-lg object-cover" />
                    <button 
                      type="button" 
                      onClick={removePhoto} 
                      className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1.5 hover:bg-rose-600 shadow-md transition-colors"
                      title="Hapus Foto"
                    >
                      <X className="w-4 h-4" />
                      <span className="sr-only">Hapus</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      ref={fileInputRef}
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

            <button
              type="submit"
              disabled={loading || locationLoading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Memproses Laporan...</>
              ) : (
                <><Send className="w-5 h-5" /> Kirim Laporan Darurat</>
              )}
            </button>
          </form>
        </motion.div>

        {/* KOLOM KANAN: RIWAYAT & STATUS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Riwayat Laporan Darurat Anda</h2>
            <button 
              onClick={fetchEmergencyHistory}
              className="text-sm text-[#008AC9] hover:underline font-medium"
            >
              Refresh
            </button>
          </div>
          
          <div className="space-y-4">
            {fetchingReports ? (
               <div className="text-center py-10 text-slate-500 bg-white rounded-2xl border border-slate-200">
                 <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#008AC9]" />
                 Memuat riwayat...
               </div>
            ) : reports.length === 0 ? (
               <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
                 <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                 <p className="text-slate-500 font-medium">Belum ada riwayat laporan darurat.</p>
               </div>
            ) : (
              reports.map((report) => {
                const statusInfo = getStatusDisplay(report.status);
                
                return (
                  <motion.div 
                    key={report.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${statusInfo.border}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-500">
                          {new Date(report.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                        <div className="text-xs font-mono text-slate-500 mt-1">
                          Lat: {report.lat}, Lng: {report.lng}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.text}
                      </div>
                    </div>

                    {/* Jika ada foto bukti */}
                    {report.image_url && (
                      <div className="mt-3 mb-3">
                         <img 
                            src={`${BASE_URL}${report.image_url}`} 
                            alt="Bukti Darurat" 
                            className="w-20 h-20 object-cover rounded-lg border border-slate-200 bg-slate-100" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                         />
                      </div>
                    )}

                    {/* Catatan Admin (Jika sudah direspon) */}
                    {report.catatan_admin && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <div className="flex items-center gap-2 text-[#008AC9] font-bold mb-1">
                          <Info className="w-4 h-4" /> Tindakan / Catatan Admin:
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          "{report.catatan_admin}"
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}