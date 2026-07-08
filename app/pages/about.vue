<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.about.title'),
  description: () => t('seo.about.description'),
  ogTitle: () => t('seo.about.title'),
  ogDescription: () => t('seo.about.description'),
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

const valueKeys = ['quality', 'innovation', 'collaboration', 'integrity'] as const
const valueIcons: Record<(typeof valueKeys)[number], string> = {
  quality: 'lucide:gem',
  innovation: 'lucide:lightbulb',
  collaboration: 'lucide:handshake',
  integrity: 'lucide:scale',
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24">
      <div
        class="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <GradientBlob variant="violet" class="left-1/3 top-0" />

      <div class="container-page relative mx-auto max-w-2xl text-center">
        <p v-reveal class="reveal eyebrow mx-auto">{{ t('about.eyebrow') }}</p>
        <h1 v-reveal="{ delay: 0.1 }" class="reveal mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {{ t('about.title') }}
        </h1>
        <p v-reveal="{ delay: 0.2 }" class="reveal mt-6 text-lg leading-relaxed text-muted">
          {{ t('about.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 sm:py-20">
      <div class="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div v-reveal="{ x: -24 }" class="reveal">
          <h2 class="text-2xl font-bold text-ink sm:text-3xl">{{ t('about.story.title') }}</h2>
          <p class="mt-5 leading-relaxed text-muted">{{ t('about.story.paragraph1') }}</p>
          <p class="mt-4 leading-relaxed text-muted">{{ t('about.story.paragraph2') }}</p>
        </div>

        <div v-reveal="{ x: 24 }" class="reveal grid gap-5 sm:grid-cols-2">
          <div class="card-surface p-7">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-start">
              <Icon name="lucide:telescope" class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-bold text-ink">{{ t('about.vision.title') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ t('about.vision.text') }}</p>
          </div>
          <div class="card-surface p-7">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-start">
              <Icon name="lucide:target" class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-bold text-ink">{{ t('about.mission.title') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ t('about.mission.text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-surface py-20 sm:py-28">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 v-reveal class="reveal section-heading">{{ t('about.values.title') }}</h2>
          <p v-reveal="{ delay: 0.1 }" class="reveal mt-5 text-lg text-muted">{{ t('about.values.subtitle') }}</p>
        </div>

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(key, index) in valueKeys"
            :key="key"
            v-reveal="{ delay: index * 0.08 }"
            class="reveal card-surface p-6 text-center"
          >
            <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-start">
              <Icon :name="valueIcons[key]" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-base font-bold text-ink">{{ t(`about.values.items.${key}.title`) }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ t(`about.values.items.${key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionsCtaBanner />
  </div>
</template>
