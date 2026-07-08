<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'indigo' | 'cyan' | 'violet'
  }>(),
  {
    variant: 'indigo',
  },
)

const variantClass: Record<string, string> = {
  indigo: 'bg-brand-start/25',
  cyan: 'bg-brand-end/25',
  violet: 'bg-brand-mid/25',
}
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute -z-10 h-72 w-72 rounded-full blur-3xl animate-blob sm:h-96 sm:w-96"
    :class="variantClass[variant]"
  />
</template>
