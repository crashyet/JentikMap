import React from 'react';
import heroImg from '../../assets/hero.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src={heroImg} alt="JentikMap Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">JentikMap</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Platform pemantauan jentik nyamuk berbasis peta interaktif untuk pencegahan DBD di Kabupaten Cilacap.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Navigasi</h4>
            <ul className="space-y-4">
              <li><a href="#fitur" className="text-gray-500 hover:text-[#008AC9] text-sm transition-colors">Fitur Unggulan</a></li>
              <li><a href="#peran" className="text-gray-500 hover:text-[#008AC9] text-sm transition-colors">Portal Peran</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#008AC9] text-sm transition-colors">Peta Interaktif</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="text-gray-500 text-sm">info@jentikmap.id</li>
              <li className="text-gray-500 text-sm">@jentikmap</li>
            </ul>
          </div>

          <div>
            {/* Social icons placeholder if needed */}
          </div>
        </div>

        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 JentikMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
