<script setup lang="ts">
import { services } from '~/data/services'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section id="layanan" class="scroll-mt-20 py-20 sm:py-28">
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <p v-reveal class="reveal eyebrow mx-auto">{{ t('services.eyebrow') }}</p>
        <h2 v-reveal="{ delay: 0.1 }" class="reveal section-heading mt-5">{{ t('services.title') }}</h2>
        <p v-reveal="{ delay: 0.2 }" class="reveal mt-5 text-lg text-muted">{{ t('services.subtitle') }}</p>
      </div>

      <div class="mt-20 flex flex-col gap-24">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div
            v-reveal="{ x: index % 2 === 0 ? -24 : 24 }"
            class="reveal flex min-w-0 justify-center"
            :class="index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'"
          >
            <PrototypesWebPrototype v-if="service.id === 'web'" />
            <PrototypesMobilePrototype v-else-if="service.id === 'mobile'" />
            <PrototypesAiPrototype v-else-if="service.id === 'ai'" />
            <PrototypesAutomationPrototype v-else-if="service.id === 'automation'" />
          </div>

          <div v-reveal="{ x: index % 2 === 0 ? 24 : -24 }" class="reveal" :class="index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-start">
              <Icon :name="service.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-5 text-2xl font-bold text-ink sm:text-3xl">{{ t(`services.${service.id}.title`) }}</h3>
            <p class="mt-4 text-base leading-relaxed text-muted">{{ t(`services.${service.id}.desc`) }}</p>
            <ul class="mt-6 space-y-3">
              <li v-for="n in 3" :key="n" class="flex items-start gap-2.5 text-sm text-ink">
                <Icon name="lucide:check-circle-2" class="mt-0.5 h-4 w-4 shrink-0 text-brand-start" />
                {{ t(`services.${service.id}.feature${n}`) }}
              </li>
            </ul>
            <ButtonCta :to="localePath('contact')" variant="secondary" class="mt-7">
              {{ t('services.cta') }}
              <Icon name="lucide:arrow-right" class="h-4 w-4" />
            </ButtonCta>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
