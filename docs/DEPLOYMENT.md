# Deployment Guide — Netlify

## 1. Persiapan

1. Push repo ini ke GitHub/GitLab/Bitbucket (Netlify butuh akses ke Git provider untuk auto-deploy).
2. Siapkan nilai environment variable asli (lihat `.env.example`) — terutama:
   - `NUXT_PUBLIC_SITE_URL` (domain final, mis. `https://solusisistem.com`)
   - `NUXT_PUBLIC_WHATSAPP_NUMBER`, `NUXT_PUBLIC_EMAIL`, `NUXT_PUBLIC_PHONE`, `NUXT_PUBLIC_ADDRESS`

## 2. Buat Site Baru di Netlify

1. Login ke [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. Pilih repo ini dari Git provider.
3. Build settings:
   - **Build command**: `npm run generate`
   - **Publish directory**: `dist`
   - **Node version**: 20 atau lebih baru (set lewat `NODE_VERSION` env var kalau perlu, atau file
     `.nvmrc` — proyek ini sudah teruji di Node 24).
4. Sebelum klik "Deploy site", buka bagian **Environment variables** dan isi SEMUA variabel dari
   `.env.example` dengan nilai asli.

## 3. Environment Variables di Netlify

Buka **Site settings → Environment variables**, tambahkan satu per satu persis seperti nama di
`.env.example` (prefix `NUXT_PUBLIC_` wajib sama persis):

| Key | Contoh Nilai |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | `https://solusisistem.com` |
| `NUXT_PUBLIC_COMPANY_NAME` | `Solusi Sistem` |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | `6281234567890` |
| `NUXT_PUBLIC_EMAIL` | `hello@solusisistem.com` |
| `NUXT_PUBLIC_PHONE` | `+62 812-3456-7890` |
| `NUXT_PUBLIC_ADDRESS` | `Jakarta, Indonesia` |
| `NUXT_PUBLIC_INSTAGRAM_URL` | (opsional) |
| `NUXT_PUBLIC_LINKEDIN_URL` | (opsional) |
| `NUXT_PUBLIC_GITHUB_URL` | (opsional) |
| `NUXT_PUBLIC_GA_ID` | (opsional, `G-XXXXXXXXXX`) |
| `NUXT_PUBLIC_CONTACT_FORM_NAME` | `contact` |

Setiap kali mengubah environment variable, **trigger re-deploy** (Netlify tidak otomatis rebuild hanya
karena env var berubah).

## 4. Aktifkan Netlify Forms

Form kontak di `/kontak` (`/contact` untuk versi Inggris) sudah pakai atribut `data-netlify="true"` dan
honeypot anti-spam (`netlify-honeypot="bot-field"`) — Netlify otomatis mendeteksinya dari HTML statis
hasil `npm run generate`, tidak perlu setup tambahan di kode.

Yang perlu dilakukan manual di dashboard Netlify:

1. **Site settings → Forms → Form notifications** → tambahkan **Email notification** ke alamat email
   tim (supaya setiap submission masuk ke inbox).
2. (Opsional) Aktifkan **Akismet spam filtering** kalau mulai banyak spam masuk.
3. Cek submission masuk di **Site → Forms → contact**.

## 5. Custom Domain

1. **Site settings → Domain management → Add a domain**.
2. Ikuti instruksi Netlify untuk arahkan DNS (biasanya CNAME ke `<site-name>.netlify.app` atau NS ke
   Netlify DNS).
3. Aktifkan **HTTPS** (Netlify otomatis provision sertifikat Let's Encrypt setelah DNS terverifikasi).
4. Update `NUXT_PUBLIC_SITE_URL` di environment variable jadi domain final, lalu re-deploy — ini
   memengaruhi sitemap, robots.txt, dan JSON-LD schema.

## 6. Build Lokal untuk Verifikasi Sebelum Push

```bash
npm run generate   # build statis, output ke dist
npm run preview    # jalankan hasil build statis di localhost untuk verifikasi akhir
```

## 7. Rollback

Netlify menyimpan riwayat setiap deploy di tab **Deploys** — kalau ada masalah setelah deploy baru,
klik deploy sebelumnya yang stabil lalu **Publish deploy** untuk rollback instan tanpa perlu revert
kode.
