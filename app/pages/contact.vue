<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig().public

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description'),
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})

type Status = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<Status>('idle')

function encodeFormData(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

async function handleSubmit() {
  status.value = 'submitting'
  try {
    await $fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({ 'form-name': config.contactFormName, ...form }),
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.service = ''
    form.message = ''
  } catch {
    status.value = 'error'
  }
}

const waLink = computed(() => (config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}` : null))

const directContacts = computed(() =>
  [
    config.whatsappNumber && { icon: 'lucide:message-circle', labelKey: 'direct.whatsapp', value: config.phone || config.whatsappNumber, href: waLink.value },
    config.email && { icon: 'lucide:mail', labelKey: 'direct.email', value: config.email, href: `mailto:${config.email}` },
    config.phone && { icon: 'lucide:phone', labelKey: 'direct.phone', value: config.phone, href: `tel:${config.phone.replace(/[^+\d]/g, '')}` },
    config.address && { icon: 'lucide:map-pin', labelKey: 'direct.address', value: config.address, href: undefined },
  ].filter(Boolean) as { icon: string; labelKey: string; value: string; href?: string }[],
)
</script>

<template>
  <div>
    <section class="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24">
      <div
        class="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <GradientBlob variant="cyan" class="right-1/4 top-0" />

      <div class="container-page relative mx-auto max-w-2xl text-center">
        <p v-reveal class="reveal eyebrow mx-auto">{{ t('contact.eyebrow') }}</p>
        <h1 v-reveal="{ delay: 0.1 }" class="reveal mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {{ t('contact.title') }}
        </h1>
        <p v-reveal="{ delay: 0.2 }" class="reveal mt-6 text-lg leading-relaxed text-muted">
          {{ t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <section class="pb-24">
      <div class="container-page grid gap-10 lg:grid-cols-5 lg:gap-14">
        <form
          v-reveal="{ x: -24 }"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          class="reveal card-surface space-y-5 p-7 lg:col-span-3 sm:p-9"
          @submit.prevent="handleSubmit"
        >
          <input type="hidden" name="form-name" :value="config.contactFormName" />
          <p class="hidden">
            <label>
              Don't fill this out: <input name="bot-field" tabindex="-1" autocomplete="off" />
            </label>
          </p>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="text-sm font-medium text-ink">{{ t('contact.form.name') }}</label>
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                required
                :placeholder="t('contact.form.namePlaceholder')"
                class="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-start/50"
              />
            </div>
            <div>
              <label for="email" class="text-sm font-medium text-ink">{{ t('contact.form.email') }}</label>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                required
                :placeholder="t('contact.form.emailPlaceholder')"
                class="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-start/50"
              />
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="phone" class="text-sm font-medium text-ink">{{ t('contact.form.phone') }}</label>
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                :placeholder="t('contact.form.phonePlaceholder')"
                class="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-start/50"
              />
            </div>
            <div>
              <label for="service" class="text-sm font-medium text-ink">{{ t('contact.form.service') }}</label>
              <select
                id="service"
                v-model="form.service"
                name="service"
                class="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-start/50"
              >
                <option value="">{{ t('contact.form.servicePlaceholder') }}</option>
                <option value="web">{{ t('contact.form.serviceOptions.web') }}</option>
                <option value="mobile">{{ t('contact.form.serviceOptions.mobile') }}</option>
                <option value="ai">{{ t('contact.form.serviceOptions.ai') }}</option>
                <option value="automation">{{ t('contact.form.serviceOptions.automation') }}</option>
                <option value="other">{{ t('contact.form.serviceOptions.other') }}</option>
              </select>
            </div>
          </div>

          <div>
            <label for="message" class="text-sm font-medium text-ink">{{ t('contact.form.message') }}</label>
            <textarea
              id="message"
              v-model="form.message"
              name="message"
              rows="5"
              required
              :placeholder="t('contact.form.messagePlaceholder')"
              class="mt-2 w-full resize-none rounded-xl border border-border px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-start/50"
            />
          </div>

          <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="status === 'submitting'">
            <Icon v-if="status === 'submitting'" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
            {{ status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit') }}
            <Icon v-if="status !== 'submitting'" name="lucide:send" class="h-4 w-4" />
          </button>

          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="status === 'success'" class="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-700">
              <Icon name="lucide:check-circle-2" class="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p class="text-sm font-semibold">{{ t('contact.form.successTitle') }}</p>
                <p class="text-sm">{{ t('contact.form.successText') }}</p>
              </div>
            </div>
            <div v-else-if="status === 'error'" class="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-700">
              <Icon name="lucide:alert-circle" class="mt-0.5 h-5 w-5 shrink-0" />
              <p class="text-sm">{{ t('contact.form.errorText') }}</p>
            </div>
          </Transition>
        </form>

        <div v-reveal="{ x: 24 }" class="reveal lg:col-span-2">
          <h2 class="text-lg font-bold text-ink">{{ t('contact.direct.title') }}</h2>
          <div class="mt-5 space-y-4">
            <a
              v-for="item in directContacts"
              :key="item.labelKey"
              :href="item.href"
              :target="item.href?.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="card-surface flex items-center gap-4 p-5 transition-transform duration-300"
              :class="item.href ? 'hover:-translate-y-0.5' : 'cursor-default'"
            >
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-start">
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              <div>
                <p class="text-xs font-medium text-subtle">{{ t(`contact.${item.labelKey}`) }}</p>
                <p class="text-sm font-semibold text-ink">{{ item.value }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
