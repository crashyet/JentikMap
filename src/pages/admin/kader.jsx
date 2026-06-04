import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService'; // Sesuaikan path jika berbeda
import { Loader2, UserPlus, Trash2, Edit } from 'lucide-react';

const ManajemenKader = () => {
  const [kaders, setKaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data kader saat komponen dimuat
  useEffect(() => {
    fetchDataKader();
  }, []);

  const fetchDataKader = async () => {
    try {
      setIsLoading(true);
      setError('');
      // Memanggil fungsi dari service
      const data = await adminService.getKaders();
      setKaders(data);
    } catch (err) {
      setError('Gagal memuat data kader. Periksa koneksi Anda.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus akses kader ${nama}?`);
    if (!confirmDelete) return;

    try {
      // Panggil API untuk hapus
      await adminService.deleteKader(id);
      
      // Update UI (Hapus dari list)
      setKaders(kaders.filter(kader => kader.id !== id));
      alert(`Kader ${nama} berhasil dihapus.`);
    } catch (err) {
      alert("Gagal menghapus kader.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Kader</h2>
          <p className="text-slate-500 text-sm">Kelola akses dan data kader kesehatan di tiap wilayah.</p>
        </div>
        <button 
          onClick={() => alert("Fitur Tambah Kader via Register Endpoint (Segera Hadir)")}
          className="px-4 py-2.5 bg-[#008AC9] text-white font-semibold rounded-lg text-sm hover:bg-[#0076ad] shadow-sm flex items-center gap-2 transition-colors active:scale-95"
        >
          <UserPlus className="w-4 h-4" /> Tambah Kader
        </button>
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
              <th className="p-4 font-bold text-sm text-slate-600">Nama Kader</th>
              <th className="p-4 font-bold text-sm text-slate-600">Wilayah Tugas</th>
              <th className="p-4 font-bold text-sm text-slate-600">Laporan Divalidasi</th>
              <th className="p-4 font-bold text-sm text-slate-600">Status</th>
              <th className="p-4 font-bold text-sm text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center">
                  <Loader2 className="w-8 h-8 text-[#008AC9] animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500">Memuat data kader...</p>
                </td>
              </tr>
            ) : kaders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500 text-sm font-medium">
                  Belum ada kader yang terdaftar di sistem.
                </td>
              </tr>
            ) : (
              kaders.map((kader) => (
                <tr key={kader.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-sm font-bold text-slate-800">{kader.nama}</td>
                  <td className="p-4 text-sm font-medium text-slate-600">{kader.wilayah}</td>
                  <td className="p-4 text-sm font-medium text-slate-600">{kader.total_validasi} Laporan</td>
                  <td className="p-4 text-sm">
                    {kader.is_active ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-extrabold border border-emerald-200">
                        Aktif
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-extrabold border border-slate-200">
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm flex justify-end gap-2">
                    <button className="p-2 text-[#008AC9] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(kader.id, kader.nama)}
                      className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors" 
                      title="Hapus"
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

export default ManajemenKader;