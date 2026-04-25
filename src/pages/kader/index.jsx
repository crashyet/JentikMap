import { motion } from 'framer-motion';
import { FileText, Bug, CheckCircle, Clock, Map } from 'lucide-react';

const KaderDashboard = () => {
  const stats = [
    { 
      id: 1, 
      label: 'Laporan Wilayah', 
      value: '124', 
      icon: <FileText size={24} className="text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    { 
      id: 2, 
      label: 'Jentik Ditemukan', 
      value: '42', 
      icon: <Bug size={24} className="text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    { 
      id: 3, 
      label: 'Sudah Divalidasi', 
      value: '89', 
      icon: <CheckCircle size={24} className="text-[#008AC9]" />,
      bg: 'bg-cyan-50',
      border: 'border-[#008AC9]/20'
    },
    { 
      id: 4, 
      label: 'Menunggu Validasi', 
      value: '15', 
      icon: <Clock size={24} className="text-amber-500" />,
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    },
  ];

  const recentReports = [
    { id: 'LAP-001', address: 'Jl. Merdeka No. 10', date: '25 Apr 2026', status: 'Menunggu', reporter: 'Budi Santoso' },
    { id: 'LAP-002', address: 'Jl. Mawar Gg. 2', date: '24 Apr 2026', status: 'Divalidasi (Positif)', reporter: 'Ani Yudhoyono' },
    { id: 'LAP-003', address: 'Perum Asri Blok B', date: '23 Apr 2026', status: 'Divalidasi (Negatif)', reporter: 'Cici Paramida' },
    { id: 'LAP-004', address: 'Jl. Kenanga 5', date: '22 Apr 2026', status: 'Menunggu', reporter: 'Deni Sumargo' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Selamat Datang, Siti!</h1>
          <p className="text-slate-500 mt-1">Berikut adalah ringkasan laporan di wilayah RW 03.</p>
        </div>
        <div className="hidden sm:block">
          <div className="bg-blue-100 text-[#008AC9] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 border border-blue-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#008AC9] animate-pulse"></span>
            Status Wilayah: Terkendali
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
            className={`p-6 rounded-2xl ${stat.bg} border ${stat.border} shadow-sm transition-all duration-300`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports List */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Laporan Terbaru Warga</h2>
            <button className="text-sm text-[#008AC9] font-semibold hover:text-[#0076ad] transition-colors">
              Lihat Semua
            </button>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-100">ID Laporan</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Pelapor</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Alamat</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Status</th>
                  <th className="p-4 font-semibold border-b border-slate-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4 text-sm font-medium text-slate-800 border-b border-slate-50">{report.id}</td>
                    <td className="p-4 text-sm text-slate-600 border-b border-slate-50">{report.reporter}</td>
                    <td className="p-4 text-sm text-slate-600 border-b border-slate-50">{report.address}</td>
                    <td className="p-4 text-sm border-b border-slate-50">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        report.status === 'Menunggu' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                        report.status.includes('Positif') ? 'bg-red-50 text-red-600 border-red-200' : 
                        'bg-cyan-50 text-[#008AC9] border-[#008AC9]/20'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-right border-b border-slate-50">
                      <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Action Panel / Mini Map Placeholder */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-[#008AC9] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Map size={100} />
            </div>
            <h2 className="text-lg font-bold text-white relative z-10">Peta Jentik Mini</h2>
            <p className="text-cyan-100 text-sm mt-1 relative z-10">Titik rawan di RW 03</p>
          </div>
          <div className="flex-1 bg-slate-100 min-h-[250px] relative p-4 flex items-center justify-center">
            {/* Visual Placeholder for a Map */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="text-center z-10">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-3">
                <Map size={28} className="text-[#008AC9]" />
              </div>
              <p className="text-slate-500 font-medium">Map Area Visualization</p>
              <button className="mt-4 px-4 py-2 bg-[#008AC9] text-white rounded-lg text-sm font-medium hover:bg-[#0076ad] transition-colors shadow-md">
                Buka Peta Penuh
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KaderDashboard;
