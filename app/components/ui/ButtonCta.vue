<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary'
    target?: string
  }>(),
  {
    variant: 'primary',
  },
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="variant === 'primary' ? 'btn-primary' : 'btn-secondary'"
  >
    <slot />
  </NuxtLink>
  <a
    v-else
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="variant === 'primary' ? 'btn-primary' : 'btn-secondary'"
  >
    <slot />
  </a>
</template>
