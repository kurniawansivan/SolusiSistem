# Solusi Sistem — Company Profile Website

Website company profile untuk **Solusi Sistem** (jasa Web, Mobile App, AI, dan Automation), dibangun
dengan Nuxt 4 + Vue 3 + Tailwind CSS, siap deploy ke Netlify sebagai static site.

## Quickstart

```bash
npm install
cp .env.example .env   # isi dengan data kontak asli, atau pakai default placeholder untuk dev
npm run dev            # buka http://localhost:3000
```

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Dev server dengan hot reload |
| `npm run generate` | Build statis untuk deploy (output: `dist`) |
| `npm run preview` | Preview hasil `generate` secara lokal |
| `npm run lint` / `lint:fix` | ESLint check / auto-fix |
| `npm run format` | Format kode dengan Prettier |
| `npm run typecheck` | Type-check dengan vue-tsc |
| `npm run generate:icons` | Regenerasi favicon/OG image PNG dari `logo.svg` |

## Dokumentasi

- [`CLAUDE.md`](CLAUDE.md) — panduan kerja untuk AI assistant di repo ini
- [`docs/HLD.md`](docs/HLD.md) — arsitektur & desain teknis
- [`docs/CODING_STANDARDS.md`](docs/CODING_STANDARDS.md) — standar kode (clean code, DRY, 0 error)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — cara deploy ke Netlify
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — cara edit konten, tambah layanan/testimoni, ganti asset

## Stack

Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS · @nuxtjs/i18n · GSAP + Lenis · @nuxt/icon (Lucide) ·
@nuxt/fonts · Netlify Forms · Netlify (static hosting)
