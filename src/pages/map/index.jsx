import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shieldImg from '../../assets/shield.png';
import { Map, MapControls, MapMarker } from '@/components/ui/map';
import { cn } from '@/lib/utils';
import { Search, Crosshair, Plus, ShieldAlert } from 'lucide-react';

const MapPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTheme] = useState('voyager');

  const mapStyles = {
    voyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  };

  const markers = [
    { id: 1, lngLat: [109.006, -7.715], status: 'bahaya', label: 'Cilacap Tengah' },
    { id: 2, lngLat: [108.995, -7.708], status: 'waspada', label: 'Tegalreja' },
    { id: 3, lngLat: [109.000, -7.720], status: 'waspada', label: 'Donan' },
    { id: 4, lngLat: [109.012, -7.732], status: 'aman', label: 'Sidakaya' },
    { id: 5, lngLat: [109.025, -7.705], status: 'waspada', label: 'Gunung Simping' },
    { id: 6, lngLat: [109.040, -7.700], status: 'bahaya', label: 'TegalKamulyan' },
    { id: 7, lngLat: [109.015, -7.710], status: 'bahaya', label: 'Sidanegara' },
    { id: 8, lngLat: [108.990, -7.695], status: 'aman', label: 'Donan' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'aman': return { core: 'bg-emerald-500', ring: 'bg-emerald-400', border: 'border-emerald-100' };
      case 'waspada': return { core: 'bg-amber-500', ring: 'bg-amber-400', border: 'border-amber-100' };
      case 'bahaya': return { core: 'bg-rose-500', ring: 'bg-rose-400', border: 'border-rose-100' };
      default: return { core: 'bg-slate-500', ring: 'bg-slate-400', border: 'border-slate-100' };
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-50 overflow-hidden font-sans selection:bg-[#008AC9]/20">

      {/* Interactive Map Component */}
      <Map
        key={mapTheme}
        center={[109.01, -7.71]}
        zoom={14}
        style={mapStyles[mapTheme]}
        className="transition-all duration-500 ease-in-out"
      >
        <MapControls />
        {markers.map((marker) => {
          const colors = getStatusColor(marker.status);
          return (
            <MapMarker key={marker.id} lngLat={marker.lngLat}>
              <div className="relative group cursor-pointer">
                {/* Pulsing ring */}
                <div className={cn("absolute inset-0 w-12 h-12 -m-4 rounded-full animate-ping opacity-20", colors.ring)}></div>
                {/* Glow effect */}
                <div className={cn("absolute inset-0 w-16 h-16 -m-6 rounded-full blur-xl opacity-30", colors.core)}></div>

                {/* Main marker dot */}
                <div className={cn(
                  "relative w-6 h-6 rounded-full border-[3px] border-white shadow-md transition-transform duration-300 group-hover:scale-125",
                  colors.core
                )}></div>

                {/* Tooltip Label */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-xl text-xs font-bold text-slate-700 whitespace-nowrap opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/50 flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", colors.core)}></div>
                  {marker.label}
                </div>
              </div>
            </MapMarker>
          );
        })}
      </Map>

      {/* Top Floating Navigation Bar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 md:p-3 flex items-center justify-between gap-3 border border-white/60">

          {/* Logo & Back Button */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 pl-2 pr-4 cursor-pointer hover:bg-slate-100/50 rounded-full transition-colors py-1"
          >
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-2 rounded-full shadow-sm border border-blue-100/50">
              <ShieldAlert className="w-5 h-5 text-[#008AC9]" />
            </div>
            <span className="text-base font-extrabold text-slate-800 tracking-tight hidden sm:block">
              Jentik<span className="text-[#008AC9]">Map</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-[#008AC9] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari desa atau kecamatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/50 border-transparent focus:border-[#008AC9]/30 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-[#008AC9]/10 focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-700"
            />
          </div>

          {/* Profile/Role Badge */}
          <div className="flex items-center gap-3 pr-2">
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-600">Warga</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#008AC9] to-cyan-400 p-[2px] shadow-sm cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-slate-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Board (Bottom Left) */}
      <div className="absolute bottom-8 left-6 z-10 hidden sm:block">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-xl p-5 border border-white/60 w-52">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">Indikator Area</h4>
          <div className="space-y-3.5">
            {[
              { label: 'Aman', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/40' },
              { label: 'Waspada', color: 'bg-amber-500', shadow: 'shadow-amber-500/40' },
              { label: 'Bahaya', color: 'bg-rose-500', shadow: 'shadow-rose-500/40' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 group">
                <div className={cn("w-3.5 h-3.5 rounded-full shadow-sm transition-transform group-hover:scale-125", item.color, item.shadow)}></div>
                <span className="text-sm font-bold text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Action Button (Lapor) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => navigate('/report')}
          className="group relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="relative w-16 h-16 bg-gradient-to-tr from-[#008AC9] to-cyan-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(0,138,201,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-white/20">
            <Plus className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90" />
          </div>
          {/* Lapor Tooltip */}
          <div className="absolute -top-12 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1 shadow-xl">
            Lapor Temuan
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </button>
      </div>

      {/* Current Location Button (Bottom Right) */}
      <div className="absolute bottom-8 right-6 z-10 flex flex-col gap-4">
        <button className="group w-12 h-12 bg-white/90 backdrop-blur-xl text-slate-600 hover:text-[#008AC9] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-white transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95">
          <Crosshair className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
        </button>
      </div>

    </div>
  );
};

export default MapPage;