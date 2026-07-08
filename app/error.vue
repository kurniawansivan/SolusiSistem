<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <NuxtLink :to="localePath('/')" class="mb-8">
        <Logo :size="40" />
      </NuxtLink>
      <p class="text-7xl font-extrabold bg-brand-gradient bg-clip-text text-transparent sm:text-8xl">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-4 text-2xl font-bold text-ink">{{ t('error.title') }}</h1>
      <p class="mt-3 max-w-md text-muted">{{ t('error.subtitle') }}</p>
      <button type="button" class="btn-primary mt-8" @click="goHome">
        <Icon name="lucide:home" class="h-4 w-4" />
        {{ t('error.cta') }}
      </button>
    </div>
  </div>
</template>
