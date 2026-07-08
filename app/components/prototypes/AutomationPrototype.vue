<script setup lang="ts">
const { t } = useI18n()

const steps = [
  { key: 'trigger', icon: 'lucide:zap' },
  { key: 'whatsapp', icon: 'lucide:message-circle' },
  { key: 'sheet', icon: 'lucide:table' },
  { key: 'notify', icon: 'lucide:bell' },
]
</script>

<template>
  <div class="w-full min-w-0 max-w-2xl rounded-2xl border border-border bg-white p-6 shadow-card">
    <div class="mb-6 flex items-center justify-between">
      <p class="text-sm font-semibold text-ink">{{ t('prototypes.automation.title') }}</p>
      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {{ t('prototypes.automation.active') }}
      </span>
    </div>

    <div class="flex snap-x items-center gap-1 overflow-x-auto pb-2" data-lenis-prevent>
      <template v-for="(step, i) in steps" :key="step.key">
        <div class="flex w-32 shrink-0 snap-start flex-col items-center gap-2 text-center">
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
            <Icon :name="step.icon" class="h-5 w-5" />
          </span>
          <p class="text-xs font-semibold text-ink">{{ t(`prototypes.automation.steps.${step.key}.title`) }}</p>
          <p class="text-[11px] leading-snug text-subtle">{{ t(`prototypes.automation.steps.${step.key}.desc`) }}</p>
        </div>

        <div v-if="i < steps.length - 1" class="connector relative h-px min-w-[28px] flex-1 bg-border">
          <span class="connector-dot absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-gradient" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.connector-dot {
  left: 0%;
  animation: flow-right 1.8s linear infinite;
}

@keyframes flow-right {
  0% {
    left: 0%;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
</style>
