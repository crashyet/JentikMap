const StatistikGlobal = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Statistik Global</h2>
      
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
        <svg className="w-16 h-16 text-[#008AC9]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
        <p className="text-slate-500 font-medium">Grafik Laporan Bulanan (Chart.js / Recharts akan dimuat di sini)</p>
      </div>
    </div>
  );
};
export default StatistikGlobal;
