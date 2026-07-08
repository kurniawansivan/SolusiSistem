# CLAUDE.md

Panduan kerja untuk AI assistant (Claude Code atau lainnya) di repo ini.

## Ringkasan Proyek

Website company profile **Solusi Sistem** — penyedia jasa Web, Mobile App, AI, dan Automation.
Tujuan utama: konversi visitor jadi leads (isi form kontak / chat WhatsApp).

- Framework: **Nuxt 4** (Vue 3, TypeScript), struktur `app/` (srcDir Nuxt 4).
- Styling: **Tailwind CSS** (`tailwind.config.ts`, entry di `app/assets/css/main.css`).
- i18n: **@nuxtjs/i18n**, locale `id` (default, tanpa prefix) & `en` (prefix `/en`). File terjemahan di `i18n/locales/id.json` & `en.json`.
- Animasi: **GSAP + ScrollTrigger** (lihat `app/composables/useScrollReveal.ts`, directive `v-reveal`), **Lenis** smooth scroll (`app/plugins/lenis.client.ts`). Semua wajib respect `prefers-reduced-motion` (sudah di-handle global di `app/assets/css/main.css`).
- Icon: **@nuxt/icon** + `@iconify-json/lucide` (offline, tidak fetch ke CDN saat runtime). Pakai format `lucide:nama-icon`.
- Font: **@nuxt/fonts** (self-hosted Google Fonts, bukan link CDN langsung) — "Plus Jakarta Sans".
- Deploy target: **Netlify**, `nitro.preset: 'netlify'`, static generate (`npm run generate`).
- Form kontak: **Netlify Forms** (native, tanpa backend/API key) — lihat `app/pages/contact.vue`.

## Full Detail Dokumen Lain

- [`docs/HLD.md`](docs/HLD.md) — arsitektur, struktur folder, data flow, strategi render/SEO.
- [`docs/CODING_STANDARDS.md`](docs/CODING_STANDARDS.md) — aturan clean code, DRY, lint, "0 error" policy.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — cara deploy ke Netlify & isi environment variable.
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — cara edit copy, tambah service/testimoni, ganti asset.

## Perintah Penting

```bash
npm run dev             # dev server (localhost:3000)
npm run generate        # build statis untuk Netlify (folder .output/public)
npm run preview         # preview hasil build statis
npm run lint            # eslint, harus 0 error/warning
npm run lint:fix        # auto-fix lint
npm run format          # prettier --write
npm run typecheck       # vue-tsc, harus 0 type error
npm run generate:icons  # rebuild logo.svg -> apple-touch-icon.png, og-image.png, dst (jalankan ulang jika logo diubah)
```

**Sebelum menganggap task selesai**, jalankan `npm run lint` dan `npm run typecheck` — keduanya harus bersih (0 error/warning). Ini bukan opsional, ini standar proyek ini.

## Aturan Kerja di Repo Ini

1. **Ikuti struktur Nuxt 4**: semua kode aplikasi (components, pages, composables, plugins, data, assets) ada di `app/`. File config (`nuxt.config.ts`, `tailwind.config.ts`) tetap di root.
2. **Jangan hardcode teks UI** — semua copy user-facing lewat i18n (`t('key')`), ditambahkan ke KEDUA file `i18n/locales/id.json` dan `en.json` sekaligus. Jangan biarkan satu locale punya key yang tidak ada di locale lain.
3. **Jangan hardcode data kontak** (nomor WA, email, telepon, alamat, social link) — selalu ambil dari `useRuntimeConfig().public`, yang sumbernya dari `.env` (lihat `.env.example` untuk daftar lengkap variabel).
4. **Komponen ikonik**: pakai `<Icon name="lucide:xxx" />`, cari nama ikon di https://icon-sets.iconify.design/lucide/ sebelum membuat SVG custom baru.
5. **Data terstruktur** (list layanan, proses kerja, value perusahaan) taruh di `app/data/*.ts`, jangan hardcode array di dalam template komponen.
6. **Auto-import Nuxt**: jangan tulis `import { ref, computed, onMounted, useRoute, ... } from 'vue'/'nuxt/app'` — semua sudah auto-import. Import manual hanya untuk hal yang BUKAN auto-import (mis. `~/data/services`, library eksternal seperti `gsap`).
7. **Animasi baru** harus tetap menghormati reduced-motion. Jangan bikin animasi wajib jalan tanpa guard `prefers-reduced-motion` — polanya sudah ada di `useScrollReveal.ts` dan `main.css`, ikuti pola itu.
8. **Jangan fabrikasi social proof** — jangan menambahkan testimoni/nama klien palsu yang terlihat seperti klien asli. Kalau butuh trust element baru, gunakan pola commitment/guarantee (`app/data/commitments.ts`) yang faktual, bukan klaim yang tidak bisa diverifikasi.
9. **Prototype demo layanan** (`app/components/prototypes/*.vue`) sengaja front-end-only (tanpa API call sungguhan) — kalau mau dihubungkan ke backend/AI API asli, dokumentasikan di `docs/CONTENT_GUIDE.md`, jangan diam-diam menambahkan API key ke kode.
