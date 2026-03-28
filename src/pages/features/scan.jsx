import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Cpu, Upload, ChevronLeft, ShieldCheck, Microscope, AlertTriangle } from 'lucide-react';
import Navbar from '../../components/layout/navbar';

const ScanPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = React.useRef(null);

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult({
        status: 'warning',
        type: 'Aedes aegypti',
        confidence: '98.4%',
        message: 'Jentik terdeteksi! Segera bersihkan genangan air.',
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate('/')}
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Smart Scanning</h1>
            <p className="text-sm text-gray-500">Gunakan AI untuk identifikasi jentik nyamuk</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Scan Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-full aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group mb-6">
                {scanning ? (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
                    {/* Scanning Animation */}
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 border-4 border-[#008AC9]/10 rounded-full"></div>
                      <div className="absolute inset-0 border-t-4 border-[#008AC9] rounded-full animate-spin"></div>
                      <div className="absolute inset-4 border-2 border-[#008AC9]/30 border-dashed rounded-full animate-[spin_3s_linear_infinite]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="w-10 h-10 text-[#008AC9] animate-pulse" />
                      </div>
                    </div>
                    <p className="mt-6 font-bold text-[#008AC9] animate-pulse">Menganalisis Foto...</p>
                  </div>
                ) : null}

                {result || photoPreview ? (
                   <img src={photoPreview || "https://placehold.co/600x600/008AC9/white?text=Foto+Jentik"} alt="Scan result" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Microscope className="w-12 h-12 text-gray-300 mb-4 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-sm font-bold text-gray-900">Masukkan Foto</p>
                    <p className="text-xs text-gray-400">Drag & drop atau klik di sini</p>
                    <button 
                      onClick={triggerUpload}
                      disabled={scanning}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </>
                )}
              </div>

              <button 
                onClick={triggerUpload}
                disabled={scanning}
                className="w-full py-4 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                <Scan className="w-5 h-5" /> {scanning ? 'Memindai...' : 'Ambil Foto & Pindai'}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 h-full flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Hasil Pemindaian</h3>
              
              {!result && !scanning && (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Belum ada data untuk dianalisis</p>
                </div>
              )}

              {scanning && (
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse"></div>
                    ))}
                 </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className={`p-4 rounded-2xl flex items-start gap-3 ${result.status === 'warning' ? 'bg-orange-50' : 'bg-green-50'}`}>
                    <AlertTriangle className={`w-6 h-6 ${result.status === 'warning' ? 'text-orange-600' : 'text-green-600'}`} />
                    <div>
                      <h4 className={`text-sm font-bold ${result.status === 'warning' ? 'text-orange-900' : 'text-green-900'}`}>
                        {result.message}
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Spesies</p>
                      <p className="text-sm font-bold text-gray-900">{result.type}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Akurasi</p>
                      <p className="text-sm font-bold text-[#008AC9]">{result.confidence}</p>
                    </div>
                  </div>

                  <div className="pt-8 mt-auto">
                    <button 
                      onClick={() => navigate('/report')}
                      className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      Lanjut Lapor Penemuan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
