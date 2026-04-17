import React from 'react';
import { MapPin, Mail, Phone, Globe, MessageCircle, Share2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.png';

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-20 pb-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#008AC9]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                <img src={heroImg} alt="JentikMap Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Jentik<span className="text-[#008AC9]">Map</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Platform pemantauan jentik nyamuk berbasis peta interaktif pertama di Kabupaten Cilacap. Bersama kita cegah Demam Berdarah Dengue (DBD) mulai dari lingkungan terdekat.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#008AC9] hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#008AC9] hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#008AC9] hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Navigasi</h4>
            <ul className="space-y-3">
              <li>
                <a href="#fitur" className="group flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Fitur Unggulan
                </a>
              </li>
              <li>
                <Link to="/map" className="group flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Peta Interaktif
                </Link>
              </li>
              <li>
                <Link to="/report" className="group flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Lapor Cepat
                </Link>
              </li>
              <li>
                <Link to="/radar" className="group flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Radar Warga
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <span>Pusat Kesehatan Cilacap<br/>Jl. Gatot Subroto No. 1, Cilacap</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-5 h-5 text-cyan-500 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-5 h-5 text-cyan-500 shrink-0" />
                <span>halo@jentikmap.id</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Buletin Jentik</h4>
            <p className="text-sm text-slate-400 mb-4">Dapatkan info terbaru seputar pencegahan DBD dan update fitur aplikasi.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button 
                type="button" 
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#008AC9] hover:bg-cyan-500 text-white rounded-lg text-sm font-bold transition-colors"
              >
                Kirim
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 JentikMap. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;