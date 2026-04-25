# Walkthrough: Kader and Admin Dashboards

Dashboard untuk peran **Kader** dan **Admin** telah berhasil dibuat dan diintegrasikan ke dalam sistem routing `JentikMap`. Berikut adalah ringkasan perubahan dan tambahan yang dilakukan:

## Perubahan yang Dilakukan

### 1. Dashboard Kader (`/kader`)
- **[NEW] `src/pages/kader/layout.jsx`**: Layout utama dengan Sidebar yang bisa disembunyikan di tampilan mobile (responsif). Memiliki navigasi ke fitur "Dashboard", "Validasi Laporan", "Peta Area", dan "Pengaturan". Sidebar diberi warna *emerald/hijau* untuk memberikan kesan petugas kesehatan lingkungan/warga.
- **[NEW] `src/pages/kader/index.jsx`**: Halaman ikhtisar/beranda Kader yang menampilkan:
  - Kartu statistik ("Laporan Wilayah", "Jentik Ditemukan", "Menunggu Validasi").
  - Tabel "Laporan Terbaru Warga" dengan label status yang jelas.
  - Widget "Peta Jentik Mini" untuk akses cepat visualisasi lokasi jentik.

### 2. Dashboard Admin (`/admin`)
- **[NEW] `src/pages/admin/layout.jsx`**: Layout utama dengan Sidebar untuk akses Super Admin (Manajemen Kader, Warga, Wilayah, Statistik Global). Tampilan dibuat berbeda menggunakan skema warna *slate/indigo* yang lebih gelap dan elegan untuk membedakannya dari halaman Kader dan Publik.
- **[NEW] `src/pages/admin/index.jsx`**: Halaman beranda sistem Admin yang menampilkan:
  - Kartu Metrik dengan tren persentase peningkatan/penurunan ("Total Warga Terdaftar", "Kader Aktif", dsb).
  - Placeholder Peta Distribusi Global.
  - "Activity Feed" atau rekam jejak sistem secara *real-time* dengan ikon berdasarkan tipe aktivitas (alert, user, validation).

### 3. Pembaruan Routing (`src/App.jsx`)
- **[MODIFY] `src/App.jsx`**: Menambahkan *Nested Routing* untuk masing-masing panel:
  - Rute `/kader/*` dibungkus dengan `ProtectedRoute` (akses: kader, admin).
  - Rute `/admin/*` dibungkus dengan `ProtectedRoute` (akses: admin).
  - Masing-masing menu yang belum aktif diarahkan ke tampilan placeholder `(Coming Soon)`.

## Hasil Validasi

- Animasi transisi menggunakan `framer-motion` (efek *hover*, sidebar interaktif, *staggered entrance* di elemen dashboard).
- Responsivitas layout untuk perangkat *mobile* berkat struktur fleksibel dari Tailwind CSS.
- Ikon menggunakan `lucide-react` dan siap beroperasi dengan mulus.

> [!TIP]
> **Cara Mengakses**:
> 1. Pastikan server Vite Anda sedang berjalan (saat ini sudah berjalan melalui perintah `npm run dev`).
> 2. Kunjungi `http://localhost:5173/kader` untuk melihat Dashboard Kader.
> 3. Kunjungi `http://localhost:5173/admin` untuk melihat Dashboard Admin.
> *(Catatan: Karena sistem `ProtectedRoute` aktif, Anda mungkin perlu melakukan mock token/role di `localStorage` jika diarahkan kembali ke `/map` atau `/auth`. Jika tidak bisa diakses, hapus pembungkus `ProtectedRoute` sementara di `App.jsx` saat sedang mendevelop tampilan.)*
