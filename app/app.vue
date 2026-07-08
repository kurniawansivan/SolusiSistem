<script setup lang="ts">
const config = useRuntimeConfig().public

const { locale } = useI18n()

useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: config.companyName,
        url: config.siteUrl,
        logo: `${config.siteUrl}/logo.svg`,
        email: config.email || undefined,
        telephone: config.phone || undefined,
        address: config.address || undefined,
        sameAs: [config.instagramUrl, config.linkedinUrl, config.githubUrl].filter(Boolean),
      }),
    },
  ],
  noscript: [{ innerHTML: '.reveal { opacity: 1 !important; }' }],
})
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <NuxtRouteAnnouncer />
    <LayoutAppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <LayoutAppFooter />
  </div>
</template>
