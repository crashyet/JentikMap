import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Cpu, Upload, ChevronLeft, ShieldCheck, Microscope, AlertTriangle, Sparkles, CheckCircle2, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/navbar';
import { cn } from '@/lib/utils';

const ScanPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setResult(null);
    
    // Simulasi proses scanning AI
    setTimeout(() => {
      setScanning(false);
      setResult({
        status: 'warning',
        type: 'Aedes aegypti (Jentik)',
        confidence: '98.4%',
        message: 'Jentik terdeteksi! Segera bersihkan genangan air ini.',
      });
    }, 3500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      startScan();
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#008AC9]/20 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-bl from-blue-200/40 to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/30 to-transparent rounded-full blur-[100px]"></div>
      </div>

      <Navbar />

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <main className="pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-[#008AC9] transition-colors" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              Smart Scanning
              <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400" />
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Identifikasi jentik nyamuk seketika dengan kecerdasan buatan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* KIRI: Upload & Scan Area */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
              
              {/* Header Card Kiri */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Scan className="w-5 h-5 text-[#008AC9]" /> Area Analisis
                </h2>
                {scanning && (
                  <span className="flex items-center gap-2 text-xs font-bold text-[#008AC9] bg-blue-50 px-3 py-1.5 rounded-full animate-pulse">
                    <Cpu className="w-4 h-4" /> AI Bekerja
                  </span>
                )}
              </div>

              {/* Box Gambar */}
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden group transition-all duration-300">
                
                {/* Kondisi 1: Belum ada foto */}
                {!photoPreview && !scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={triggerUpload}>
                    <div className="w-24 h-24 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                      <Microscope className="w-12 h-12 text-[#008AC9]" />
                    </div>
                    <p className="text-lg font-extrabold text-slate-700 mb-2">Unggah Foto Target</p>
                    <p className="text-sm font-medium text-slate-400 max-w-xs">Ketuk di sini untuk memilih foto genangan air atau wadah dari galeri Anda.</p>
                  </div>
                )}

                {/* Tampilan Foto */}
                {photoPreview && (
                  <img src={photoPreview} alt="Target" className="w-full h-full object-cover transition-transform duration-700" />
                )}

                {/* Kondisi 2: Sedang Scanning (Overlay Laser & Efek) */}
                {scanning && photoPreview && (
                  <div className="absolute inset-0 z-20 overflow-hidden">
                    {/* Darker Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
                    
                    {/* Laser Scanner Line Animation */}
                    <motion.div 
                      animate={{ y: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                      className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_4px_rgba(34,211,238,0.8)] z-30"
                    />

                    {/* AI Grid Targeting System */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-3xl"></div>
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-xl"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Cpu className="w-12 h-12 text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kondisi 3: Selesai Scan tapi ingin ganti foto */}
                {photoPreview && !scanning && (
                  <div 
                    onClick={triggerUpload}
                    className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer z-20 backdrop-blur-sm"
                  >
                    <Upload className="w-10 h-10 text-white mb-3" />
                    <span className="text-white font-bold tracking-wide">Ganti Foto</span>
                  </div>
                )}
              </div>

              {/* Action Button Bawah Kiri */}
              <div className="mt-6">
                <button 
                  onClick={photoPreview && !scanning ? startScan : triggerUpload}
                  disabled={scanning}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl",
                    scanning 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                      : photoPreview
                        ? "bg-gradient-to-r from-[#008AC9] to-cyan-500 hover:from-[#0076ad] hover:to-cyan-600 text-white shadow-blue-500/30 active:scale-95 hover:-translate-y-1"
                        : "bg-[#008AC9] hover:bg-[#0076ad] text-white shadow-blue-500/30 active:scale-95"
                  )}
                >
                  {scanning ? (
                    <>Menganalisis Pola Visual...</>
                  ) : photoPreview ? (
                    <><Scan className="w-5 h-5" /> Pindai Ulang Gambar</>
                  ) : (
                    <><Upload className="w-5 h-5" /> Pilih Foto & Pindai</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* KANAN: Results Area */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 h-full flex flex-col relative overflow-hidden">
              
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Hasil Deteksi
              </h3>
              
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  
                  {/* State 1: Kosong */}
                  {!result && !scanning && (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center opacity-50 my-auto py-10"
                    >
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                        <Scan className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-600">Menunggu Gambar</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Hasil analisis AI akan muncul di panel ini.</p>
                    </motion.div>
                  )}

                  {/* State 2: Loading Skeleton */}
                  {scanning && (
                     <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="space-y-5 my-auto"
                      >
                        <div className="h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-20 bg-slate-100 rounded-2xl animate-pulse"></div>
                          <div className="h-20 bg-slate-100 rounded-2xl animate-pulse"></div>
                        </div>
                        <div className="h-12 w-2/3 bg-slate-100 rounded-xl animate-pulse mt-8 mx-auto"></div>
                     </motion.div>
                  )}

                  {/* State 3: Hasil Result */}
                  {result && !scanning && (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col h-full"
                    >
                      {/* Banner Peringatan */}
                      <div className={cn(
                        "p-5 rounded-2xl flex items-start gap-4 mb-6 border",
                        result.status === 'warning' ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'
                      )}>
                        <div className={cn("p-2 rounded-xl shrink-0", result.status === 'warning' ? 'bg-rose-100' : 'bg-emerald-100')}>
                          {result.status === 'warning' ? (
                            <AlertTriangle className="w-6 h-6 text-rose-600" />
                          ) : (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          )}
                        </div>
                        <div>
                          <h4 className={cn("text-sm font-extrabold mb-1", result.status === 'warning' ? 'text-rose-900' : 'text-emerald-900')}>
                            Deteksi Positif
                          </h4>
                          <p className={cn("text-sm leading-relaxed", result.status === 'warning' ? 'text-rose-700' : 'text-emerald-700')}>
                            {result.message}
                          </p>
                        </div>
                      </div>

                      {/* Detail Cards */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Bug className="w-4 h-4 text-slate-400" />
                            <p className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500">Spesies</p>
                          </div>
                          <p className="text-sm font-bold text-slate-800">{result.type}</p>
                        </div>
                        
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                           <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="w-4 h-4 text-[#008AC9]" />
                            <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#008AC9]">Tingkat Akurasi</p>
                          </div>
                          <p className="text-2xl font-black text-[#008AC9]">{result.confidence}</p>
                        </div>
                      </div>

                      {/* Tombol Lapor */}
                      <div className="mt-auto pt-6 border-t border-slate-100">
                        <button 
                          onClick={() => navigate('/report')}
                          className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-900/20 active:scale-95 group"
                        >
                          Lanjut Buat Laporan Resmi
                          <ChevronLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                          Data ini akan dikirimkan ke petugas kesehatan terdekat.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default ScanPage;