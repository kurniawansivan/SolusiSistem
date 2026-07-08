# High-Level Design — Website Solusi Sistem

## 1. Tujuan & Ruang Lingkup

Website company profile untuk memasarkan 4 layanan (Web, Mobile App, AI, Automation) dan mengonversi
pengunjung menjadi leads (form kontak / chat WhatsApp). Bukan aplikasi transaksional — tidak ada
login, database, atau backend custom di fase ini.

## 2. Arsitektur

```
┌─────────────────────────────┐
│         Browser              │
│  (Vue 3 SPA, hydrated)       │
└──────────────┬───────────────┘
               │ HTTPS
┌──────────────▼───────────────┐
│   Netlify CDN (static host)   │
│  - HTML pre-rendered per rute │
│  - Netlify Forms (contact)    │
│  - robots.txt & sitemap.xml   │
│    di-generate saat build     │
└──────────────┬───────────────┘
               │ build time
┌──────────────▼───────────────┐
│   Nuxt 4 (Nitro, preset       │
│   "netlify") — nuxi generate  │
│  - Prerender semua rute       │
│  - i18n: rute id (default)    │
│    + en (prefix /en)          │
└────────────────────────────────┘
```

Tidak ada server runtime custom yang perlu dijaga — output dari `npm run generate` adalah folder statis
(`dist`) yang di-deploy langsung ke Netlify CDN. Satu-satunya bagian "dinamis" di production
adalah submission form kontak, yang ditangani oleh fitur Netlify Forms (bukan server milik kita).

## 3. Kenapa Nuxt (Vue) + Static Generation

- User sudah menentukan akan pakai Netlify — Nuxt static generate (SSG) + Netlify adalah kombinasi yang
  sangat matang (ada preset resmi `nitro.preset: 'netlify'`).
- SSG dipilih (bukan SPA murni) supaya **setiap halaman punya meta tag & konten ter-render sendiri**
  saat crawl oleh Google — penting untuk company profile yang mengandalkan pencarian organik
  ("jasa pembuatan web", "jasa aplikasi mobile", dst).
- Tidak butuh SSR runtime (server Node yang harus terus hidup) karena kontennya tidak personalized/real-time.

## 4. Struktur Folder

```
app/                        # srcDir Nuxt 4
  components/
    Logo.vue                 # <Logo />
    layout/                  # <LayoutAppHeader />, <LayoutAppFooter />, <LayoutLanguageSwitch />
    ui/                      # pathPrefix:false -> <ButtonCta />, <GradientBlob />
    sections/                # <SectionsHeroSection />, <SectionsServicesSection />, dst
    prototypes/              # <PrototypesWebPrototype />, <PrototypesMobilePrototype />, dst
  composables/
    useReducedMotion.ts
    useScrollReveal.ts        # export `vReveal` directive (v-reveal)
  data/                      # sumber konten terstruktur (bukan teks — teks ada di i18n)
    services.ts  process.ts  why-us.ts  commitments.ts  nav.ts
  pages/
    index.vue                 # / — semua section utama (scrollytelling)
    about.vue                 # /tentang (id) | /about (en)
    contact.vue                # /kontak (id) | /contact (en)
  plugins/
    lenis.client.ts           # smooth scroll, client-only
  assets/css/main.css         # Tailwind entry + base layer + reduced-motion override
  app.vue                     # root layout: header + <NuxtPage/> + footer + JSON-LD Organization
  error.vue                   # halaman error/404 custom (di luar layout header/footer)
i18n/locales/{id,en}.json     # semua teks user-facing
server/routes/robots.txt.ts   # robots.txt dinamis (baca NUXT_PUBLIC_SITE_URL)
public/                       # asset statis: logo.svg, favicon, og-image, dll
scripts/generate-icons.mjs    # generator PNG dari logo.svg/og-image.svg (pakai `sharp`)
docs/                         # dokumen ini
```

## 5. Data Flow

- **Konten terstruktur** (daftar layanan, tahapan proses, value perusahaan, commitment badges) hidup di
  `app/data/*.ts` sebagai array of objects berisi `key` + `icon`. Komponen section melakukan `v-for`
  atas data ini.
- **Teks aktual** (judul, deskripsi, label tombol) TIDAK ada di file data — semuanya di
  `i18n/locales/id.json` / `en.json`, direferensikan lewat `key` yang sama dari file data. Ini memisahkan
  "struktur konten" dari "isi bahasa", supaya menambah bahasa baru tidak perlu menyentuh komponen.
- **Kontak & credential** (nomor WA, email, dsb) hidup di `.env` → `runtimeConfig.public` → dipakai lewat
  `useRuntimeConfig().public` di komponen manapun yang butuh (footer, contact page, CTA banner).

## 6. Internationalization (i18n)

- Modul: `@nuxtjs/i18n`, strategy `prefix_except_default`.
- Locale default `id` tanpa prefix (`/`, `/tentang`, `/kontak`), locale `en` pakai prefix (`/en`,
  `/en/about`, `/en/contact`).
- Rute `about`/`contact` punya path berbeda per bahasa lewat opsi `i18n.pages` di `nuxt.config.ts` — karena
  itu, link internal ke halaman ini WAJIB pakai `localePath('about')` / `localePath('contact')` (nama rute),
  **bukan** `localePath('/tentang')` — supaya path yang di-generate selalu benar sesuai locale aktif.

## 7. Animasi & Motion

- **GSAP + ScrollTrigger**: dipakai lewat custom directive `v-reveal` (di `useScrollReveal.ts`). Elemen yang
  butuh scroll-reveal cukup diberi class `.reveal` (opacity:0 di CSS) + attribute `v-reveal`.
- **Lenis**: smooth scroll global, di-inject lewat plugin client-only, di-sync ke `ScrollTrigger.update`
  supaya scroll-triggered animation tetap akurat.
- **Reduced motion**: dihormati di 2 level — (1) directive `v-reveal` langsung set opacity:1 tanpa animasi
  kalau `prefers-reduced-motion: reduce`, (2) override CSS global di `main.css` yang memaksa semua
  `animation-duration`/`transition-duration` jadi nyaris nol untuk kelas Tailwind `animate-*`.

## 8. SEO

- `useSeoMeta()` per halaman (title, description, OG, Twitter card).
- `@nuxtjs/sitemap` — auto generate `sitemap.xml` termasuk varian locale.
- `server/routes/robots.txt.ts` — robots.txt dinamis, mereferensikan `NUXT_PUBLIC_SITE_URL/sitemap.xml`.
- JSON-LD `Organization` schema di `app.vue`, terisi dari `runtimeConfig.public` (nama, alamat, kontak,
  social link).

## 9. Target Performa

- Lighthouse Performance/SEO/Accessibility/Best Practices target ≥ 90 di halaman utama (mobile).
- Font & icon di-self-host (bukan fetch CDN eksternal saat runtime) untuk performa + privasi.
- Semua asset visual (logo, ilustrasi, prototype demo) adalah SVG/CSS — tidak ada foto berat yang perlu
  di-lazy-load atau di-compress.

## 10. Keterbatasan yang Disengaja (Phase 1)

- Tidak ada CMS/backend — update konten dilakukan lewat edit file (`i18n/locales/*.json`, `app/data/*.ts`)
  dan redeploy. Lihat `docs/CONTENT_GUIDE.md`.
- 4 komponen prototype layanan (`app/components/prototypes/`) murni front-end demonstratif (data
  simulasi), bukan integrasi API/AI sungguhan.
- Belum ada testimoni klien nyata — sengaja diganti dengan trust badges (`TrustSection.vue`) yang
  faktual, bukan kutipan fiktif. Tambahkan testimoni asli begitu tersedia (lihat `docs/CONTENT_GUIDE.md`).
