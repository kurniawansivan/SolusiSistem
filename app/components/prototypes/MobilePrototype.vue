<script setup lang="ts">
const { t } = useI18n()

const tabs = [
  { key: 'home', icon: 'lucide:home' },
  { key: 'orders', icon: 'lucide:receipt' },
  { key: 'profile', icon: 'lucide:user' },
] as const

const activeTab = ref<(typeof tabs)[number]['key']>('home')

const services = [
  { icon: 'lucide:sparkles', color: 'bg-indigo-50 text-indigo-600' },
  { icon: 'lucide:calendar-check', color: 'bg-cyan-50 text-cyan-600' },
  { icon: 'lucide:package', color: 'bg-violet-50 text-violet-600' },
]

const orders = [
  { statusKey: 'inProgress', dot: 'bg-amber-500' },
  { statusKey: 'completed', dot: 'bg-emerald-500' },
  { statusKey: 'completed', dot: 'bg-emerald-500' },
]
</script>

<template>
  <div class="relative mx-auto h-[540px] w-[260px] rounded-[2.5rem] border-[8px] border-ink bg-ink shadow-card">
    <div class="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />

    <div class="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white">
      <div class="flex items-center justify-between px-5 pb-2 pt-6 text-[11px] font-semibold text-ink">
        <span>9:41</span>
        <div class="flex items-center gap-1">
          <Icon name="lucide:signal" class="h-3 w-3" />
          <Icon name="lucide:wifi" class="h-3 w-3" />
          <Icon name="lucide:battery-full" class="h-3.5 w-3.5" />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-4 pb-2 pt-2">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          mode="out-in"
        >
          <div v-if="activeTab === 'home'" key="home" class="space-y-4">
            <div>
              <p class="text-xs text-subtle">{{ t('prototypes.mobile.greeting') }}</p>
              <p class="text-base font-bold text-ink">{{ t('prototypes.mobile.title') }}</p>
            </div>
            <div class="space-y-2.5">
              <div
                v-for="(s, i) in services"
                :key="i"
                class="flex items-center gap-3 rounded-2xl border border-border p-3"
              >
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl" :class="s.color">
                  <Icon :name="s.icon" class="h-[18px] w-[18px]" />
                </span>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-ink">{{ t(`prototypes.mobile.services.${i}.name`) }}</p>
                  <p class="text-[11px] text-subtle">{{ t(`prototypes.mobile.services.${i}.desc`) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'orders'" key="orders" class="space-y-3">
            <p class="text-base font-bold text-ink">{{ t('prototypes.mobile.ordersTitle') }}</p>
            <div v-for="(o, i) in orders" :key="i" class="rounded-2xl border border-border p-3">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold text-ink">{{ t('prototypes.mobile.orderNumber') }}-{{ 1023 + i }}</p>
                <span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
                  <span class="h-1.5 w-1.5 rounded-full" :class="o.dot" />
                  {{ t(`prototypes.mobile.status.${o.statusKey}`) }}
                </span>
              </div>
            </div>
          </div>

          <div v-else key="profile" class="space-y-4 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-lg font-bold text-white">
              SS
            </div>
            <div>
              <p class="text-sm font-bold text-ink">{{ t('prototypes.mobile.profileName') }}</p>
              <p class="text-xs text-subtle">{{ t('prototypes.mobile.profileRole') }}</p>
            </div>
          </div>
        </Transition>
      </div>

      <div class="flex items-center justify-around border-t border-border py-3">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="flex flex-col items-center gap-1 text-[10px] font-medium transition-colors"
          :class="activeTab === tab.key ? 'text-brand-start' : 'text-subtle'"
          @click="activeTab = tab.key"
        >
          <Icon :name="tab.icon" class="h-[18px] w-[18px]" />
          {{ t(`prototypes.mobile.tabs.${tab.key}`) }}
        </button>
      </div>
    </div>
  </div>
</template>
