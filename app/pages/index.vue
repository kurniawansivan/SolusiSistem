<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <SectionsHeroSection />
    <SectionsServicesSection />
    <SectionsProcessSection />
    <SectionsWhyUsSection />
    <SectionsTrustSection />
    <SectionsCtaBanner />
  </div>
</template>
