<script setup lang="ts">
import { gsap } from 'gsap'

const { t } = useI18n()

const stats = [
  { key: 'visitors', raw: 128400, format: (v: number) => Math.round(v).toLocaleString('id-ID') },
  { key: 'conversion', raw: 32, format: (v: number) => `${Math.round(v)}%` },
  { key: 'uptime', raw: 99.9, format: (v: number) => `${v.toFixed(1)}%` },
]
const displayValues = reactive(stats.map(() => 0))
const bars = [40, 62, 48, 80, 58, 95, 72]

const cardRef = ref<HTMLElement | null>(null)
const started = ref(false)

function animateCounters() {
  if (started.value) return
  started.value = true

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stats.forEach((s, i) => (displayValues[i] = s.raw))
    return
  }

  stats.forEach((s, i) => {
    gsap.to(displayValues, { [i]: s.raw, duration: 1.6, ease: 'power2.out' })
  })
}

onMounted(() => {
  if (!cardRef.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animateCounters()
        observer.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(cardRef.value)
  onUnmounted(() => observer.disconnect())
})

const tiltStyle = ref('transform: perspective(1000px) rotateX(0deg) rotateY(0deg)')

function onMouseMove(e: MouseEvent) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  tiltStyle.value = `transform: perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`
}

function resetTilt() {
  tiltStyle.value = 'transform: perspective(1000px) rotateX(0deg) rotateY(0deg)'
}
</script>

<template>
  <div
    ref="cardRef"
    :style="tiltStyle"
    class="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-transform duration-300 ease-out"
    @mousemove="onMouseMove"
    @mouseleave="resetTilt"
  >
    <div class="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
      <span class="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span class="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <div class="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-subtle">
        solusisistem.com/dashboard
      </div>
    </div>

    <div class="space-y-5 p-5">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold text-ink">{{ t('prototypes.web.title') }}</p>
        <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          {{ t('prototypes.web.live') }}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div v-for="(s, i) in stats" :key="s.key" class="rounded-xl bg-surface p-3">
          <p class="text-[11px] font-medium text-subtle">{{ t(`prototypes.web.stats.${s.key}`) }}</p>
          <p class="mt-1 text-lg font-bold text-ink">{{ s.format(displayValues[i] ?? 0) }}</p>
        </div>
      </div>

      <div class="flex h-24 items-end gap-2 rounded-xl bg-surface p-3">
        <div
          v-for="(h, i) in bars"
          :key="i"
          class="flex-1 rounded-t-md bg-brand-gradient transition-all duration-700 ease-out"
          :style="{ height: started ? `${h}%` : '4%' }"
        />
      </div>
    </div>
  </div>
</template>
