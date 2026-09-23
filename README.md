# Portofolio Muhammad Wildan Handika

Website portofolio statis (HTML, CSS, dan JS biasa, tanpa build). Dibuat dari template [portfolio-template](https://github.com/kayspace/portfolio-template) (lisensi MIT, lihat `LICENSE`).

## Struktur

```
portofolio-wildan/
├── index.html          halaman utama (semua teks diedit di sini)
├── 404.html            halaman jika alamat tidak ditemukan
├── css/style.css       tampilan, warna, dan animasi
├── js/script.js        animasi (ketik, scroll, gelombang sinyal)
├── assets/
│   ├── cv/CV_WILDAN.pdf
│   ├── img/            foto-profil.jpg, proyek-1..3.svg, og-image.png
│   └── favicon.svg
├── robots.txt
├── LICENSE
└── README.md
```

## Cara mengisi

1. Buka `index.html`, tekan Ctrl+F lalu cari `[` untuk menemukan semua teks placeholder. Yang perlu diisi: SMK (bagian pendidikan), 2 kartu magang, 3 proyek, dan link sosial media di bagian kontak.
2. Foto profil: ganti `assets/img/foto-profil.jpg`. Gambar proyek: simpan foto atau screenshot di `assets/img/`, lalu ubah `src` di `index.html` (misalnya `proyek-1.svg` menjadi `alat-saya.jpg`).
3. CV: timpa `assets/cv/CV_WILDAN.pdf` dengan file baru bernama sama.
4. Warna dan font: ubah blok `:root` di bagian atas `css/style.css`.

## Lihat di komputer

Buka `index.html` langsung di browser, atau jalankan `python3 -m http.server` di folder ini lalu buka http://localhost:8000.

## Deploy

- Vercel atau Netlify: drag and drop folder ini.
- GitHub Pages: push ke repo, lalu aktifkan Pages di Settings.

Setelah punya alamat website, ubah `og:image` di `index.html` menjadi URL penuh agar pratinjau link tampil di WhatsApp dan media sosial. `404.html` memakai path `/css/style.css`, jadi cocok untuk domain utama (bukan subfolder GitHub Pages).
