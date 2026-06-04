import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, ChevronLeft, MapPin, AlertTriangle, ShieldCheck, Loader2, X } from 'lucide-react';
import { Map, MapMarker } from '@/components/ui/map';
import { cn } from '@/lib/utils';
import Navbar from '../../components/layout/navbar';
import mapService from '../../services/mapService';

const RadarPage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  // State untuk Peta
  const [mapTheme] = useState('voyager');
  const [userLocation, setUserLocation] = useState(null); // [lng, lat]
  const [mapCenter, setMapCenter] = useState([109.01, -7.71]);

  const mapStyles = {
    voyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  };

  // Dapatkan lokasi awal saat halaman dibuka
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          setMapCenter([longitude, latitude]);
        },
        () => console.warn("GPS belum diizinkan.")
      );
    }
  }, []);

  const startRadarScan = async () => {
    setIsScanning(true);
    setError('');
    setResult(null);

    if (!navigator.geolocation) {
      setError('Browser Anda tidak mendukung deteksi lokasi (GPS).');
      setIsScanning(false);
      return;
    }

    // Selalu ambil GPS terbaru untuk Radar
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]);
        setMapCenter([longitude, latitude]); // Fokuskan peta ke user

        try {
          // Menggunakan Endpoint Public yang wajib menerima parameter lat & lng
          const data = await mapService.checkDistancePublic(latitude, longitude);
          
          // Data dari backend: { status, jarak_meter, kategori, message }
          setResult(data);
        } catch (err) {
          console.error("Radar Error:", err);
          setError('Gagal memproses data dengan server. Pastikan API menyala.');
        } finally {
          setIsScanning(false);
        }
      },
      () => {
        setError('Akses lokasi (GPS) dibutuhkan untuk menggunakan Radar Warga.');
        setIsScanning(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const getStatusDisplay = (kategori) => {
    // Menyesuaikan kategori dari respon API Backend
    switch (kategori) {
      case 'bahaya': 
        return { color: 'text-rose-500', bg: 'bg-rose-50', ring: 'border-rose-500', icon: <AlertTriangle className="w-6 h-6 text-rose-500" /> };
      case 'warning': 
        return { color: 'text-amber-500', bg: 'bg-amber-50', ring: 'border-amber-500', icon: <AlertTriangle className="w-6 h-6 text-amber-500" /> };
      case 'aman': 
      default:
        return { color: 'text-emerald-500', bg: 'bg-emerald-50', ring: 'border-emerald-500', icon: <ShieldCheck className="w-6 h-6 text-emerald-500" /> };
    }
  };

  // Fungsi untuk menutup popup hasil pencarian
  const closeResult = () => {
    setResult(null);
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans text-white selection:bg-[#008AC9]/20 overflow-hidden flex flex-col">
      <Navbar />

      {/* BACKGROUND MAP */}
      <div className="absolute inset-0 z-0">
        <Map
          key={mapTheme}
          center={mapCenter}
          zoom={userLocation ? 17 : 13} // Zoom lebih dekat untuk radar
          style={mapStyles[mapTheme]}
          className="w-full h-full opacity-60 grayscale-[30%] transition-all duration-1000 ease-in-out mix-blend-luminosity"
        >
          {userLocation && (
            <MapMarker lngLat={userLocation}>
              <div className="relative flex items-center justify-center pointer-events-none">
                
                {/* Lingkaran Radar di Peta */}
                <div className={cn(
                  "absolute rounded-full border-2 transition-all duration-1000 flex items-center justify-center overflow-hidden",
                  isScanning ? "w-64 h-64 md:w-96 md:h-96 bg-cyan-500/10 border-cyan-400" : 
                  result ? `w-64 h-64 md:w-96 md:h-96 ${getStatusDisplay(result.kategori).ring} bg-white/10 backdrop-blur-sm` : 
                  "w-32 h-32 bg-slate-500/20 border-slate-400"
                )}>
                  {/* Animasi Sapuan Radar (Sweeper) */}
                  {isScanning && (
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-400/60 to-transparent origin-bottom-left animate-[spin_1.5s_linear_infinite] rounded-tr-full border-r-4 border-cyan-300"></div>
                  )}
                  {/* Efek Ping (Pulse) saat idle */}
                  {!isScanning && !result && (
                    <div className="w-full h-full rounded-full animate-ping bg-slate-400/20"></div>
                  )}
                </div>

                {/* Titik Pusat (Lokasi User) */}
                <div className="relative w-6 h-6 bg-[#008AC9] border-4 border-white rounded-full shadow-[0_0_15px_rgba(0,138,201,1)] z-10 flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </MapMarker>
          )}
        </Map>
        
        {/* FITUR CLICK OUTSIDE: Overlay gelap yang bisa diklik untuk menutup card */}
        <div 
          onClick={closeResult}
          className={cn(
            "absolute inset-0 transition-colors duration-500",
            result ? "bg-slate-900/60 pointer-events-auto cursor-pointer" : "bg-slate-900/40 pointer-events-none"
          )}
        ></div>
      </div>


      {/* FOREGROUND UI */}
      <main className="flex-1 flex flex-col items-center justify-between p-6 relative z-10 pt-24 pb-12 max-w-2xl mx-auto w-full h-full pointer-events-none">
        
        {/* Header */}
        <div className="w-full flex items-center gap-4 mb-auto pointer-events-auto">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-slate-800/80 backdrop-blur-md rounded-2xl hover:bg-slate-700 transition-all active:scale-95 group border border-slate-600 shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 text-slate-300 group-hover:text-white" />
          </button>
          <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 shadow-xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Radar Warga
            </h1>
            <p className="text-xs md:text-sm font-medium text-slate-300 mt-1">Peringatan dini area rawan di sekitarmu.</p>
          </div>
        </div>

        {/* Status & Controls Panel */}
        <div className="w-full text-center space-y-4 mt-auto pointer-events-auto">
          
          {error && (
            <div className="relative p-4 bg-rose-500/90 backdrop-blur-md border border-rose-400 text-white rounded-2xl text-sm font-bold shadow-2xl animate-in slide-in-from-bottom-4">
              <button onClick={() => setError('')} className="absolute top-2 right-2 p-1 hover:bg-rose-600 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
              {error}
            </div>
          )}

          {result && !isScanning && (
            <div className={cn("relative p-6 rounded-[2rem] border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center", getStatusDisplay(result.kategori).bg, getStatusDisplay(result.kategori).ring)}>
              
              {/* TOMBOL TUTUP (X) */}
              <button 
                onClick={closeResult}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 transition-colors text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-3 bg-white p-3 rounded-full shadow-sm">
                {getStatusDisplay(result.kategori).icon}
              </div>
              <h3 className={cn("text-2xl font-extrabold mb-2 capitalize", getStatusDisplay(result.kategori).color)}>
                Status: {result.kategori}
              </h3>
              <p className="text-slate-700 font-bold mb-4 px-4">
                {result.message}
              </p>
              
              {/* Tampilkan Jarak Jika Ada */}
              {result.jarak_meter > 0 && (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-md border border-slate-100">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-extrabold text-slate-700">
                    Jarak terdekat: <span className={getStatusDisplay(result.kategori).color}>{result.jarak_meter} Meter</span>
                  </span>
                </div>
              )}
            </div>
          )}

          <button 
            onClick={startRadarScan}
            disabled={isScanning}
            className={cn(
              "w-full max-w-sm mx-auto h-16 rounded-full font-extrabold transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl border-2",
              isScanning 
                ? "bg-slate-800/80 backdrop-blur-md text-slate-400 cursor-not-allowed border-slate-600"
                : "bg-gradient-to-r from-[#008AC9] to-cyan-500 hover:from-[#0076ad] hover:to-cyan-600 text-white border-white/20 hover:scale-105 active:scale-95"
            )}
          >
            {isScanning ? (
              <><Loader2 className="w-6 h-6 animate-spin" /> Memindai Radius 50m...</>
            ) : (
              <><Radar className="w-6 h-6" /> {result ? "Pindai Ulang Area" : "Pindai Radius 50m"}</>
            )}
          </button>
        </div>
        
      </main>
    </div>
  );
};

export default RadarPage;