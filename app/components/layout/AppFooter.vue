<script setup lang="ts">
import { navItems } from '~/data/nav'

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public

const socials = computed(() =>
  [
    { icon: 'lucide:instagram', url: config.instagramUrl },
    { icon: 'lucide:linkedin', url: config.linkedinUrl },
    { icon: 'lucide:github', url: config.githubUrl },
  ].filter((s) => s.url),
)

function homeAnchor(hash: string) {
  return `${localePath('/')}${hash}`
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div class="sm:col-span-2 lg:col-span-1">
        <Logo :size="36" />
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
          {{ t('footer.tagline') }}
        </p>
        <div v-if="socials.length" class="mt-5 flex gap-3">
          <a
            v-for="s in socials"
            :key="s.icon"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand-start/40 hover:text-brand-start"
          >
            <Icon :name="s.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-ink">{{ t('footer.navTitle') }}</h3>
        <ul class="mt-4 space-y-3">
          <li v-for="item in navItems" :key="item.hash">
            <a :href="homeAnchor(item.hash)" class="text-sm text-muted hover:text-ink">{{ t(item.labelKey) }}</a>
          </li>
          <li>
            <NuxtLink :to="localePath('about')" class="text-sm text-muted hover:text-ink">{{ t('nav.about') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('contact')" class="text-sm text-muted hover:text-ink">{{ t('nav.contact') }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-ink">{{ t('footer.contactTitle') }}</h3>
        <ul class="mt-4 space-y-3 text-sm text-muted">
          <li v-if="config.email">
            <a :href="`mailto:${config.email}`" class="hover:text-ink">{{ config.email }}</a>
          </li>
          <li v-if="config.phone">
            <a :href="`tel:${config.phone.replace(/[^+\d]/g, '')}`" class="hover:text-ink">{{ config.phone }}</a>
          </li>
          <li v-if="config.address">{{ config.address }}</li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-ink">{{ t('footer.ctaTitle') }}</h3>
        <p class="mt-4 text-sm text-muted">{{ t('footer.ctaText') }}</p>
        <ButtonCta :to="localePath('contact')" variant="primary" class="mt-4">
          {{ t('nav.cta') }}
        </ButtonCta>
      </div>
    </div>

    <div class="border-t border-border py-6">
      <p class="container-page text-center text-xs text-subtle">
        &copy; {{ currentYear }} {{ config.companyName }}. {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
