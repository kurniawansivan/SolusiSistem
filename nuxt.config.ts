// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxt/eslint'],

  icon: {
    provider: 'iconify',
    clientBundle: {
      scan: true,
    },
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  components: [
    { path: '~/components/ui', pathPrefix: false },
    '~/components',
  ],

  fonts: {
    families: [{ name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700, 800] }],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://solusisistem.com',
      companyName: process.env.NUXT_PUBLIC_COMPANY_NAME || 'Solusi Sistem',
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER || '',
      email: process.env.NUXT_PUBLIC_EMAIL || '',
      phone: process.env.NUXT_PUBLIC_PHONE || '',
      address: process.env.NUXT_PUBLIC_ADDRESS || '',
      instagramUrl: process.env.NUXT_PUBLIC_INSTAGRAM_URL || '',
      linkedinUrl: process.env.NUXT_PUBLIC_LINKEDIN_URL || '',
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL || '',
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      contactFormName: process.env.NUXT_PUBLIC_CONTACT_FORM_NAME || 'contact',
    },
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://solusisistem.com',
    defaultLocale: 'id',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: false,
    customRoutes: 'config',
    pages: {
      about: { id: '/tentang', en: '/about' },
      contact: { id: '/kontak', en: '/contact' },
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://solusisistem.com',
  },

  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/robots.txt'],
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
