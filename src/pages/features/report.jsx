import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Upload, ChevronLeft, Send, CheckCircle2, Image as ImageIcon, Map as MapIcon } from 'lucide-react';
import Navbar from '../../components/layout/navbar';
import exifr from 'exifr';
import { Map, MapMarker } from '@/components/ui/map';
import SuccessModal from '@/components/ui/success-modal';

const ReportPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [lngLat, setLngLat] = useState([109.0123, -7.7123]); // Default Cilacap
  const [locationName, setLocationName] = useState("Jl. Gatot Subroto, Cilacap Tengah");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = React.useRef(null);

  // Map theme
  const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

  const updateLocationInfo = (coords) => {
    setLngLat(coords);
    // Simulation of reverse geocoding
    const mockAreas = ["Cilacap Tengah", "Tegalreja", "Sidanegara", "Donan", "Sidakaya"];
    const randomArea = mockAreas[Math.floor(Math.random() * mockAreas.length)];
    setLocationName(`${randomArea}, Cilacap`);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));

    try {
      // Extract EXIF data
      const gps = await exifr.gps(file);
      if (gps && gps.latitude && gps.longitude) {
        updateLocationInfo([gps.longitude, gps.latitude]);
      }
    } catch (err) {
      console.warn("Failed to extract EXIF data:", err);
    }

    setLoading(false);
    setStep(2);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call and log data
    const reportData = {
      location: {
        name: locationName,
        coordinates: lngLat
      },
      description: description,
      imageFile: photo,
      timestamp: new Date().toISOString()
    };

    console.log("Saving Report Data:", reportData);
    
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-900 selection:bg-[#008AC9]/20 selection:text-slate-900">
      
      {/* Background Ornaments (Purely Decorative) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/30 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <Navbar />
      
      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => navigate('/')}
        title="Laporan Terkirim!"
        message="Terima kasih telah berkontribusi menjaga lingkungan. Laporanmu sedang diverifikasi oleh tim kesehatan."
      />

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      
      <main className="pt-28 pb-16 px-4 md:px-8 max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate('/')}
              className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-[#008AC9] transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                Lapor Cepat
                <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="icon" className="w-7 h-7 drop-shadow-sm opacity-80" />
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Laporkan temuan jentik di sekitarmu</p>
            </div>
          </div>

          {/* Custom Stepper Indicator */}
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 self-start md:self-auto">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= 1 ? 'bg-[#008AC9] text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <div className={`w-8 h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#008AC9]' : 'bg-slate-100'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= 3 ? 'bg-[#008AC9] text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-400'}`}>2</div>
          </div>
        </div>

        {/* Step 1: Upload Photo */}
        {step === 1 && (
          <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
            
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 to-transparent"></div>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Unggah Bukti Temuan</h2>
              <p className="text-slate-500 text-sm">Ambil foto genangan air yang berpotensi menjadi sarang nyamuk.</p>
            </div>

            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-blue-50/30 rounded-3xl border-2 border-dashed border-[#008AC9]/30 hover:border-[#008AC9] flex flex-col items-center justify-center mb-8 overflow-hidden group transition-all duration-300">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#008AC9]/20 border-t-[#008AC9] rounded-full animate-spin"></div>
                  <p className="text-sm font-bold text-[#008AC9] animate-pulse">Memproses Foto & Lokasi...</p>
                </div>
              ) : photoPreview ? (
                <>
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={triggerUpload}>
                    <p className="text-white font-bold flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Camera className="w-4 h-4" /> Ganti Foto
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center cursor-pointer p-8 w-full h-full flex flex-col items-center justify-center" onClick={triggerUpload}>
                  <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <Camera className="w-10 h-10 text-[#008AC9]" />
                  </div>
                  <p className="font-extrabold text-slate-700 mb-1 text-lg">Ambil atau Unggah Foto</p>
                  <p className="text-sm text-slate-500">Pastikan genangan air terlihat jelas</p>
                </div>
              )}
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={triggerUpload}
                  className="flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 border border-slate-100 transition-all active:scale-95"
                >
                  <Upload className="w-5 h-5" /> Galeri
                </button>
                <button 
                  type="button"
                  onClick={triggerUpload}
                  className="flex items-center justify-center gap-2 py-4 bg-gradient-to-tr from-[#008AC9] to-cyan-500 rounded-2xl font-bold text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-all active:scale-95"
                >
                  <Camera className="w-5 h-5" /> Kamera
                </button>
             </div>
          </div>
        )}

        {/* Step 2: Location & Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Location Card */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
              <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#008AC9]" /> Lokasi Temuan
              </h3>
              
              <div className="w-full h-64 bg-slate-100 rounded-3xl mb-5 relative overflow-hidden group border border-slate-200">
                <Map
                  center={lngLat}
                  zoom={15}
                  style={MAP_STYLE}
                  className="w-full h-full cursor-crosshair"
                  onClick={(e) => {
                    updateLocationInfo([e.lngLat.lng, e.lngLat.lat]);
                  }}
                  onMoveEnd={(e) => {
                    const center = e.target.getCenter();
                    updateLocationInfo([center.lng, center.lat]);
                  }}
                >
                  <MapMarker lngLat={lngLat}>
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#008AC9]/30 rounded-full animate-ping"></div>
                      <div className="relative w-8 h-8 bg-[#008AC9] rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </MapMarker>
                </Map>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#008AC9] border border-blue-50 shadow-sm pointer-events-none">
                  Seret peta untuk mengatur posisi
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#008AC9] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-700 block mb-1">{locationName}</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono bg-white px-2 py-1 rounded-md border border-slate-100">
                    {lngLat[1].toFixed(4)}, {lngLat[0].toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-800 mb-2">Detail Tambahan</h3>
              <p className="text-sm font-medium text-slate-500 mb-5">Berikan deskripsi singkat untuk membantu petugas lapang.</p>
              
              <textarea 
                placeholder="Ceritakan detail temuan (Contoh: Pot bunga depan rumah kosong)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-4 focus:ring-[#008AC9]/10 transition-all min-h-[140px] text-slate-700 placeholder:text-slate-400 font-medium resize-y"
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-[#008AC9] to-cyan-500 hover:from-[#0076ad] hover:to-cyan-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Kirim Laporan <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default ReportPage;