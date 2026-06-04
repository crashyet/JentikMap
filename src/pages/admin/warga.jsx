import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Loader2, Search, Trash2, Mail } from 'lucide-react';

const ManajemenWarga = () => {
  const [wargas, setWargas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data warga saat komponen dimuat
  useEffect(() => {
    fetchDataWarga();
  }, []);

  const fetchDataWarga = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await adminService.getWargas();
      setWargas(data);
    } catch (err) {
      setError('Gagal memuat data warga. Periksa koneksi Anda.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id, nama) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus akun warga ${nama}?`);
    if (confirmDelete) {
      // Simulasi hapus
      setWargas(wargas.filter(warga => warga.id !== id));
      alert(`Akun warga ${nama} berhasil dihapus.`);
    }
  };

  // Filter data berdasarkan inputan pencarian
  const filteredWargas = wargas.filter(warga => 
    warga.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
    warga.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Daftar Warga Terdaftar</h2>
          <p className="text-slate-500 text-sm mt-1">Semua akun warga yang dapat melaporkan jentik nyamuk.</p>
        </div>
        
        {/* Kolom Pencarian */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/10 transition-all text-slate-700"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm font-bold rounded-lg border border-rose-100">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto flex-1 border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-sm text-slate-600">Nama Lengkap</th>
              <th className="p-4 font-bold text-sm text-slate-600">Email</th>
              <th className="p-4 font-bold text-sm text-slate-600">Tanggal Daftar</th>
              <th className="p-4 font-bold text-sm text-slate-600 text-center">Total Laporan</th>
              <th className="p-4 font-bold text-sm text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center">
                  <Loader2 className="w-8 h-8 text-[#008AC9] animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500">Memuat data warga...</p>
                </td>
              </tr>
            ) : filteredWargas.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500 text-sm font-medium">
                  {searchQuery ? `Tidak ada warga dengan nama/email "${searchQuery}"` : "Belum ada warga yang terdaftar di sistem."}
                </td>
              </tr>
            ) : (
              filteredWargas.map((warga) => (
                <tr key={warga.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-sm font-bold text-slate-800">{warga.nama}</td>
                  <td className="p-4 text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> {warga.email}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-500">{warga.tanggal_daftar}</td>
                  <td className="p-4 text-sm text-center">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                      {warga.total_laporan}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <button 
                      onClick={() => handleDelete(warga.id, warga.nama)}
                      className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors" 
                      title="Hapus Akun Warga"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenWarga;