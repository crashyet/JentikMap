import React, { useState, useEffect, useRef } from 'react';
import kaderService from '../../services/kaderService';
import { AlertTriangle, MapPin, Camera, Loader2, CheckCircle2, XCircle, Crosshair, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const LaporanDaruratPage = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState(null); // { lat, lng }
  const [locationError, setLocationError] = useState('');
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');

  // Otomatis mencari lokasi saat komponen dimuat
  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError("Browser Anda tidak mendukung fitur deteksi lokasi (GPS).");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      (error) => {
        console.error("GPS Error:", error);
        setLocationError("Gagal mendapatkan lokasi. Pastikan GPS aktif dan Anda telah memberikan izin.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran (contoh: maksimal 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran gambar terlalu besar. Maksimal 5MB.");
        return;
      }
      setSelectedFile(file);
      // Membuat URL temporary untuk preview gambar
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitMessage('');

    if (!location) {
      setLocationError("Titik koordinat (GPS) wajib ada sebelum mengirim laporan.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Membuat objek FormData sesuai kebutuhan API
      const formData = new FormData();
      formData.append('lat', location.lat.toString());
      formData.append('lng', location.lng.toString());
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      // Panggil Service API
      const response = await kaderService.reportEmergency(formData);
      
      setSubmitStatus('success');
      setSubmitMessage(response.message || "Peringatan darurat berhasil dikirim ke Puskesmas & Admin!");
      
      // Reset form
      removeImage();
      
    } catch (error) {
      setSubmitStatus('error');
      // Tangkap pesan error spesifik dari backend jika ada
      const errMessage = error.response?.data?.error || "Gagal mengirim laporan. Periksa koneksi Anda.";
      setSubmitMessage(errMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
      
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
        <AlertTriangle size={250} />
      </div>

      {/* HEADER */}
      <div className="relative z-10 mb-8 border-b border-slate-100 pb-6">
        <div className="inline-flex items-center justify-center p-3 bg-rose-100 text-rose-600 rounded-2xl mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-rose-700 tracking-tight">Laporan Darurat Suspek DBD</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl">
          Gunakan formulir ini <b>hanya</b> apabila ditemukan warga yang menunjukkan gejala kuat atau sudah didiagnosis terjangkit Demam Berdarah Dengue (DBD). Laporan ini akan memicu peringatan seketika ke Admin dan Puskesmas Pusat.
        </p>
      </div>

      {/* ALERT STATUS */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-emerald-800">Laporan Berhasil Dikirim</h4>
            <p className="text-sm text-emerald-600 mt-1">{submitMessage}</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
          <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-800">Gagal Mengirim Laporan</h4>
            <p className="text-sm text-rose-600 mt-1">{submitMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* KOLOM KIRI: LOKASI & FOTO */}
        <div className="flex-1 space-y-6">
          
          {/* SECTION LOKASI GPS */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" /> Titik Lokasi Pasien / Temuan
            </h3>
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-bold mb-1">Koordinat Saat Ini:</p>
                {isLocating ? (
                  <div className="flex items-center gap-2 text-sm text-[#008AC9] font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" /> Sedang mencari lokasi GPS...
                  </div>
                ) : location ? (
                  <p className="text-sm font-mono text-slate-800 font-bold">
                    {location.lat}, {location.lng}
                  </p>
                ) : (
                  <p className="text-sm text-rose-500 font-medium">Lokasi belum terdeteksi</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="p-3 bg-blue-50 text-[#008AC9] hover:bg-[#008AC9] hover:text-white rounded-xl transition-colors shrink-0 disabled:opacity-50"
                title="Perbarui Titik Lokasi"
              >
                <Crosshair className={cn("w-5 h-5", isLocating && "animate-spin")} />
              </button>
            </div>
            {locationError && <p className="text-xs text-rose-600 font-medium mt-2">{locationError}</p>}
            <p className="text-xs text-slate-500">Pastikan Anda berada di lokasi kejadian agar koordinat yang terkirim akurat.</p>
          </div>

          {/* SECTION FOTO BUKTI (OPSIONAL) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#008AC9]" /> Foto Bukti Pendukung <span className="text-slate-400 text-xs normal-case font-normal">(Opsional)</span>
            </h3>
            
            {!previewUrl ? (
              <div 
                className="border-2 border-dashed border-slate-300 rounded-xl bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center p-8 cursor-pointer relative"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 bg-blue-50 text-[#008AC9] rounded-full flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">Klik untuk unggah foto</p>
                <p className="text-xs text-slate-500 mt-1">Lingkungan, surat lab, atau kondisi sekitar (Maks 5MB)</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white">
                <img src={previewUrl} alt="Preview Bukti" className="w-full max-h-[250px] object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-white/90 text-rose-600 p-2 rounded-full shadow-lg hover:bg-rose-50 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

        </div>

        {/* KOLOM KANAN: KONFIRMASI & SUBMIT */}
        <div className="flex-1 lg:max-w-xs flex flex-col justify-end">
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200">
            <h3 className="font-bold text-rose-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Konfirmasi Tindakan
            </h3>
            <p className="text-sm text-rose-700 mb-6 leading-relaxed">
              Dengan menekan tombol di bawah, Anda mengonfirmasi bahwa informasi suspek DBD ini adalah benar dan memerlukan tindakan intervensi segera (misalnya Fogging atau pemeriksaan medis).
            </p>
            
            <button
              type="submit"
              disabled={isSubmitting || !location}
              className="w-full flex items-center justify-center gap-2 py-4 bg-rose-600 text-white rounded-xl font-black text-lg hover:bg-rose-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(225,29,72,0.3)]"
            >
              {isSubmitting ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Memproses...</>
              ) : (
                <><AlertTriangle className="w-6 h-6" /> KIRIM DARURAT</>
              )}
            </button>
            {!location && <p className="text-xs text-rose-600 font-bold mt-3 text-center">Menunggu deteksi GPS...</p>}
          </div>
        </div>

      </form>
    </div>
  );
};

export default LaporanDaruratPage;