const ValidasiPage = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Validasi Laporan Warga</h2>
      <p className="text-slate-500 mb-8">Berikut adalah daftar laporan jentik di wilayah RW 03 yang menunggu pengecekan langsung.</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600">Pelapor</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Alamat</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Tanggal</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Bukti Foto</th>
              <th className="p-4 font-semibold text-sm text-slate-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4 text-sm font-medium">Budi Santoso</td>
              <td className="p-4 text-sm text-slate-600">Jl. Merdeka No. 10</td>
              <td className="p-4 text-sm text-slate-600">25 Apr 2026</td>
              <td className="p-4 text-sm"><div className="w-16 h-10 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">Foto</div></td>
              <td className="p-4 text-sm text-center">
                <button className="px-3 py-1 bg-[#008AC9] text-white rounded-md mr-2 text-xs font-semibold hover:bg-[#0076ad]">Valid</button>
                <button className="px-3 py-1 bg-rose-600 text-white rounded-md text-xs font-semibold hover:bg-rose-700">Tolak</button>
              </td>
            </tr>
            {/* mock data */}
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4 text-sm font-medium">Siti Aminah</td>
              <td className="p-4 text-sm text-slate-600">Jl. Kenanga Gg 2</td>
              <td className="p-4 text-sm text-slate-600">24 Apr 2026</td>
              <td className="p-4 text-sm"><div className="w-16 h-10 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">Foto</div></td>
              <td className="p-4 text-sm text-center">
                <button className="px-3 py-1 bg-[#008AC9] text-white rounded-md mr-2 text-xs font-semibold hover:bg-[#0076ad]">Valid</button>
                <button className="px-3 py-1 bg-rose-600 text-white rounded-md text-xs font-semibold hover:bg-rose-700">Tolak</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ValidasiPage;
