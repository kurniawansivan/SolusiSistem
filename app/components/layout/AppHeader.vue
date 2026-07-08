<script setup lang="ts">
import { navItems } from '~/data/nav'

const { t } = useI18n()
const localePath = useLocalePath()

const mobileOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

const route = useRoute()
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

function homeAnchor(hash: string) {
  return `${localePath('/')}${hash}`
}
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'border-b border-border bg-white/80 backdrop-blur-lg' : 'bg-transparent'"
  >
    <div class="container-page flex h-18 items-center justify-between py-4">
      <NuxtLink :to="localePath('/')" class="shrink-0">
        <Logo :size="36" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex">
        <a
          v-for="item in navItems"
          :key="item.hash"
          :href="homeAnchor(item.hash)"
          class="text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          {{ t(item.labelKey) }}
        </a>
        <NuxtLink
          :to="localePath('about')"
          class="text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          {{ t('nav.about') }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-4 lg:flex">
        <LayoutLanguageSwitch />
        <ButtonCta :to="localePath('contact')" variant="primary">
          {{ t('nav.cta') }}
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </ButtonCta>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
        :aria-expanded="mobileOpen"
        aria-label="Menu"
        @click="mobileOpen = !mobileOpen"
      >
        <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="border-t border-border bg-white lg:hidden">
        <nav class="container-page flex flex-col gap-1 py-4">
          <a
            v-for="item in navItems"
            :key="item.hash"
            :href="homeAnchor(item.hash)"
            class="rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-ink"
            @click="mobileOpen = false"
          >
            {{ t(item.labelKey) }}
          </a>
          <NuxtLink
            :to="localePath('about')"
            class="rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-ink"
          >
            {{ t('nav.about') }}
          </NuxtLink>
          <div class="mt-2 flex items-center justify-between px-3">
            <LayoutLanguageSwitch />
          </div>
          <ButtonCta :to="localePath('contact')" variant="primary" class="mt-3 w-full">
            {{ t('nav.cta') }}
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </ButtonCta>
        </nav>
      </div>
    </Transition>
  </header>
</template>
