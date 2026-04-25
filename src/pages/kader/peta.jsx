const KaderPetaPage = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Peta Wilayah Tugas</h2>
      <p className="text-slate-500 mb-6">Fokus pada RW 03. Warna merah menandakan titik jentik positif.</p>
      <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#008AC9 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <p className="text-slate-500 font-medium z-10 flex flex-col items-center">
          <svg className="w-12 h-12 text-[#008AC9] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          Komponen Peta Interaktif Dimuat Di Sini
        </p>
      </div>
    </div>
  );
};
export default KaderPetaPage;
