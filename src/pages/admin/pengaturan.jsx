const PengaturanAdmin = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Pengaturan Sistem</h2>
      
      <div className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex justify-between">
            <span>Batas Validasi AI Otomatis (Confidence Score)</span>
            <span className="text-[#008AC9]">85%</span>
          </label>
          <input type="range" min="50" max="99" defaultValue="85" className="w-full accent-[#008AC9]" />
          <p className="text-xs text-slate-400">Laporan dengan skor AI di bawah nilai ini akan diteruskan ke Kader untuk validasi manual.</p>
        </div>
        
        <hr className="border-slate-100" />

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Notifikasi Sistem</h3>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#008AC9]" />
            <span className="text-sm text-slate-600">Kirim email ringkasan mingguan ke Admin</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#008AC9]" />
            <span className="text-sm text-slate-600">Aktifkan push notification untuk laporan darurat (DBD Positif)</span>
          </label>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button className="px-6 py-2 bg-[#008AC9] text-white rounded-lg font-semibold hover:bg-[#0076ad] shadow-sm">
            Simpan Konfigurasi
          </button>
        </div>
      </div>
    </div>
  );
};
export default PengaturanAdmin;
