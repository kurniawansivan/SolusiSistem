<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public

const waLink = computed(() => {
  if (!config.whatsappNumber) return null
  const message = encodeURIComponent(t('cta.whatsappMessage'))
  return `https://wa.me/${config.whatsappNumber}?text=${message}`
})
</script>

<template>
  <section class="py-20 sm:py-28">
    <div class="container-page">
      <div
        v-reveal
        class="reveal relative overflow-hidden rounded-3xl bg-brand-gradient bg-[length:200%_200%] px-8 py-16 text-center animate-gradient-x sm:px-16"
      >
        <div class="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-10" aria-hidden="true" />
        <h2 class="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {{ t('cta.title') }}
        </h2>
        <p class="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
          {{ t('cta.subtitle') }}
        </p>
        <div class="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <NuxtLink :to="localePath('contact')" class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-start transition-transform hover:scale-[1.03]">
            {{ t('cta.ctaPrimary') }}
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </NuxtLink>
          <a
            v-if="waLink"
            :href="waLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Icon name="lucide:message-circle" class="h-4 w-4" />
            {{ t('cta.ctaWhatsapp') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
