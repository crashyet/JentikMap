import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle2, Droplets, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import heroImg from '../../assets/hero.png';

const features = [
  {
    name: "Peta Rawan",
    tagline: "Visualisasi Heatmap Real-time",
    description: "Pantau area rawan jentik di seluruh Cilacap dengan gradasi warna intuitif. Ketahui sebaran kasus dengan cepat dan akurat untuk tindakan preventif.",
    href: "/map",
    gif: "/gif/peta.gif",
    color: "blue",
    checkpoints: [
      "Gradasi warna hijau-kuning-merah",
      "Pembaruan data real-time",
      "Cakupan seluruh wilayah Cilacap",
    ],
    disabled: false
  },
  {
    name: "Lapor Cepat",
    tagline: "Satu Ketuk, Langsung Terkirim",
    description: "Menemukan jentik atau genangan air? Laporkan seketika tanpa perlu mengisi form panjang. Cukup buka kamera, potret, dan kirim.",
    href: "/report",
    gif: "/gif/lapor.gif",
    color: "cyan",
    checkpoints: [
      "Akses kamera instan",
      "Deteksi lokasi (GPS) otomatis",
      "Antarmuka tanpa form ribet",
    ],
    disabled: false
  },
  {
    name: "Smart Scanning",
    tagline: "Validasi AI Otomatis",
    description: "Kecerdasan Buatan (AI) otomatis memvalidasi setiap foto yang dilaporkan. Memastikan data selalu bersih, akurat, dan mencegah laporan palsu.",
    href: "/scan",
    gif: "/gif/smart.gif",
    color: "emerald",
    checkpoints: [
      "Deteksi jentik presisi tinggi",
      "Penyaringan laporan otomatis",
      "Proses validasi dalam hitungan detik",
    ],
    disabled: false
  },
  {
    name: "Radar Warga",
    tagline: "Peringatan Dini Area Sekitar",
    description: "Cek jarak temuan jentik terdekat dari rumahmu. Dapatkan peringatan dini jika ada bahaya atau temuan positif dalam radius 50 meter.",
    href: "/radar",
    gif: "/gif/radar.gif",
    color: "amber",
    checkpoints: [
      "Pemantauan radius 50 meter",
      "Notifikasi peringatan bahaya",
      "Sistem deteksi lingkungan mandiri",
    ],
    disabled: true
  },
];

const BackgroundGradient = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-50">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-300/20 blur-[120px] animate-pulse delay-1000" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>
);

const MosquitoMotifs = () => {
  const { scrollYProgress } = useScroll();
  const gifUrl = "https://media.baamboozle.com/uploads/images/455457/1652936031_108805_gif-url.gif";

  const yS1 = useTransform(scrollYProgress, [0, 1], ["-20vh", "150vh"]);
  const xS1 = useTransform(scrollYProgress, [0, 1], ["-20vw", "120vw"]);

  const yS2 = useTransform(scrollYProgress, [0, 1], ["120vh", "-50vh"]);
  const xS2 = useTransform(scrollYProgress, [0, 1], ["100vw", "-20vw"]);

  const yS3 = useTransform(scrollYProgress, [0, 1], ["20vh", "130vh"]);
  const xS3 = useTransform(scrollYProgress, [0, 1], ["-30vw", "130vw"]);

  const yS4 = useTransform(scrollYProgress, [0, 1], ["150vh", "10vh"]);
  const xS4 = useTransform(scrollYProgress, [0, 1], ["-10vw", "110vw"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.img src={gifUrl} style={{ x: xS1, y: yS1 }} className="absolute w-80 md:w-96 opacity-90 mix-blend-multiply rotate-[15deg]" alt="m1" />
      <motion.img src={gifUrl} style={{ x: xS1, y: yS1 }} className="absolute w-64 md:w-80 opacity-75 mix-blend-multiply rotate-[-5deg] translate-x-24 translate-y-20" alt="m2" />
      <motion.img src={gifUrl} style={{ x: xS1, y: yS1 }} className="absolute w-72 md:w-96 opacity-85 mix-blend-multiply rotate-[30deg] -translate-x-20 -translate-y-24" alt="m3" />
      <motion.img src={gifUrl} style={{ x: xS1, y: yS1 }} className="absolute w-56 md:w-72 opacity-65 mix-blend-multiply rotate-[10deg] translate-x-40 translate-y-8" alt="m4" />

      <motion.img src={gifUrl} style={{ x: xS2, y: yS2 }} className="absolute w-96 md:w-[28rem] opacity-90 mix-blend-multiply -scale-x-100 rotate-[12deg]" alt="m5" />
      <motion.img src={gifUrl} style={{ x: xS2, y: yS2 }} className="absolute w-80 md:w-96 opacity-80 mix-blend-multiply -scale-x-100 -rotate-[15deg] translate-x-32 translate-y-24" alt="m6" />
      <motion.img src={gifUrl} style={{ x: xS2, y: yS2 }} className="absolute w-72 md:w-80 opacity-85 mix-blend-multiply -scale-x-100 rotate-[35deg] -translate-x-24 translate-y-10" alt="m7" />
      <motion.img src={gifUrl} style={{ x: xS2, y: yS2 }} className="absolute w-64 md:w-72 opacity-70 mix-blend-multiply -scale-x-100 -rotate-[25deg] translate-x-16 -translate-y-32" alt="m8" />
      <motion.img src={gifUrl} style={{ x: xS2, y: yS2 }} className="absolute w-56 md:w-64 opacity-60 mix-blend-multiply -scale-x-100 rotate-0 -translate-x-32 -translate-y-12" alt="m9" />

      <motion.img src={gifUrl} style={{ x: xS3, y: yS3 }} className="absolute w-80 md:w-96 opacity-85 mix-blend-multiply rotate-[45deg]" alt="m10" />
      <motion.img src={gifUrl} style={{ x: xS3, y: yS3 }} className="absolute w-64 md:w-80 opacity-70 mix-blend-multiply rotate-[70deg] translate-x-32 -translate-y-20" alt="m11" />
      <motion.img src={gifUrl} style={{ x: xS3, y: yS3 }} className="absolute w-72 md:w-80 opacity-75 mix-blend-multiply rotate-[20deg] translate-x-16 translate-y-32" alt="m12" />
      <motion.img src={gifUrl} style={{ x: xS3, y: yS3 }} className="absolute w-56 md:w-72 opacity-65 mix-blend-multiply rotate-[-10deg] -translate-x-24 -translate-y-16" alt="m13" />

      <motion.img src={gifUrl} style={{ x: xS4, y: yS4 }} className="absolute w-96 md:w-[26rem] opacity-80 mix-blend-multiply -scale-x-100 rotate-[60deg]" alt="m14" />
      <motion.img src={gifUrl} style={{ x: xS4, y: yS4 }} className="absolute w-80 md:w-96 opacity-75 mix-blend-multiply -scale-x-100 rotate-[30deg] translate-x-28 translate-y-12" alt="m15" />
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToFeatures = () => {
    const element = document.getElementById("fitur-unggulan");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-[#008AC9]/20 overflow-x-hidden flex flex-col text-slate-900">
      <BackgroundGradient />
      <MosquitoMotifs />

      <Navbar />

      <section
        ref={targetRef}
        className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[90vh] flex items-center z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            style={{ opacity, y }}
            className="relative z-10 text-center md:text-left order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-blue-100 backdrop-blur-md shadow-sm mb-6 hover:scale-105 transition-transform duration-300"
            >
              <Shield className="w-4 h-4 text-[#008AC9] fill-blue-100" />
              <span className="text-sm font-semibold tracking-wide text-[#008AC9]">
                Pencegahan DBD Kolaboratif
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900"
            >
              Lindungi Keluarga <br className="hidden md:block" /> dari <br className="md:hidden"/>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-[#008AC9] via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Demam Berdarah
                </span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute w-full h-3 -bottom-2 left-0 text-blue-200"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              JentikMap adalah peta interaktif untuk memantau sebaran jentik nyamuk di Cilacap. Lapor cepat, cek radar rumahmu, dan cegah DBD bersama.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              <button
                onClick={() => navigate('/map')}
                className="w-full sm:w-auto h-14 px-8 text-lg rounded-full font-bold shadow-[0_8px_30px_rgb(0,138,201,0.3)] hover:shadow-[0_8px_30px_rgb(0,138,201,0.5)] hover:-translate-y-1 transition-all duration-300 bg-[#008AC9] hover:bg-[#0076ad] text-white flex items-center justify-center group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Buka Peta Jentik
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={scrollToFeatures}
                className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full border-2 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all duration-300 backdrop-blur-md"
              >
                Pelajari Fitur
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity, y }}
            className="relative z-10 order-1 md:order-2 flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#008AC9]/20 to-cyan-300/20 rounded-full blur-[60px] -z-10" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={heroImg}
                  alt="Ilustrasi Jentik Map"
                  className="w-80 h-80 md:w-[32rem] md:h-[32rem] object-contain drop-shadow-2xl relative z-10"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="fitur-unggulan"
        className="px-6 md:px-12 py-20 max-w-7xl mx-auto space-y-24 md:space-y-32 relative z-10"
      >
        <div className="text-center mb-16 bg-white/40 backdrop-blur-sm py-8 rounded-[3rem]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900"
          >
            Sistem Cerdas Pantau Lingkungan
          </motion.h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Dirancang untuk memudahkan warga, kader, dan pemerintah bersinergi mengendalikan persebaran nyamuk.
          </p>
        </div>

        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 space-y-6 text-center md:text-left relative bg-white/80 backdrop-blur-md p-8 rounded-[3rem] border border-white/80 shadow-xl shadow-blue-900/5">
              {feature.disabled && (
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Segera Hadir
                </div>
              )}
              
              <div className="flex justify-center md:justify-start">
                 <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${feature.color}-100 text-${feature.color}-700 font-bold text-sm tracking-wide shadow-sm`}>
                  {feature.name}
                </div>
              </div>

              <h3 className={cn("text-3xl md:text-4xl font-extrabold leading-tight", feature.disabled ? "text-slate-400" : "text-slate-900")}>
                {feature.tagline}
              </h3>

              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {feature.description}
              </p>

              <ul className="space-y-3 pt-2">
                {feature.checkpoints.map((point, i) => (
                  <li
                    key={i}
                    className={cn("flex items-center gap-3 justify-center md:justify-start", feature.disabled ? "opacity-60" : "opacity-100")}
                  >
                    <CheckCircle2 className={cn("w-5 h-5", feature.disabled ? "text-slate-400" : `text-${feature.color}-500`)} />
                    <span className="text-slate-700 font-bold">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <button
                  disabled={feature.disabled}
                  onClick={() => !feature.disabled && navigate(feature.href)}
                  className={cn(
                    "h-12 px-8 rounded-full font-bold transition-all duration-300 flex items-center justify-center mx-auto md:mx-0",
                    feature.disabled 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-[#008AC9] hover:bg-[#0076ad] text-white shadow-lg shadow-blue-500/30 hover:scale-105 hover:-translate-y-1"
                  )}
                >
                  {feature.disabled ? "Dalam Pengembangan" : `Coba ${feature.name}`}
                  {!feature.disabled && <ArrowRight className="ml-2 w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex-1 relative w-full flex justify-center">
              <motion.div
                whileHover={feature.disabled ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "relative z-10 w-full max-w-md aspect-square rounded-[2.5rem] bg-white p-4 shadow-2xl border border-white/80",
                  feature.disabled ? "grayscale opacity-70" : "shadow-blue-900/10"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-[2.5rem] -z-10"></div>
                <img
                  src={feature.gif}
                  alt={`Animasi ${feature.name}`}
                  className="w-full h-full object-cover rounded-3xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="py-24 px-4 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[#008AC9]/5 -z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#008AC9] via-[#0076ad] to-cyan-600 p-1 shadow-2xl shadow-blue-900/20"
        >
          <div className="rounded-[calc(3rem-4px)] bg-slate-900/10 backdrop-blur-xl h-full p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10 tracking-tight">
              Siap Cegah DBD di <br className="hidden md:block"/> Lingkunganmu?
            </h2>
            <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 font-medium">
              Bergabung dengan ribuan warga Cilacap yang sudah aktif memantau dan melaporkan jentik nyamuk.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 inline-block"
            >
              <button
                onClick={() => navigate('/auth')}
                className="h-16 px-10 text-xl font-bold rounded-full bg-white text-[#008AC9] hover:bg-slate-50 border-0 shadow-2xl flex items-center justify-center gap-3"
              >
                Mulai Sekarang
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>

            <Droplets className="absolute top-10 left-10 text-cyan-200 w-10 h-10 animate-pulse opacity-60 mix-blend-overlay" />
            <MapPin className="absolute bottom-10 right-10 text-blue-200 w-12 h-12 animate-bounce duration-[3000ms] opacity-60 mix-blend-overlay" />
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}