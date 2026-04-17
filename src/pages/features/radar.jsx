import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronLeft, AlertTriangle, Info, ShieldCheck, Radar, ShieldAlert, Navigation2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/navbar';
import { cn } from '@/lib/utils';

const RadarPage = () => {
  const navigate = useNavigate();
  
  const [nearbyReports] = useState([
    { id: 1, dist: '12m', status: 'bahaya', loc: 'Depan Warung Bu Ani', desc: 'Genangan di ban bekas', time: '2 jam yang lalu', angle: 45, radius: 45 },
    { id: 2, dist: '35m', status: 'waspada', loc: 'Saluran air Jl. Gatot', desc: 'Air selokan menggenang', time: '5 jam yang lalu', angle: 160, radius: 110 },
    { id: 3, dist: '48m', status: 'bahaya', loc: 'Halaman Kosong', desc: 'Pot bunga tidak terpakai', time: '1 hari yang lalu', angle: 280, radius: 160 },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'aman': return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-500' };
      case 'waspada': return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500' };
      case 'bahaya': return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-500' };
      default: return { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: 'text-slate-500' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#008AC9]/20">
      
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent blur-3xl"></div>
      </div>

      <Navbar />
      
      <main className="pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-[#008AC9] transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                Radar Warga
                <Radar className="w-7 h-7 text-[#008AC9]" />
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Sistem peringatan dini dalam radius 50 meter.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 self-start md:self-auto">
             <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-sm font-bold text-slate-700">Radar Aktif</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden aspect-square md:aspect-auto md:h-[600px]">
              
              <iframe
                title="Map Radar Background"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40 scale-150"
                style={{ filter: "invert(100%) hue-rotate(180deg) contrast(120%) brightness(80%) saturate(150%)" }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=108.98%2C-7.73%2C109.03%2C-7.69&layer=mapnik"
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="absolute border border-cyan-500/30 rounded-full"
                    style={{ width: `${i * 120}px`, height: `${i * 120}px` }}
                  ></div>
                ))}
                
                <div className="absolute w-full h-[1px] bg-cyan-500/20"></div>
                <div className="absolute h-full w-[1px] bg-cyan-500/20"></div>

                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[480px] h-[480px] rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(6, 182, 212, 0.5) 360deg)',
                  }}
                >
                   <div className="absolute top-0 left-1/2 w-1.5 h-1/2 bg-cyan-400 blur-[1px] origin-bottom transform -translate-x-1/2 shadow-[0_0_20px_5px_rgba(6,212,238,0.8)]"></div>
                </motion.div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                {nearbyReports.map((report) => (
                  <div 
                    key={report.id}
                    className="absolute w-5 h-5"
                    style={{
                      transform: `rotate(${report.angle}deg) translateY(-${report.radius}px) rotate(-${report.angle}deg)`
                    }}
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-full animate-ping opacity-60",
                      report.status === 'bahaya' ? 'bg-rose-500' : 'bg-amber-500'
                    )}></div>
                    <div className={cn(
                      "relative w-full h-full rounded-full border-2 border-slate-900 shadow-[0_0_15px_rgba(255,0,0,0.9)]",
                      report.status === 'bahaya' ? 'bg-rose-500' : 'bg-amber-500'
                    )}></div>
                  </div>
                ))}
              </div>

              <div className="relative z-30 w-12 h-12 bg-cyan-900/80 rounded-full border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.8)] flex items-center justify-center backdrop-blur-md">
                <Navigation2 className="w-5 h-5 text-cyan-300 fill-cyan-400" />
              </div>
              
              <div className="absolute top-6 left-6 flex flex-col gap-1 z-30 bg-slate-900/60 p-2 rounded-lg backdrop-blur-sm border border-slate-800">
                 <span className="text-cyan-400 text-[10px] font-mono font-bold tracking-widest">LAT: -7.7123</span>
                 <span className="text-cyan-400 text-[10px] font-mono font-bold tracking-widest">LNG: 109.0123</span>
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-30 bg-slate-900/60 p-2 rounded-lg backdrop-blur-sm border border-slate-800">
                 <span className="text-cyan-400 text-[10px] font-mono font-bold tracking-widest">RAD: 50M</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-full flex flex-col space-y-6">
            
            <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">Status Area Anda</p>
                <h3 className="text-2xl font-black text-rose-600 flex items-center gap-2">
                  Risiko Tinggi <ShieldAlert className="w-6 h-6" />
                </h3>
              </div>
              <div className="w-16 h-16 rounded-full bg-rose-50 border-[4px] border-rose-100 flex items-center justify-center">
                <span className="text-xl font-black text-rose-600">{nearbyReports.filter(r => r.status === 'bahaya').length}</span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Ancaman Terdekat</h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Live
                </span>
              </div>

              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                <AnimatePresence>
                  {nearbyReports.map((report, idx) => {
                    const style = getStatusColor(report.status);
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={report.id}
                        className={cn(
                          "p-4 rounded-2xl border transition-all cursor-pointer group hover:shadow-md",
                          style.bg, style.border
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-white shadow-sm", style.text)}>
                             {report.status === 'bahaya' ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-bold text-slate-800 truncate pr-2">{report.loc}</h4>
                              <span className={cn("text-[10px] font-black px-2.5 py-1 rounded-lg shrink-0", style.bg, style.text, "border", style.border)}>
                                {report.dist}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-slate-600 mb-2 truncate">{report.desc}</p>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span className="text-[10px] font-bold text-slate-400">{report.time}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                 <button 
                   onClick={() => navigate('/report')}
                   className="w-full py-4 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-95 group"
                 >
                   Laporkan Titik Baru
                   <ChevronLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
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