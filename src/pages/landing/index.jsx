import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import heroImg from '../../assets/hero.png';
import wargaIcon from '../../assets/warga.png';
import kaderIcon from '../../assets/kader.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Peta Rawan Jentik',
      desc: 'Visualisasi heatmap real-time dengan gradasi hijau-kuning-merah. Zoom, geser, dan pantau area rawan di seluruh Cilacap.',
      icon: (
        <svg className="w-6 h-6 text-[#008AC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.96l6-1.5a2 2 0 011.894 0l6 1.5a2 2 0 011.553 1.96v9.764a2 2 0 01-1.106 1.789L15 20m-6 0l6-1.5m-6 1.5V9m6 4.5V20" />
        </svg>
      )
    },
    {
      title: 'Lapor Cepat',
      desc: 'Satu ketuk untuk melaporkan genangan air atau jentik. Tanpa form panjang — langsung buka kamera dan kirim.',
      icon: (
        <svg className="w-6 h-6 text-[#008AC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Smart Scanning',
      desc: 'AI otomatis memvalidasi foto. Masukan foto jentik atau screenshot, memastikan data selalu bersih dan akurat.',
      icon: (
        <svg className="w-6 h-6 text-[#008AC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Radar Warga',
      desc: 'Cek jarak temuan jentik terdekat dari rumahmu. Peringatan dini jika ada bahaya dalam radius 50 meter.',
      icon: (
        <svg className="w-6 h-6 text-[#008AC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 bg-[#E3F2FD]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Lindungi Keluarga dari <span className="text-[#008AC9]">Demam Berdarah</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              JentikMap adalah peta interaktif yang membantu warga Cilacap memantau sebaran jentik nyamuk secara real-time. Lapor cepat, cek radar rumahmu, dan cegah DBD bersama.
            </p>
            <button 
              onClick={() => navigate('/map')}
              className="bg-[#008AC9] hover:bg-[#0076ad] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95"
            >
              Buka Peta Jentik
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-20 transform scale-150"></div>
            <img src={heroImg} alt="Mascot Illustration" className="relative w-full max-w-lg mx-auto transform hover:rotate-3 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4 Fitur Unggulan</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Dirancang untuk memudahkan warga, kader, dan pemerintah dalam memantau dan mencegah penyebaran DBD.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50 transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="peran" className="py-24 px-4 md:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Peranmu</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Dirancang untuk memudahkan warga, kader, dan pemerintah dalam memantau dan mencegah penyebaran DBD.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {/* Warga */}
            <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <img src={wargaIcon} alt="Warga" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Warga</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Pantau peta jentik, laporkan temuan, dan cek radar rumahmu. Fitur: Heatmap, Lapor Cepat, Smart Scanning, Radar Warga.
              </p>
              <button 
                onClick={() => navigate('/auth')}
                className="w-full py-3 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-xl font-bold transition-all shadow-md mt-auto"
              >
                Masuk
              </button>
            </div>
            {/* Kader */}
            <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <img src={kaderIcon} alt="Kader" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kader Kesehatan</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Kelola laporan wilayah, verifikasi data, pantau kinerja pelaporan, dan lapor temuan langsung dari lapangan.
              </p>
              <button 
                onClick={() => navigate('/auth')}
                className="w-full py-3 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-xl font-bold transition-all shadow-md mt-auto"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-[#008AC9] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
          {/* Background mascot watermark */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
            <img src={heroImg} alt="maskot background" className="w-[600px] h-[600px] object-contain" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Siap Cegah DBD di Lingkunganmu
            </h2>
            <p className="text-blue-50 mb-10 text-lg opacity-90">
              Bergabung dengan ribuan warga Cilacap yang sudah aktif memantau dan melaporkan jentik nyamuk.
            </p>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-white text-[#008AC9] hover:bg-blue-50 px-10 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 mx-auto active:scale-95"
            >
              Mulai Sekarang
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
