import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ChevronLeft, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import heroImg from '../../assets/hero.png';
import AuthService from '../../services/authService';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // STATE BARU: Untuk mengatur visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/map';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isLogin) {
        // --- PROSES LOGIN ---
        const response = await AuthService.login({
          email: formData.email,
          password: formData.password,
        });

        const role = response.role || localStorage.getItem('user_role') || 'user';
        let redirectPath = from;

        if (!redirectPath || redirectPath === '/auth' || redirectPath === '/') {
          redirectPath = role === 'admin' ? '/admin' : role === 'kader' ? '/dashboard' : '/map';
        }

        navigate(redirectPath, { replace: true });

      } else {
        // --- PROSES REGISTER ---
        await AuthService.register({
          namaLengkap: formData.namaLengkap,
          email: formData.email,
          password: formData.password,
        });

        setSuccessMsg('Registrasi berhasil! Silakan masuk menggunakan akun Anda.');
        setIsLogin(true); 
        setFormData((prev) => ({ ...prev, password: '' })); 
      }
    } catch (err) {
      // AMBIL TEKS ERROR MENTAH
      const rawError = err?.response?.data?.error || err?.message || String(err);
      const lowerError = rawError.toLowerCase();

      // TRANSLATE PESAN ERROR MENTAH MENJADI RAMAH PENGGUNA
      if (lowerError.includes('duplicate key') || lowerError.includes('unique constraint') || lowerError.includes('sudah terdaftar')) {
        setError('Email ini sudah terdaftar. Silakan gunakan email lain atau langsung Masuk.');
      } else if (lowerError.includes('email atau password salah')) {
        setError('Email atau password yang Anda masukkan salah.');
      } else if (lowerError.includes('network') || lowerError.includes('failed to fetch')) {
        setError('Gagal terhubung ke server. Periksa koneksi internet Anda.');
      } else {
        // Jika error terlalu panjang (seperti query SQL), ringkas pesannya
        setError(rawError.length > 100 ? 'Terjadi kesalahan pada sistem. Silakan coba lagi.' : rawError);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-[#008AC9]/20">
      
      {/* Kolom Kiri (Hanya Muncul di Layar Besar) */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-[#008AC9] via-[#0076ad] to-cyan-600 text-white p-12 relative overflow-hidden items-center justify-center">
        
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none transform scale-110">
          <img src={heroImg} alt="maskot background" className="w-full max-w-none transform rotate-[-15deg]" />
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/20">
              <img src={heroImg} alt="Jentik Map Logo" className="w-20 h-20 object-contain shadow-lg" />
            </div>
          </div>
          
          <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Jentik<span className="text-cyan-200">Map</span> Cilacap
          </h1>
          
          <p className="text-xl leading-relaxed font-light text-blue-50 opacity-90 mb-12">
            Platform kolaboratif warga dan petugas untuk memantau serta mencegah penyebaran jentik nyamuk DBD secara real-time.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Laporan", value: "1.2K+" },
              { label: "Wilayah", value: "24" },
              { label: "Validasi AI", value: "98%" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center hover:bg-white/20 transition-colors">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs opacity-80 mt-1 text-blue-50 font-medium tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kolom Kanan (Form) */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 relative bg-white overflow-y-auto">
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center justify-center w-12 h-12 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100 hover:text-[#008AC9] transition-all shadow-sm border border-slate-100 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="w-full max-w-md mx-auto py-12">
          
          <div className="text-center mb-10">
            <div className="lg:hidden inline-flex items-center justify-center w-16 h-16 bg-white shadow-xl rounded-2xl mb-6 border border-slate-100 p-2">
              <img src={heroImg} alt="logo mobile" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {isLogin ? 'Selamat Datang Kembali' : 'Bergabung Sekarang'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isLogin ? 'Masuk untuk memantau lingkungan Anda.' : 'Daftar untuk mulai melapor jentik.'}
            </p>
          </div>

          <div className="bg-slate-100 p-1.5 rounded-2xl flex mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isLogin ? 'bg-white text-[#008AC9] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Masuk
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${!isLogin ? 'bg-white text-[#008AC9] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Daftar
            </button>
          </div>

          {/* Pesan Error (Merah) */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-2xl text-center font-bold flex flex-col items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 shrink-0" /> 
                <span className="text-left">{error}</span>
              </div>
            </div>
          )}

          {/* Pesan Sukses (Hijau) */}
          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm rounded-2xl text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" /> 
              <span className="text-left">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Nama Lengkap (Hanya saat Daftar) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#008AC9] transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    placeholder="Masukan nama lengkap Anda"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#008AC9] focus:ring-4 focus:ring-[#008AC9]/10 focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#008AC9] transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Contoh: budi@email.com"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#008AC9] focus:ring-4 focus:ring-[#008AC9]/10 focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Input Password (Dengan Show/Hide) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Password</label>
                {isLogin && <a href="#" className="text-xs font-bold text-[#008AC9] hover:underline">Lupa Password?</a>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#008AC9] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Logic pergantian tipe text/password
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukan password Anda"
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#008AC9] focus:ring-4 focus:ring-[#008AC9]/10 focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400"
                  required
                />
                
                {/* TOMBOL MATA (SHOW/HIDE) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#008AC9] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-[#008AC9] to-cyan-500 hover:from-[#0076ad] hover:to-cyan-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:-translate-y-0.5 transition-all active:scale-[0.98] active:translate-y-0 disabled:opacity-70 mt-8 flex items-center justify-center gap-2 h-14"
            >
              {loading ? (
                <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Masuk ke Sistem' : 'Daftar Sekarang'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;