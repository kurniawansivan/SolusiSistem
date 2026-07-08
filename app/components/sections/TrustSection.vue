<script setup lang="ts">
import { commitments } from '~/data/commitments'

const { t } = useI18n()
</script>

<template>
  <section class="border-y border-border bg-surface py-16">
    <div class="container-page">
      <p v-reveal class="reveal text-center text-sm font-semibold uppercase tracking-wider text-subtle">
        {{ t('trust.title') }}
      </p>

      <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="(item, index) in commitments"
          :key="item.key"
          v-reveal="{ delay: index * 0.06 }"
          class="reveal flex flex-col items-center gap-3 text-center"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-start shadow-card">
            <Icon :name="item.icon" class="h-5 w-5" />
          </span>
          <p class="text-xs font-semibold leading-snug text-ink">{{ t(`trust.items.${item.key}`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
