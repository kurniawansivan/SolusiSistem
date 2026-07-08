# Coding Standards

Standar ini mengikat untuk semua kontribusi ke repo ini — manusia maupun AI assistant.

## 1. Kebijakan "0 Error"

Sebelum PR/commit dianggap selesai, dua perintah ini **wajib** bersih tanpa error maupun warning:

```bash
npm run lint       # ESLint — termasuk aturan no-unused-vars, no-unused-components
npm run typecheck  # vue-tsc — 0 type error
```

Tidak ada pengecualian "nanti saja diperbaiki" — kalau lint/typecheck merah, task belum selesai.

## 2. Clean Code & DRY

- **Tidak ada import/variable/komponen yang tidak dipakai.** Ditegakkan otomatis oleh
  `@typescript-eslint/no-unused-vars` dan `vue/no-unused-components` di `eslint.config.mjs` — keduanya
  di-set sebagai `error`, bukan `warning`.
- **Jangan duplikasi logic.** Kalau pola yang sama dipakai di 2+ tempat (mis. format tanggal, warna badge
  status, tilt-on-mouse effect), ekstrak ke composable (`app/composables/`) atau komponen kecil
  (`app/components/ui/`).
- **Jangan bikin abstraksi yang belum perlu.** Tiga baris mirip lebih baik daripada helper generik yang
  cuma dipakai sekali. Tunggu sampai pola itu benar-benar berulang (aturan "rule of three").
- **Komponen kecil & fokus.** Kalau satu file `.vue` sudah > ~200 baris dan mengerjakan lebih dari satu
  tanggung jawab jelas, pecah jadi sub-komponen.
- **Naming jelas.** Nama variabel/fungsi menjelaskan isinya sendiri — hindari singkatan ambigu. Nama
  file komponen PascalCase, nama composable diawali `use`.

## 3. Konvensi Vue / Nuxt

- Selalu `<script setup lang="ts">` — tidak pakai Options API.
- Props didefinisikan lewat `defineProps<{ ... }>()` (type-based), pakai `withDefaults` kalau ada nilai
  default yang masuk akal. Untuk props yang memang saling eksklusif (mis. `to` vs `href` di
  `ButtonCta.vue`), TIDAK perlu default — biarkan `undefined`, jangan paksa `vue/require-default-prop`
  (rule ini sengaja dimatikan di `eslint.config.mjs` untuk kasus ini).
- Manfaatkan **auto-import Nuxt** — jangan tulis `import { ref, computed, onMounted } from 'vue'`,
  `import { useRoute } from '#app'`, dst. Import manual hanya untuk sumber yang memang bukan
  auto-import: file di bawah `~/data/`, library eksternal (`gsap`, `lenis`), dan tipe (`import type`).
- Auto-import komponen mengikuti struktur folder (lihat konfigurasi `components` di `nuxt.config.ts`):
  `components/layout/Foo.vue` → `<LayoutFoo />`, `components/sections/Foo.vue` → `<SectionsFoo />`,
  `components/prototypes/Foo.vue` → `<PrototypesFoo />`, tapi `components/ui/Foo.vue` → `<Foo />`
  (pathPrefix dimatikan khusus folder `ui/` karena isinya elemen dasar yang sering dipakai).
- Style hanya lewat Tailwind utility class. Hindari `<style scoped>` kecuali untuk animasi CSS custom yang
  tidak bisa diekspresikan lewat utility Tailwind (contoh: `AutomationPrototype.vue`).

## 4. Internationalization

- Semua teks user-facing WAJIB lewat `t('namespace.key')` dari `useI18n()` — tidak ada string
  hardcoded di template selain teks non-linguistik (nomor, simbol, nama produk "Solusi Sistem").
- Key ditambahkan ke `i18n/locales/id.json` **dan** `en.json` di saat yang sama. Jangan pernah biarkan
  key hanya ada di satu locale.
- Nama key mengikuti struktur nested berdasarkan section (`hero.*`, `services.web.*`,
  `prototypes.ai.*`, dst) — cocokkan dengan pola yang sudah ada, jangan bikin namespace baru yang
  tumpang tindih.

## 5. Aksesibilitas & Motion

- Semua elemen interaktif (button, link, form input) punya label yang jelas (teks visible atau
  `aria-label`).
- Semua animasi baru (GSAP, CSS `animate-*`, custom `@keyframes`) harus otomatis nonaktif/instan saat
  `prefers-reduced-motion: reduce` — pakai pola yang sudah ada di `useScrollReveal.ts` (directive
  `v-reveal`) atau andalkan override global di `main.css` untuk kelas `animate-*` bawaan Tailwind.
- Kontras warna teks-atas-background minimal memenuhi WCAG AA (pakai token warna yang sudah didefinisikan
  di `tailwind.config.ts`: `ink`, `muted`, `subtle` — jangan bikin warna teks baru sembarangan).

## 6. Environment & Secrets

- Data kontak/credential (nomor WA, email, dst) HARUS lewat `.env` → `runtimeConfig.public` — tidak
  boleh hardcoded di komponen.
- `.env` tidak pernah di-commit (sudah di `.gitignore`). `.env.example` harus selalu sinkron — kalau
  menambah variabel baru di `nuxt.config.ts`, tambahkan juga contohnya di `.env.example`.
- Karena semua variabel ini masuk `runtimeConfig.public`, anggap semuanya **terlihat oleh siapa saja**
  yang buka website (ter-bundle ke client). Jangan pernah taruh API key rahasia/secret di sini — kalau
  suatu saat butuh secret asli (mis. API key AI berbayar), itu harus lewat `runtimeConfig` (non-public)
  + server route/API, bukan `runtimeConfig.public`.

## 7. Commit

- Commit message singkat, jelaskan "kenapa" bukan cuma "apa" (mis. "Fix contact form validation supaya
  tidak submit form kosong" lebih baik dari "update contact.vue").
- Jangan commit file hasil build (`.output/`, `.nuxt/`, `dist/`) — semua sudah di `.gitignore`.
