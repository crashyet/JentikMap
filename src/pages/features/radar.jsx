import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, MapPin, ChevronLeft, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import Navbar from '../../components/layout/navbar';

const RadarPage = () => {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(0);
  const [nearbyReports] = useState([
    { id: 1, dist: '12m', status: 'bahaya', loc: 'Depan Warung Bu Ani', time: '2 jam yang lalu' },
    { id: 2, dist: '35m', status: 'waspada', loc: 'Saluran air Jl. Gatot', time: '5 jam yang lalu' },
    { id: 3, dist: '250m', status: 'aman', loc: 'Masjid Al-Huda', time: '1 hari yang lalu' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'aman': return 'text-green-500 bg-green-50 border-green-100';
      case 'waspada': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'bahaya': return 'text-red-500 bg-red-50 border-red-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Radar Warga</h1>
              <p className="text-sm text-gray-500">Pantau ancaman jentik di sekitarmu</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#008AC9] text-xs font-bold rounded-full border border-blue-100">
             <div className="w-2 h-2 bg-[#008AC9] rounded-full animate-pulse"></div> Aktif
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Visualization */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-[400px]">
             {/* Radar Rings */}
             <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className={`absolute border-2 border-blue-100 rounded-full transition-all duration-1000 ${pulse >= i ? 'scale-110 opacity-100' : 'scale-75 opacity-0'}`}
                    style={{ width: `${i * 120}px`, height: `${i * 120}px` }}
                  ></div>
                ))}
                {/* Sweep Animation */}
                <div className="absolute w-[300px] h-[300px] bg-linear-to-r from-blue-400/20 to-transparent rounded-full animate-[spin_4s_linear_infinite] origin-center z-0"></div>
             </div>

             {/* User Indicator */}
             <div className="relative z-10 w-16 h-16 bg-blue-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                <div className="w-4 h-4 bg-[#008AC9] rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-[#008AC9] rounded-full relative"></div>
             </div>
             
             <p className="absolute bottom-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Memindai Radius 50m</p>
          </div>

          {/* Nearby Findings */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">Temuan Terdekat</h3>
                <span className="text-xs font-bold text-[#008AC9]">{nearbyReports.filter(r => r.status === 'bahaya').length} Bahaya</span>
              </div>

              <div className="space-y-4">
                {nearbyReports.map((report) => (
                  <div 
                    key={report.id}
                    className="p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-blue-100 hover:bg-blue-50/20 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getStatusColor(report.status)}`}>
                       {report.status === 'bahaya' ? <AlertCircle className="w-6 h-6" /> : report.status === 'waspada' ? <Info className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900 truncate">{report.loc}</span>
                        <span className="text-[10px] font-bold text-[#008AC9] bg-blue-50 px-2 py-0.5 rounded-full">{report.dist}</span>
                      </div>
                      <p className="text-xs text-gray-400">{report.time}</p>
                    </div>
                    <button className="p-2 text-gray-300 group-hover:text-[#008AC9] transition-colors">
                      <ChevronLeft className="w-5 h-5 rotate-180" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col gap-4">
                 <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      "Lindungi radius 50 meter di sekitarmu. Satu temuan jentik bisa mengancam seluruh blok."
                    </p>
                 </div>
                 <button className="w-full py-4 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-2xl font-bold transition-all shadow-md">
                   Laporkan Titik Baru
                 </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RadarPage;
