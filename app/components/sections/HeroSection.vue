<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const chips = ['fullService', 'ownership', 'support']
</script>

<template>
  <section class="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
    <div
      class="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      aria-hidden="true"
    />
    <GradientBlob variant="indigo" class="left-1/4 top-0" />
    <GradientBlob variant="cyan" class="right-0 top-40" />

    <div class="container-page relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div>
        <p v-reveal class="reveal eyebrow">
          <Icon name="lucide:sparkles" class="h-3.5 w-3.5" />
          {{ t('hero.eyebrow') }}
        </p>

        <h1 v-reveal="{ delay: 0.1 }" class="reveal mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {{ t('hero.titleStart') }}
          <span class="bg-brand-gradient bg-clip-text text-transparent">{{ t('hero.titleHighlight') }}</span>
          {{ t('hero.titleEnd') }}
        </h1>

        <p v-reveal="{ delay: 0.2 }" class="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {{ t('hero.subtitle') }}
        </p>

        <div v-reveal="{ delay: 0.3 }" class="reveal mt-8 flex flex-wrap items-center gap-4">
          <ButtonCta :to="localePath('contact')" variant="primary">
            {{ t('hero.ctaPrimary') }}
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </ButtonCta>
          <ButtonCta :href="`${localePath('/')}#layanan`" variant="secondary">
            <Icon name="lucide:layout-grid" class="h-4 w-4" />
            {{ t('hero.ctaSecondary') }}
          </ButtonCta>
        </div>

        <div v-reveal="{ delay: 0.4 }" class="reveal mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <div v-for="chip in chips" :key="chip" class="flex items-center gap-2 text-sm font-medium text-muted">
            <Icon name="lucide:check-circle-2" class="h-4 w-4 text-brand-start" />
            {{ t(`hero.chips.${chip}`) }}
          </div>
        </div>
      </div>

      <div v-reveal="{ delay: 0.2, x: 24 }" class="reveal relative mx-auto w-full max-w-sm lg:mx-0">
        <div class="card-surface animate-float p-5">
          <div class="mb-4 flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span class="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div class="space-y-2.5">
            <div class="h-3 w-3/4 rounded-full bg-surface" />
            <div class="h-3 w-1/2 rounded-full bg-surface" />
            <div class="mt-4 flex h-20 items-end gap-1.5">
              <div v-for="h in [30, 55, 40, 70, 50, 85, 60]" :key="h" class="flex-1 rounded-t bg-brand-gradient" :style="{ height: `${h}%` }" />
            </div>
          </div>
        </div>

        <div class="card-surface absolute -bottom-6 -left-6 flex animate-float items-center gap-2 px-3.5 py-2.5" style="animation-delay: 1s">
          <Icon name="lucide:smartphone" class="h-4 w-4 text-brand-start" />
          <span class="text-xs font-semibold text-ink">{{ t('hero.floatMobile') }}</span>
        </div>

        <div class="card-surface absolute -right-4 -top-6 flex animate-float items-center gap-2 px-3.5 py-2.5" style="animation-delay: 2s">
          <Icon name="lucide:bot" class="h-4 w-4 text-brand-start" />
          <span class="text-xs font-semibold text-ink">{{ t('hero.floatAi') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
