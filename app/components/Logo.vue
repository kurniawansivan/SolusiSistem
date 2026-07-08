<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    size?: number
    showWordmark?: boolean
  }>(),
  {
    size: 40,
    showWordmark: true,
  },
)

const gradientId = `logo-gradient-${useId()}`
</script>

<template>
  <div class="inline-flex items-center gap-2.5">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Solusi Sistem"
    >
      <defs>
        <linearGradient :id="gradientId" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4F46E5" />
          <stop offset="1" stop-color="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" :fill="`url(#${gradientId})`" fill-opacity="0.08" />
      <rect x="1" y="1" width="38" height="38" rx="11" :stroke="`url(#${gradientId})`" stroke-width="1.4" />
      <text
        x="20"
        y="27.5"
        text-anchor="middle"
        font-family="'Plus Jakarta Sans', Inter, Arial, sans-serif"
        font-weight="800"
        font-size="16.5"
        letter-spacing="-0.5"
        :fill="`url(#${gradientId})`"
      >SS</text>
    </svg>

    <span
      v-if="showWordmark"
      class="text-lg font-extrabold tracking-tight text-ink"
    >
      Solusi<span class="bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">Sistem</span>
    </span>
  </div>
</template>
