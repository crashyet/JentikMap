import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Loader2, UserPlus, Trash2, Edit, X, Mail } from 'lucide-react';

const ManajemenKader = () => {
  const [kaders, setKaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // State untuk Modal Tambah Kader
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchDataKader();
  }, []);

  const fetchDataKader = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await adminService.getKaders();
      setKaders(data);
    } catch (err) {
      setError('Gagal memuat data kader. Periksa koneksi Anda.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // FUNGSI HAPUS KADER
  const handleDelete = async (id, nama) => {
    const confirmDelete = window.confirm(`PERINGATAN: Apakah Anda yakin ingin menghapus akun kader ${nama}?`);
    if (!confirmDelete) return;

    try {
      await adminService.deleteKader(id);
      // Hapus dari tampilan tabel tanpa perlu refresh halaman
      setKaders(kaders.filter(kader => kader.id !== id));
      alert(`Kader ${nama} berhasil dihapus dari sistem.`);
    } catch (err) {
      alert("Gagal menghapus kader. Anda tidak memiliki akses atau terjadi kesalahan server.");
    }
  };

  // FUNGSI TAMBAH KADER
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Panggil API
      await adminService.createKader({
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        role: 'kader'
      });
      
      alert('Kader berhasil ditambahkan!');
      setShowModal(false); // Tutup modal
      setFormData({ nama: '', email: '', password: '' }); // Reset form
      fetchDataKader(); // Refresh tabel untuk memunculkan data baru
      
    } catch (err) {
      alert("Gagal menambahkan kader. Pastikan email belum terdaftar.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // FUNGSI EDIT KADER (Informasi)
  const handleEdit = () => {
    alert("API Edit Profil belum tersedia di backend. Saat ini Anda hanya bisa Menghapus atau Menambah Kader.");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col relative">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Kader</h2>
          <p className="text-slate-500 text-sm">Kelola akses dan data kader kesehatan di tiap wilayah.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
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
      
      {/* TABEL DATA KADER */}
      <div className="overflow-x-auto flex-1 border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-sm text-slate-600">Nama Kader</th>
              <th className="p-4 font-bold text-sm text-slate-600">Email</th>
              <th className="p-4 font-bold text-sm text-slate-600">Terdaftar Sejak</th>
              <th className="p-4 font-bold text-sm text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-10 text-center">
                  <Loader2 className="w-8 h-8 text-[#008AC9] animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500">Memuat data kader dari server...</p>
                </td>
              </tr>
            ) : kaders.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-500 text-sm font-medium">
                  Belum ada kader yang terdaftar di sistem.
                </td>
              </tr>
            ) : (
              kaders.map((kader) => (
                <tr key={kader.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-sm font-bold text-slate-800">{kader.nama}</td>
                  <td className="p-4 text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> {kader.email}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-500">
                    {new Date(kader.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="p-4 text-sm flex justify-end gap-2">
                    <button 
                      onClick={handleEdit}
                      className="p-2 text-[#008AC9] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" 
                      title="Edit"
                    >
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

      {/* MODAL TAMBAH KADER */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Pendaftaran Kader Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/20"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/20"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#008AC9] focus:ring-2 focus:ring-[#008AC9]/20"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-[#008AC9] text-white font-bold rounded-xl hover:bg-[#0076ad] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  Simpan Kader
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ManajemenKader;