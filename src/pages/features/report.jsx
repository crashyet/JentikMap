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
    <div className="min-h-screen bg-[#F8FAFC]">
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
      
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lapor Cepat</h1>
            <p className="text-sm text-gray-500">Laporkan temuan jentik di sekitarmu</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex gap-2 mb-8">
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#008AC9]' : 'bg-gray-200'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#008AC9]' : 'bg-gray-200'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-[#008AC9]' : 'bg-gray-200'}`}></div>
        </div>

        {/* Step 1: Upload Photo */}
        {step === 1 && (
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 text-center">
            <div className="relative w-full aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-8 overflow-hidden group">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-[#008AC9]/20 border-t-[#008AC9] rounded-full animate-spin"></div>
                  <p className="text-sm font-medium text-gray-500">Memproses Foto & Lokasi...</p>
                </div>
              ) : photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-[#008AC9]" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">Ambil atau Unggah Foto</p>
                  <p className="text-xs text-gray-400">Pastikan genangan air terlihat jelas</p>
                </>
              )}
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={triggerUpload}
                  className="flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
                >
                  <Upload className="w-5 h-5" /> Galeri
                </button>
                <button 
                  type="button"
                  onClick={triggerUpload}
                  className="flex items-center justify-center gap-2 py-4 bg-[#008AC9] rounded-2xl font-bold text-white shadow-lg hover:bg-[#0076ad] transition-all"
                >
                  <Camera className="w-5 h-5" /> Kamera
                </button>
             </div>
          </div>
        )}

        {/* Step 2: Location & Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#008AC9]" /> Lokasi Temuan
              </h3>
              <div className="w-full h-64 bg-gray-100 rounded-2xl mb-4 relative overflow-hidden group">
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
                    <div className="w-8 h-8 bg-[#008AC9] rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  </MapMarker>
                </Map>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#008AC9] border border-blue-100 shadow-sm pointer-events-none">
                  Seret peta untuk mengatur posisi
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin className="w-4 h-4 text-[#008AC9]" />
                <span className="text-sm font-bold">{locationName}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                Koordinat: {lngLat[0].toFixed(4)}, {lngLat[1].toFixed(4)}
              </p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Detail Tambahan</h3>
              <textarea 
                placeholder="Ceritakan detail temuan (Contoh: Pot bunga depan rumah kosong)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#008AC9]/20 transition-all min-h-[120px]"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Kirim Laporan <Send className="w-5 h-5" />
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
