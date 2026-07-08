# Content Guide — Cara Edit Konten Tanpa Ngoprek Komponen

Panduan ini untuk siapa saja yang mau update teks, data, atau asset website tanpa perlu paham detail
komponen Vue.

## 1. Edit Teks (Copy)

Semua teks yang tampil di website ada di 2 file:

- `i18n/locales/id.json` — versi Bahasa Indonesia (default)
- `i18n/locales/en.json` — versi English

Struktur kedua file ini **sama persis** (nested JSON). Cari key yang mau diubah (mis. `hero.title Start`
untuk judul besar di halaman utama), edit isinya, simpan. **Selalu ubah di kedua file** kalau memang mau
mengubah makna kontennya (kalau cuma memperbaiki typo di satu bahasa, ubah file itu saja).

## 2. Tambah / Ubah Layanan

Layanan (Web, Mobile, AI, Automation) didefinisikan di 2 tempat:

1. `app/data/services.ts` — daftar `id` layanan + nama icon (format `lucide:nama-icon`, cari di
   https://icon-sets.iconify.design/lucide/).
2. `i18n/locales/id.json` & `en.json`, di bawah `services.<id>.*` — berisi `title`, `desc`,
   `feature1`/`feature2`/`feature3`.

Untuk **menambah layanan ke-5**, tambahkan objek baru di `services.ts`, lalu buat key baru di kedua file
i18n dengan struktur yang sama, dan tambahkan komponen prototype baru di
`app/components/prototypes/`, lalu daftarkan di `ServicesSection.vue` (baris `v-if`/`v-else-if`).

## 3. Tambah Testimoni Klien Asli

Website ini **sengaja tidak** menampilkan testimoni fiktif (lihat `docs/HLD.md` bagian 10). Begitu ada
klien nyata yang bersedia memberi testimoni:

1. Buat `app/data/testimonials.ts`:
   ```ts
   export interface Testimonial {
     name: string
     role: string   // jabatan + nama perusahaan
     quote: string  // simpan quote langsung di sini (bukan i18n) karena ini kutipan asli, bukan copy marketing
     avatarUrl?: string
   }

   export const testimonials: Testimonial[] = [
     { name: 'Nama Klien', role: 'Owner, Nama Bisnis', quote: 'Testimoni asli di sini...' },
   ]
   ```
2. Buat komponen `app/components/sections/TestimonialsSection.vue` yang me-render array ini (bisa
   dicontoh dari struktur `TrustSection.vue`).
3. Tambahkan `<SectionsTestimonialsSection />` di `app/pages/index.vue`, taruh setelah
   `<SectionsTrustSection />`.

## 4. Ganti Logo / Warna Brand

- Logo vektor sumber: `app/components/Logo.vue` (dipakai di header/footer) dan `public/logo.svg`
  (dipakai untuk favicon & sosial share). Kalau desain logo berubah, edit **kedua** file ini supaya
  konsisten.
- Setelah mengubah `public/logo.svg` atau `public/og-image.svg`, jalankan ulang:
  ```bash
  npm run generate:icons
  ```
  Ini akan meregenerasi `apple-touch-icon.png`, `favicon-32x32.png`, `icon-512.png`, dan `og-image.png`.
- Warna brand (gradient indigo → cyan) didefinisikan sebagai token di `tailwind.config.ts`
  (`theme.extend.colors.brand`) — ubah di situ agar konsisten ke seluruh halaman, jangan hardcode hex
  warna baru di komponen.

## 5. Foto & Video Asli (Upgrade dari Versi SVG/CSS)

Semua visual saat ini (logo, ilustrasi, mockup dashboard/mobile) adalah SVG/CSS buatan, bukan foto/video
sungguhan — karena tidak ada sumber foto asli tim/kantor yang legal dipakai. Kalau nanti punya foto
kantor, tim, atau video profil perusahaan:

1. Taruh file di `public/images/` atau `public/videos/` (buat folder ini kalau belum ada).
2. Untuk foto, pakai komponen `<NuxtImg>` (perlu install `@nuxt/image` dulu: `npm install @nuxt/image`,
   tambahkan `'@nuxt/image'` ke `modules` di `nuxt.config.ts`) supaya otomatis di-resize & lazy-load.
3. Untuk video hero (mis. mengganti komposisi dekoratif di `HeroSection.vue`), tambahkan tag `<video>`
   dengan `autoplay muted loop playsinline` + fallback poster image, dan tetap sediakan versi statis untuk
   pengguna dengan `prefers-reduced-motion: reduce` (video jangan autoplay untuk mereka).

## 6. Hubungkan Prototype AI ke API Sungguhan

`app/components/prototypes/AiPrototype.vue` saat ini pakai jawaban simulasi lokal (tanpa API call), agar
demo tetap bisa jalan tanpa biaya API. Untuk menyambungkan ke AI API asli (mis. Claude API):

1. Jangan taruh API key di `runtimeConfig.public` — itu akan terlihat oleh siapapun yang buka website.
2. Tambahkan API key ke `runtimeConfig` (bagian non-public) di `nuxt.config.ts`, isi dari `.env` dengan
   nama variabel TANPA prefix `NUXT_PUBLIC_` (mis. `AI_API_KEY`).
3. Buat server route baru, mis. `server/api/chat.post.ts`, yang memanggil API AI dari sisi server
   (server route bisa akses `runtimeConfig` non-public dengan aman).
4. Ubah `AiPrototype.vue` supaya memanggil `$fetch('/api/chat', { method: 'POST', body: {...} })`,
   bukan fungsi lokal `keywordReplyKey`.

## 7. Data Kontak (WhatsApp, Email, Alamat, Social)

Semua ada di `.env` (lihat `.env.example` untuk daftar lengkap dan formatnya). Update nilainya di
Netlify dashboard (Site settings → Environment variables) untuk production, dan di file `.env` lokal
untuk development — lalu redeploy.
