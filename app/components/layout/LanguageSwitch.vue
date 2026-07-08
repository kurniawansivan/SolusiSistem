<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center rounded-full border border-border p-0.5 text-xs font-semibold">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="rounded-full px-2.5 py-1 transition-colors duration-200"
      :class="locale === l.code ? 'bg-ink text-white' : 'text-muted hover:text-ink'"
    >
      {{ l.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
