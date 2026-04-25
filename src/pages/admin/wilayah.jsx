const DataWilayah = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manajemen Wilayah & Area Jentik</h2>
        <button className="px-4 py-2 bg-[#008AC9] text-white font-semibold rounded-lg text-sm hover:bg-[#0076ad] shadow-sm">
          + Tambah Wilayah
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
           <h3 className="text-rose-700 font-bold mb-1">Rawan Tinggi</h3>
           <p className="text-2xl font-black text-rose-800">12 <span className="text-sm font-medium">RW</span></p>
        </div>
        <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
           <h3 className="text-amber-700 font-bold mb-1">Waspada</h3>
           <p className="text-2xl font-black text-amber-800">34 <span className="text-sm font-medium">RW</span></p>
        </div>
        <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-xl">
           <h3 className="text-emerald-700 font-bold mb-1">Aman</h3>
           <p className="text-2xl font-black text-emerald-800">82 <span className="text-sm font-medium">RW</span></p>
        </div>
      </div>
    </div>
  );
};
export default DataWilayah;
