<script setup lang="ts">
import { processSteps } from '~/data/process'

const { t } = useI18n()
</script>

<template>
  <section id="proses" class="scroll-mt-20 bg-surface py-20 sm:py-28">
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <p v-reveal class="reveal eyebrow mx-auto">{{ t('process.eyebrow') }}</p>
        <h2 v-reveal="{ delay: 0.1 }" class="reveal section-heading mt-5">{{ t('process.title') }}</h2>
        <p v-reveal="{ delay: 0.2 }" class="reveal mt-5 text-lg text-muted">{{ t('process.subtitle') }}</p>
      </div>

      <div class="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        <div
          v-for="(step, index) in processSteps"
          :key="step.key"
          v-reveal="{ delay: index * 0.08 }"
          class="reveal relative flex flex-col items-center text-center"
        >
          <div class="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-start shadow-card">
            <Icon :name="step.icon" class="h-6 w-6" />
            <span class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-[11px] font-bold text-white">
              {{ index + 1 }}
            </span>
          </div>
          <h3 class="mt-5 text-base font-bold text-ink">{{ t(`process.steps.${step.key}.title`) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ t(`process.steps.${step.key}.desc`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
