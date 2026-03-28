import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 w-full max-w-md p-8 text-center overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-400/10 blur-3xl rounded-full z-0"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-green-600 animate-in zoom-in-50 duration-500 delay-150" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{title || "Berhasil!"}</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {message || "Data Anda telah berhasil diproses."}
          </p>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#008AC9] hover:bg-[#0076ad] text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
