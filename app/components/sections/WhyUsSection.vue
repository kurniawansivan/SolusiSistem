<script setup lang="ts">
import { whyUsItems } from '~/data/why-us'

const { t } = useI18n()
</script>

<template>
  <section id="kenapa-kami" class="scroll-mt-20 py-20 sm:py-28">
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <p v-reveal class="reveal eyebrow mx-auto">{{ t('whyUs.eyebrow') }}</p>
        <h2 v-reveal="{ delay: 0.1 }" class="reveal section-heading mt-5">{{ t('whyUs.title') }}</h2>
        <p v-reveal="{ delay: 0.2 }" class="reveal mt-5 text-lg text-muted">{{ t('whyUs.subtitle') }}</p>
      </div>

      <div class="mt-16 grid gap-6 sm:grid-cols-2">
        <div
          v-for="(item, index) in whyUsItems"
          :key="item.key"
          v-reveal="{ delay: index * 0.08 }"
          class="reveal card-surface flex gap-5 p-7 transition-transform duration-300 hover:-translate-y-1"
        >
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-start">
            <Icon :name="item.icon" class="h-6 w-6" />
          </span>
          <div>
            <h3 class="text-lg font-bold text-ink">{{ t(`whyUs.items.${item.key}.title`) }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ t(`whyUs.items.${item.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
