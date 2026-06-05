import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Loader2, Search, Trash2, MapPin, Plus, ShieldCheck, AlertTriangle, RefreshCw, X, Map } from 'lucide-react';

const DataWilayah = () => {
  // State Data API
  const [summary, setSummary] = useState({ rawan: 0, waspada: 0, aman: 0 });
  const [districts, setDistricts] = useState([]);
  
  // State UI Utama
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // State untuk Modal Tambah Wilayah
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [namaWilayah, setNamaWilayah] = useState('');
  // Default minimal 3 titik untuk membuat bangun datar (polygon)
  const [points, setPoints] = useState([
    { lat: '', lng: '' },
    { lat: '', lng: '' },
    { lat: '', lng: '' }
  ]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const [summaryData, districtsData] = await Promise.all([
        adminService.getDistrictSummary(),
        adminService.getDistricts()
      ]);
      
      setSummary(summaryData || { rawan: 0, waspada: 0, aman: 0 });
      setDistricts(Array.isArray(districtsData) ? districtsData : []);
      
    } catch (err) {
      setError('Gagal memuat data wilayah dari server. Periksa koneksi Anda.');
      console.error("Error Fetch API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus wilayah ${nama || 'ini'}?`);
    if (!confirmDelete) return;

    try {
      await adminService.deleteDistrict(id);
      alert(`Wilayah berhasil dihapus.`);
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghapus wilayah.");
    }
  };

  const handleReassign = async () => {
    try {
      setIsSyncing(true);
      const res = await adminService.reassignDistricts();
      alert(`Berhasil! ${res?.assigned_count || 0} laporan telah dimasukkan ke wilayah yang tepat.`);
      fetchAllData();
    } catch (err) {
      alert("Gagal mensinkronkan data wilayah.");
    } finally {
      setIsSyncing(false);
    }
  };

  // --- FUNGSI UNTUK MODAL TAMBAH WILAYAH ---
  const handleAddPoint = () => {
    setPoints([...points, { lat: '', lng: '' }]);
  };

  const handleRemovePoint = (indexToRemove) => {
    if (points.length <= 3) {
      alert("Sebuah wilayah (polygon) membutuhkan minimal 3 titik sudut.");
      return;
    }
    setPoints(points.filter((_, index) => index !== indexToRemove));
  };

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index][field] = value;
    setPoints(newPoints);
  };

  const handleSubmitWilayah = async (e) => {
    e.preventDefault();
    
    // Validasi data tidak boleh kosong
    const validPoints = points.filter(p => p.lat !== '' && p.lng !== '');
    if (validPoints.length < 3) {
      alert("Mohon lengkapi minimal 3 titik koordinat untuk membentuk suatu wilayah.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Format data untuk Backend (Array of Array: [[lat, lng], [lat, lng]])
      const formattedCoordinates = validPoints.map(p => [parseFloat(p.lat), parseFloat(p.lng)]);
      
      // AUTO-CLOSE LOOP: Menambahkan titik pertama ke akhir array agar polygon tertutup (Syarat wajib backend)
      formattedCoordinates.push([...formattedCoordinates[0]]);

      await adminService.createDistrict({
        nama: namaWilayah,
        coordinates: formattedCoordinates
      });

      alert("Wilayah baru berhasil ditambahkan!");
      
      // Reset Modal & Refresh Data
      setShowModal(false);
      setNamaWilayah('');
      setPoints([{ lat: '', lng: '' }, { lat: '', lng: '' }, { lat: '', lng: '' }]);
      fetchAllData();
      
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menambahkan wilayah. Pastikan nama wilayah belum ada sebelumnya.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDistricts = districts.filter(d => {
    const namaWil = d?.nama || d?.name || ""; 
    return namaWil.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col relative">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Wilayah & Area Jentik</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola batas kecamatan dan pantau sebaran laporan yang masuk.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
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
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sinkronkan Laporan
          </button>

          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#008AC9] text-white font-semibold rounded-xl text-sm hover:bg-[#0076ad] shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Tambah Wilayah
          </button>
        </div>
      </div>

      {/* KARTU RINGKASAN AMAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 border border-rose-200 bg-rose-50 rounded-2xl flex items-center justify-between shadow-sm">
           <div>
             <h3 className="text-rose-700 font-bold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4"/> Rawan Tinggi</h3>
             <p className="text-3xl font-black text-rose-800">
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2 text-rose-300" /> : (summary?.rawan || 0)}
               {!isLoading && <span className="text-sm font-bold text-rose-600 ml-1">Titik</span>}
             </p>
           </div>
        </div>
        <div className="p-5 border border-amber-200 bg-amber-50 rounded-2xl flex items-center justify-between shadow-sm">
           <div>
             <h3 className="text-amber-700 font-bold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4"/> Waspada</h3>
             <p className="text-3xl font-black text-amber-800">
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2 text-amber-300" /> : (summary?.waspada || 0)}
               {!isLoading && <span className="text-sm font-bold text-amber-600 ml-1">Titik</span>}
             </p>
           </div>
        </div>
        <div className="p-5 border border-emerald-200 bg-emerald-50 rounded-2xl flex items-center justify-between shadow-sm">
           <div>
             <h3 className="text-emerald-700 font-bold mb-1 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4"/> Aman</h3>
             <p className="text-3xl font-black text-emerald-800">
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-2 text-emerald-300" /> : (summary?.aman || 0)}
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
      
      {/* TABEL DATA WILAYAH AMAN */}
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
                  {searchQuery ? `Tidak ada wilayah yang cocok dengan pencarian "${searchQuery}"` : "Belum ada data wilayah."}
                </td>
              </tr>
            ) : (
              filteredDistricts.map((district) => {
                const aman = district?.aman || 0;
                const waspada = district?.waspada || 0;
                const rawan = district?.rawan || 0;
                const totalLaporan = aman + waspada + rawan;
                const namaWilayah = district?.nama || district?.name || "Wilayah Tanpa Nama";
                
                return (
                  <tr key={district?.id || Math.random()} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" /> {namaWilayah}
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full font-bold border border-rose-100">{rawan}</span>
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold border border-amber-100">{waspada}</span>
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold border border-emerald-100">{aman}</span>
                    </td>
                    <td className="p-4 text-sm text-center font-black text-slate-700">
                      {totalLaporan}
                    </td>
                    <td className="p-4 text-sm flex justify-end gap-2">
                      <button 
                        onClick={() => handleDelete(district?.id, namaWilayah)}
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

      {/* --- MODAL TAMBAH WILAYAH --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-[#008AC9] rounded-lg"><Map className="w-5 h-5"/></div>
                <h3 className="text-lg font-bold text-slate-800">Pemetaan Wilayah Baru</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitWilayah} className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Kecamatan / Wilayah</label>
                <input 
                  type="text" 
                  required
                  value={namaWilayah}
                  onChange={(e) => setNamaWilayah(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/20"
                  placeholder="Contoh: Kecamatan Cilacap Selatan"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-slate-700">Titik Koordinat (Polygon Batas)</label>
                  <button 
                    type="button" 
                    onClick={handleAddPoint}
                    className="text-xs font-bold text-[#008AC9] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Titik Sudut
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  Masukkan minimal 3 titik sudut koordinat yang mengelilingi wilayah tersebut. <b>Sistem akan otomatis menutup garis polygon Anda.</b>
                </p>

                <div className="space-y-3">
                  {points.map((point, idx) => (
                    <div key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2">
                      <div className="flex-1">
                        <input 
                          type="number" step="any" required placeholder="Latitude (Contoh: -7.712)"
                          value={point.lat} onChange={(e) => handlePointChange(idx, 'lat', e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#008AC9]"
                        />
                      </div>
                      <div className="flex-1">
                        <input 
                          type="number" step="any" required placeholder="Longitude (Contoh: 109.012)"
                          value={point.lng} onChange={(e) => handlePointChange(idx, 'lng', e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#008AC9]"
                        />
                      </div>
                      <button 
                        type="button" onClick={() => handleRemovePoint(idx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition-colors mt-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                type="button" onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-white transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit" onClick={handleSubmitWilayah} disabled={isSubmitting}
                className="flex-[2] py-2.5 bg-[#008AC9] text-white font-bold rounded-xl hover:bg-[#0076ad] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                Simpan & Petakan Wilayah
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default DataWilayah;