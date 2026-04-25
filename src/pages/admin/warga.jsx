const ManajemenWarga = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Daftar Warga Terdaftar</h2>
      <p className="text-slate-500 mb-6 text-sm">Semua akun warga yang dapat melaporkan jentik nyamuk.</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600">Nama</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Email</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Tanggal Daftar</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Total Laporan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4 text-sm font-medium">Cici Paramida</td>
              <td className="p-4 text-sm text-slate-600">cici@email.com</td>
              <td className="p-4 text-sm text-slate-600">20 Apr 2026</td>
              <td className="p-4 text-sm font-semibold">3</td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4 text-sm font-medium">Deni Sumargo</td>
              <td className="p-4 text-sm text-slate-600">deni@email.com</td>
              <td className="p-4 text-sm text-slate-600">18 Apr 2026</td>
              <td className="p-4 text-sm font-semibold">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManajemenWarga;
