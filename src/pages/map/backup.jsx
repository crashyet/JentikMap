import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shieldImg from '../../assets/shield.png';
import { Map, MapControls, MapMarker } from '@/components/ui/map';
import { cn } from '@/lib/utils';
import mapService from '../../services/mapService';

const MapPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTheme, setMapTheme] = useState('voyager');
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapStyles = {
    liberty: "https://tiles.openfreemap.org/styles/liberty",
    voyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    positron: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setIsLoading(true);
        const data = await mapService.getMarkers();
        setMarkers(data);
      } catch (err) {
        setError('Gagal memuat data peta');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  /* 
  const [markers, setMarkers] = useState([]);
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
  */

  const getStatusColor = (status) => {
    switch (status) {
      case 'aman': return 'bg-green-500 ring-green-400';
      case 'waspada': return 'bg-yellow-500 ring-yellow-400';
      case 'bahaya': return 'bg-red-500 ring-red-400';
      default: return 'bg-gray-500 ring-gray-400';
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden font-sans">
      {isLoading && (
        <div className="absolute inset-0 z-100 bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#008AC9] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-[#008AC9]">Memuat Data Peta...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-100 bg-red-50 border border-red-100 text-red-600 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-bold">{error}</span>
        </div>
      )}
      {/* Interactive Map Component */}
      <Map 
        key={mapTheme} // Force re-render on theme change
        center={[109.01, -7.71]} 
        zoom={14} 
        style={mapStyles[mapTheme]}
        className="transition-all duration-500"
      >
        <MapControls />
        {markers.map((marker) => (
          <MapMarker key={marker.id} lngLat={marker.lngLat}>
            <div className="relative group">
              {/* Pulsing ring */}
              <div className={`absolute inset-0 w-12 h-12 -m-4 rounded-full animate-ping opacity-20 ${getStatusColor(marker.status).split(' ')[1]}`}></div>
              {/* Glow effect */}
              <div className={`absolute inset-0 w-16 h-16 -m-6 rounded-full blur-xl opacity-30 ${getStatusColor(marker.status).split(' ')[0]}`}></div>
              
              {/* Main marker dot */}
              <div className={`relative w-6 h-6 rounded-full border-4 border-white shadow-xl transition-transform group-hover:scale-125 ${getStatusColor(marker.status).split(' ')[0]}`}></div>
              
              {/* Label */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg text-[10px] font-bold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all border border-gray-100">
                {marker.label}
              </div>
            </div>
          </MapMarker>
        ))}
      </Map>

      {/* Top Floating Bar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-3 md:p-4 flex items-center justify-between gap-4 border border-white/50">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="bg-blue-50 p-2 rounded-xl">
              <img src={shieldImg} alt="Shield" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:block">Peta Jentik</span>
          </div>

          <div className="flex-1 max-w-md relative">
            <input 
              type="text" 
              placeholder="Cari Lokasi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-2.5 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#008AC9]/20 focus:bg-white transition-all placeholder:text-gray-400"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-px bg-gray-100 mx-2 hidden sm:block"></div>
            <div className="bg-gray-400/20 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap hidden md:block">
              Warga
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
               <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Board (Bottom Left) */}
      <div className="absolute bottom-10 left-6 z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 w-48">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Tingkat kerawanan</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
              <span className="text-xs font-bold text-gray-600">Aman</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>
              <span className="text-xs font-bold text-gray-600">Waspada</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
              <span className="text-xs font-bold text-gray-600">Bahaya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-10">
        <button className="w-16 h-16 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_-10px_rgba(0,138,201,0.5)] transition-all hover:scale-110 active:scale-90 group">
          <svg className="w-8 h-8 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-10 right-8 z-10 flex flex-col gap-4">
        {/* Theme Switcher */}
        {/* <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-2 border border-white/50 flex flex-col gap-1">
          {Object.keys(mapStyles).map((style) => (
            <button
              key={style}
              onClick={() => setMapTheme(style)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
                mapTheme === style 
                  ? "bg-[#008AC9] text-white shadow-sm" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {style}
            </button>
          ))}
        </div> */}

        <button className="w-12 h-12 bg-white/90 backdrop-blur-md text-[#008AC9] self-end rounded-full flex items-center justify-center shadow-lg border border-white transition-all hover:bg-white hover:scale-110 active:scale-95">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapPage;
