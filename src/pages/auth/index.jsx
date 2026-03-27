import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero.png';
import wargaIcon from '../../assets/warga.png';
import kaderIcon from '../../assets/kader.png';
import AuthService from '../../services/authService';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('warga');
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await AuthService.login({ 
          email: formData.email, 
          password: formData.password,
          role 
        });
        navigate('/dashboard');
      } else {
        await AuthService.register({ 
          ...formData, 
          role 
        });
        setIsLogin(true);
        alert('Registrasi berhasil! Silakan masuk.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      {/* Left Column - Hero Section */}
      <div className="hidden lg:flex flex-col flex-1 bg-[#008AC9] text-white p-12 relative items-center justify-center overflow-hidden">
        {/* Background Mascot (Faded) */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <img src={heroImg} alt="maskot background" className="w-[150%] max-w-none transform rotate-[-15deg]" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="bg-white p-4 rounded-3xl shadow-xl">
              <img src={heroImg} alt="Jentik Map Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">Jentik Map</h1>
          <p className="text-xl leading-relaxed mb-12 font-light">
            Platform pemantauan jentik nyamuk berbasis peta interaktif untuk pencegahan DBD di Cilacap.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center">
              <div className="text-xl font-bold">1.2K+</div>
              <div className="text-xs opacity-80 mt-1">Laporan</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center">
              <div className="text-xl font-bold">24</div>
              <div className="text-xs opacity-80 mt-1">Wilayah</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center">
              <div className="text-xl font-bold">98%</div>
              <div className="text-xs opacity-80 mt-1">Akurasi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/30 relative">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-[#008AC9] transition-colors font-medium text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </button>

        <div className="w-full max-w-md">
          {/* Role Selection */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setRole('warga')}
              className={`flex-1 flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                role === 'warga' 
                ? 'border-[#008AC9] bg-blue-50/50 ring-4 ring-blue-100/50' 
                : 'border-transparent bg-white shadow-sm hover:border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg bg-blue-100/50`}>
                <img src={wargaIcon} alt="Warga" className="w-10 h-10 object-contain" />
              </div>
              <span className={`font-semibold ${role === 'warga' ? 'text-[#008AC9]' : 'text-gray-500'}`}>Warga</span>
            </button>
            <button 
              onClick={() => setRole('kader')}
              className={`flex-1 flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                role === 'kader' 
                ? 'border-[#008AC9] bg-blue-50/50 ring-4 ring-blue-100/50' 
                : 'border-transparent bg-white shadow-sm hover:border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg bg-blue-100/50`}>
                <img src={kaderIcon} alt="Kader" className="w-10 h-10 object-contain" />
              </div>
              <span className={`font-semibold ${role === 'kader' ? 'text-[#008AC9]' : 'text-gray-500'}`}>Kader</span>
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-4xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">{isLogin ? 'Masuk' : 'Daftar'}</h2>

            {/* Toggle Tabs */}
            <div className="bg-gray-100 p-1.5 rounded-full flex mb-8">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1.5 rounded-full text-sm font-semibold transition-all ${isLogin ? 'bg-[#008AC9] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Masuk
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1.5 rounded-full text-sm font-semibold transition-all ${!isLogin ? 'bg-[#008AC9] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Daftar
              </button>
            </div>

            {error && <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    placeholder="Masukan Nama Lengkap"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#008AC9] focus:bg-white outline-none transition-all placeholder:text-gray-300 text-gray-700"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Masukan Email"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#008AC9] focus:bg-white outline-none transition-all placeholder:text-gray-300 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukan Password"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#008AC9] focus:bg-white outline-none transition-all placeholder:text-gray-300 text-gray-700"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#008AC9] hover:bg-[#0076ad] text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 mt-4 h-[56px] flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  isLogin ? 'Masuk' : 'Daftar'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
