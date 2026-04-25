const PengaturanPage = () => {
  return (
    <div className="max-w-3xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Pengaturan Profil</h2>
      
      <form className="space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 bg-cyan-50 text-[#008AC9] rounded-full flex items-center justify-center text-2xl font-bold border border-[#008AC9]/20">SA</div>
          <button type="button" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">Ganti Foto</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Nama Lengkap</label>
            <input type="text" defaultValue="Siti Aminah" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#008AC9]/20 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Email</label>
            <input type="email" defaultValue="kader@jentik.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#008AC9]/20 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Wilayah Tugas (RW)</label>
            <input type="text" defaultValue="03" disabled className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Kelurahan</label>
            <input type="text" defaultValue="Tambakreja" disabled className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none" />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button type="button" className="px-6 py-2.5 bg-[#008AC9] text-white font-bold rounded-xl shadow-md hover:bg-[#0076ad] transition-colors">Simpan Perubahan</button>
        </div>
      </form>
    </div>
  );
};
export default PengaturanPage;
