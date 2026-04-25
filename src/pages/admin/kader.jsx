const ManajemenKader = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Kader</h2>
          <p className="text-slate-500 text-sm">Kelola akses dan data kader kesehatan di tiap wilayah.</p>
        </div>
        <button className="px-4 py-2 bg-[#008AC9] text-white font-semibold rounded-lg text-sm hover:bg-[#0076ad] shadow-sm">
          + Tambah Kader
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600">Nama Kader</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Wilayah Tugas (RW)</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Laporan Divalidasi</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Status</th>
              <th className="p-4 font-semibold text-sm text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4 text-sm font-medium">Siti Aminah</td>
              <td className="p-4 text-sm text-slate-600">RW 03 - Tambakreja</td>
              <td className="p-4 text-sm text-slate-600">124</td>
              <td className="p-4 text-sm"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Aktif</span></td>
              <td className="p-4 text-sm text-right">
                <button className="text-[#008AC9] hover:underline mr-3 font-medium">Edit</button>
                <button className="text-rose-600 hover:underline font-medium">Hapus</button>
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4 text-sm font-medium">Budi Santoso</td>
              <td className="p-4 text-sm text-slate-600">RW 01 - Donan</td>
              <td className="p-4 text-sm text-slate-600">89</td>
              <td className="p-4 text-sm"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Aktif</span></td>
              <td className="p-4 text-sm text-right">
                <button className="text-[#008AC9] hover:underline mr-3 font-medium">Edit</button>
                <button className="text-rose-600 hover:underline font-medium">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManajemenKader;
