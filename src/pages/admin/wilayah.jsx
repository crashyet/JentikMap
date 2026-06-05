import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Loader2, Search, Trash2, MapPin, Plus, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';

const DataWilayah = () => {
  // State Data API
  const [summary, setSummary] = useState({ rawan: 0, waspada: 0, aman: 0 });
  const [districts, setDistricts] = useState([]);
  
  // State UI
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data saat komponen dimuat
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError('');
      // Memanggil 2 API sekaligus secara paralel agar lebih cepat
      const [summaryData, districtsData] = await Promise.all([
        adminService.getDistrictSummary(),
        adminService.getDistricts()
      ]);
      
      setSummary(summaryData);
      setDistricts(districtsData);
    } catch (err) {
      setError('Gagal memuat data wilayah dari server. Periksa koneksi Anda.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus wilayah ${nama}? Semua laporan di dalamnya akan menjadi "Unassigned".`);
    if (!confirmDelete) return;

    try {
      await adminService.deleteDistrict(id);
      alert(`Wilayah ${nama} berhasil dihapus.`);
      fetchAllData(); // Refresh tabel setelah dihapus
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghapus wilayah.");
    }
  };

  const handleReassign = async () => {
    try {
      setIsSyncing(true);
      const res = await adminService.reassignDistricts();
      alert(`Berhasil! ${res.assigned_count || 0} laporan telah dimasukkan ke wilayah yang tepat.`);
      fetchAllData(); // Refresh data untuk melihat perubahan angka
    } catch (err) {
      alert("Gagal mensinkronkan data wilayah.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter pencarian lokal (Client-side search)
  const filteredDistricts = districts.filter(d => 
    d.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Wilayah & Area Jentik</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola batas kecamatan dan pantau sebaran laporan yang masuk.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Kolom Pencarian */}
          <div className="relative w-full sm:w-56">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari kecamatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/10 transition-all text-slate-700"
            />
          </div>
          
          <button 
            onClick={handleReassign}
            disabled={isSyncing || isLoading}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-xl text-sm hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            title="Memasukkan laporan yang belum memiliki wilayah berdasarkan koordinatnya"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sinkronkan Laporan
          </button>

          <button 
            onClick={() => alert("Fitur Gambar Polygon Wilayah (Segera Hadir)")}
            className="px-4 py-2 bg-[#008AC9] text-white font-semibold rounded-xl text-sm hover:bg-[#0076ad] shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Tambah Wilayah
          </button>
        </div>
      </div>

      {/* KARTU RINGKASAN (Menggunakan endpoint /summary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 border border-rose-200 bg-rose-50 rounded-2xl flex items-center justify-between shadow-sm">
           <div>
             <h3 className="text-rose-700 font-bold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4"/> Rawan Tinggi</h3>
             <p className="text-3xl font-black text-rose-800">
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2 text-rose-300" /> : summary.rawan}
               {!isLoading && <span className="text-sm font-bold text-rose-600 ml-1">Titik</span>}
             </p>
           </div>
        </div>
        <div className="p-5 border border-amber-200 bg-amber-50 rounded-2xl flex items-center justify-between shadow-sm">
           <div>
             <h3 className="text-amber-700 font-bold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4"/> Waspada</h3>
             <p className="text-3xl font-black text-amber-800">
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2 text-amber-300" /> : summary.waspada}
               {!isLoading && <span className="text-sm font-bold text-amber-600 ml-1">Titik</span>}
             </p>
           </div>
        </div>
        <div className="p-5 border border-emerald-200 bg-emerald-50 rounded-2xl flex items-center justify-between shadow-sm">
           <div>
             <h3 className="text-emerald-700 font-bold mb-1 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4"/> Aman</h3>
             <p className="text-3xl font-black text-emerald-800">
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2 text-emerald-300" /> : summary.aman}
               {!isLoading && <span className="text-sm font-bold text-emerald-600 ml-1">Titik</span>}
             </p>
           </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm font-bold rounded-lg border border-rose-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}
      
      {/* TABEL DATA WILAYAH (Menggunakan endpoint /districts) */}
      <div className="overflow-x-auto flex-1 border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-sm text-slate-600">Nama Wilayah (Kecamatan)</th>
              <th className="p-4 font-bold text-sm text-rose-600 text-center">Titik Rawan</th>
              <th className="p-4 font-bold text-sm text-amber-600 text-center">Titik Waspada</th>
              <th className="p-4 font-bold text-sm text-emerald-600 text-center">Titik Aman</th>
              <th className="p-4 font-bold text-sm text-slate-600 text-center">Total Laporan</th>
              <th className="p-4 font-bold text-sm text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="p-10 text-center">
                  <Loader2 className="w-8 h-8 text-[#008AC9] animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500">Memuat data batas wilayah...</p>
                </td>
              </tr>
            ) : filteredDistricts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-slate-500 text-sm font-medium">
                  {searchQuery ? `Tidak ada wilayah yang cocok dengan pencarian "${searchQuery}"` : "Belum ada wilayah (polygon) yang ditambahkan ke sistem."}
                </td>
              </tr>
            ) : (
              filteredDistricts.map((district) => {
                const totalLaporan = district.rawan + district.waspada + district.aman;
                
                return (
                  <tr key={district.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" /> {district.nama}
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full font-bold border border-rose-100">{district.rawan}</span>
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold border border-amber-100">{district.waspada}</span>
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold border border-emerald-100">{district.aman}</span>
                    </td>
                    <td className="p-4 text-sm text-center font-black text-slate-700">
                      {totalLaporan}
                    </td>
                    <td className="p-4 text-sm flex justify-end gap-2">
                      <button 
                        onClick={() => handleDelete(district.id, district.nama)}
                        className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors" 
                        title="Hapus Wilayah"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataWilayah;