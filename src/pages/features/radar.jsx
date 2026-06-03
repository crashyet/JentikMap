import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, ChevronLeft, MapPin, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '../../components/layout/navbar';
import mapService from '../../services/mapService';

const RadarPage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const startRadarScan = async () => {
    setIsScanning(true);
    setError('');
    setResult(null);

    const token = localStorage.getItem('user_token');

    try {
      // Jika pengguna sudah login, kita bisa update lokasinya dulu lalu cek jarak akun
      if (token) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              await mapService.updateUserLocation(latitude, longitude);
              const data = await mapService.checkDistanceUser();
              setResult(data);
            } catch (err) {
              setError('Gagal memproses data dengan server.');
            } finally {
              setIsScanning(false);
            }
          },
          async () => {
            // Jika gagal dapat GPS, coba langsung panggil data lokasi yang sudah tersimpan
            try {
              const data = await mapService.checkDistanceUser();
              setResult(data);
            } catch (err) {
              setError('Gagal mendapatkan lokasi. Pastikan GPS aktif.');
            } finally {
              setIsScanning(false);
            }
          },
          { enableHighAccuracy: true }
        );
      } else {
        // Mode Publik (Tanpa Login)
        if (!navigator.geolocation) {
          setError('Browser Anda tidak mendukung deteksi lokasi (GPS).');
          setIsScanning(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await mapService.checkDistancePublic(latitude, longitude);
              setResult(data);
            } catch (err) {
              setError('Gagal menghubungi server Radar.');
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
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memindai radar.');
      setIsScanning(false);
    }
  };

  const getStatusDisplay = (kategori) => {
    switch (kategori) {
      case 'bahaya': 
        return { color: 'text-rose-500', bg: 'bg-rose-50', icon: <AlertTriangle className="w-8 h-8 text-rose-500" /> };
      case 'warning': 
        return { color: 'text-amber-500', bg: 'bg-amber-50', icon: <AlertTriangle className="w-8 h-8 text-amber-500" /> };
      case 'aman': 
      default:
        return { color: 'text-emerald-500', bg: 'bg-emerald-50', icon: <ShieldCheck className="w-8 h-8 text-emerald-500" /> };
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white selection:bg-[#008AC9]/20 relative overflow-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 pt-24 pb-12 max-w-2xl mx-auto w-full">
        
        <div className="w-full flex items-center gap-4 mb-12">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all active:scale-95 group border border-slate-700"
          >
            <ChevronLeft className="w-6 h-6 text-slate-300 group-hover:text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Radar Warga
            </h1>
            <p className="text-sm font-medium text-slate-400 mt-1">Peringatan dini area rawan di sekitarmu.</p>
          </div>
        </div>

        {/* Radar Animation Area */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-slate-700/50"></div>
          <div className="absolute inset-4 rounded-full border border-slate-700/50"></div>
          <div className="absolute inset-12 rounded-full border border-slate-700/50"></div>
          <div className="absolute inset-20 rounded-full border border-slate-700/50"></div>
          
          {/* Garis Crosshair */}
          <div className="absolute w-full h-px bg-slate-700/50"></div>
          <div className="absolute h-full w-px bg-slate-700/50"></div>

          {/* Sweeping Radar Scanner */}
          {isScanning && (
            <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-[#008AC9]/40 to-transparent origin-bottom-left animate-[spin_2s_linear_infinite] rounded-tr-full border-r-2 border-[#008AC9]"></div>
          )}

          {/* Center Point */}
          <div className="absolute w-4 h-4 bg-[#008AC9] rounded-full shadow-[0_0_15px_rgba(0,138,201,1)] z-10 flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Status & Messages */}
        <div className="w-full text-center space-y-6">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          {result && !isScanning && (
            <div className={cn("p-6 rounded-[2rem] border animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center", getStatusDisplay(result.kategori).bg)}>
              <div className="mb-4">
                {getStatusDisplay(result.kategori).icon}
              </div>
              <h3 className={cn("text-2xl font-extrabold mb-2 capitalize", getStatusDisplay(result.kategori).color)}>
                Status: {result.kategori}
              </h3>
              <p className="text-slate-700 font-medium mb-4">
                {result.message}
              </p>
              {result.jarak_meter > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">
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
              "w-full max-w-sm mx-auto h-14 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl",
              isScanning 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                : "bg-gradient-to-r from-[#008AC9] to-cyan-500 hover:from-[#0076ad] hover:to-cyan-600 text-white shadow-blue-900/50 hover:scale-105 active:scale-95"
            )}
          >
            {isScanning ? (
              <><Loader2 className="w-6 h-6 animate-spin" /> Memindai Area...</>
            ) : (
              <><Radar className="w-6 h-6" /> Pindai Radius 50m</>
            )}
          </button>
        </div>
        
      </main>
    </div>
  );
};

export default RadarPage;