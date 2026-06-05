import React, { useState, useEffect } from 'react';
import kaderService from '../../services/kaderService';
import { Map, MapMarker } from '@/components/ui/map';
import { Loader2, MapPin, AlertTriangle, ShieldCheck, RefreshCw, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

const KaderPetaPage = () => {
  const [blankSpots, setBlankSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State untuk Peta
  const [mapCenter, setMapCenter] = useState([109.012, -7.712]); // Default: Area Cilacap
  const [userLocation, setUserLocation] = useState(null);
  
  // URL Style untuk basemap (menggunakan gaya voyager terang)
  const mapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

  useEffect(() => {
    fetchBlankSpots();
    getUserLocation();
  }, []);

  const fetchBlankSpots = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await kaderService.getBlankSpots();
      setBlankSpots(data);
    } catch (err) {
      setError('Gagal memuat titik rawan dari server. Periksa koneksi internet Anda.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([longitude, latitude]);
          setUserLocation([longitude, latitude]);
        },
        (err) => console.warn("GPS belum diizinkan atau gagal diakses.")
      );
    }
  };

  const centerToUser = () => {
    if (userLocation) {
      setMapCenter([...userLocation]);
    } else {
      getUserLocation();
    }
  };

  // Helper untuk menentukan gaya PIN (Marker) berdasarkan tingkat bahaya
  const getMarkerStyle = (tingkat_bahaya) => {
    const status = tingkat_bahaya?.toLowerCase() || 'aman';
    if (status.includes('rawan') || status.includes('bahaya')) {
      return { bg: 'bg-rose-500', pulse: 'bg-rose-500/40', ring: 'border-rose-200' };
    } else if (status.includes('warning') || status.includes('waspada')) {
      return { bg: 'bg-amber-500', pulse: 'bg-amber-500/40', ring: 'border-amber-200' };
    } else {
      return { bg: 'bg-emerald-500', pulse: 'bg-emerald-500/40', ring: 'border-emerald-200' };
    }
  };

  // Hitung jumlah titik untuk rekap legend
  const countRawan = blankSpots.filter(s => s.tingkat_bahaya?.toLowerCase().includes('rawan')).length;
  const countWaspada = blankSpots.filter(s => s.tingkat_bahaya?.toLowerCase().includes('warning')).length;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col h-[calc(100vh-8rem)]">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Peta Wilayah Titik Rawan</h2>
          <p className="text-slate-500 text-sm mt-1">Pemetaan sebaran area yang telah dikonfirmasi positif jentik / suspek DBD.</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={fetchBlankSpots}
            disabled={isLoading}
            className="px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} /> Segarkan Peta
          </button>
          <button 
            onClick={centerToUser}
            className="p-2 bg-[#008AC9] text-white rounded-lg hover:bg-[#0076ad] transition-colors shadow-sm"
            title="Pusatkan ke lokasi saya"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm font-bold rounded-lg border border-rose-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* AREA PETA */}
      <div className="flex-1 rounded-xl relative overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
        
        {/* Loading Overlay Map */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center">
             <div className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 font-bold text-slate-700">
                <Loader2 className="w-6 h-6 animate-spin text-[#008AC9]" /> Memuat Titik Pemetaan...
             </div>
          </div>
        )}

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-md border border-slate-200 pointer-events-none">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase mb-3 tracking-wider">Keterangan Area</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-sm ring-2 ring-rose-200"></div>
               <span className="text-sm font-bold text-slate-700">Rawan Tinggi <span className="text-slate-400 font-medium ml-1">({countRawan})</span></span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm ring-2 ring-amber-200"></div>
               <span className="text-sm font-bold text-slate-700">Waspada <span className="text-slate-400 font-medium ml-1">({countWaspada})</span></span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-[#008AC9] border-2 border-white shadow-sm ring-2 ring-cyan-200"></div>
               <span className="text-sm font-bold text-slate-700">Lokasi Anda</span>
            </div>
          </div>
        </div>

        {/* Komponen Peta Interaktif */}
        <Map
          key={mapStyle}
          center={mapCenter}
          zoom={14}
          style={mapStyle}
          className="w-full h-full"
        >
          {/* Titik Lokasi Kader (User) Saat Ini */}
          {userLocation && (
            <MapMarker lngLat={userLocation}>
              <div className="relative flex items-center justify-center cursor-pointer group">
                <div className="absolute w-8 h-8 rounded-full bg-cyan-400/30 animate-ping"></div>
                <div className="relative w-4 h-4 bg-[#008AC9] border-2 border-white rounded-full shadow-lg z-10"></div>
                
                {/* Tooltip User */}
                <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Lokasi Anda
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>
            </MapMarker>
          )}

          {/* Titik Rawan (Blank Spots) dari API */}
          {blankSpots.map((spot) => {
            const style = getMarkerStyle(spot.tingkat_bahaya);
            
            return (
              <MapMarker key={spot.id} lngLat={[spot.lng, spot.lat]}>
                <div className="relative flex items-center justify-center cursor-pointer group hover:z-50">
                  {/* Efek Denyut untuk Area Rawan */}
                  <div className={cn("absolute w-12 h-12 rounded-full animate-ping", style.pulse)}></div>
                  
                  {/* Pin Maker */}
                  <div className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-full border-[3px] shadow-md z-10 text-white transition-transform group-hover:scale-110",
                    style.bg,
                    style.ring
                  )}>
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Tooltip Popup saat di-hover */}
                  <div className="absolute bottom-full mb-2 bg-white border border-slate-200 text-slate-800 p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none min-w-[150px] origin-bottom scale-95 group-hover:scale-100 z-50">
                    <div className="flex items-center gap-2 mb-1">
                       {spot.tingkat_bahaya?.toLowerCase().includes('rawan') ? (
                         <AlertTriangle className="w-4 h-4 text-rose-500" />
                       ) : (
                         <ShieldCheck className="w-4 h-4 text-emerald-500" />
                       )}
                       <span className="font-bold text-sm uppercase tracking-wide">
                         Status: {spot.tingkat_bahaya}
                       </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-2">
                       Lat: {spot.lat}<br/>Lng: {spot.lng}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </MapMarker>
            );
          })}
        </Map>

      </div>
    </div>
  );
};

export default KaderPetaPage;