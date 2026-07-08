<script setup lang="ts">
const { t } = useI18n()

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
}

const input = ref('')
const messages = reactive<ChatMessage[]>([])
const isTyping = ref(false)
const scrollRef = ref<HTMLElement | null>(null)

const chipKeys = ['pricing', 'timeline', 'mobile', 'automation']

function keywordReplyKey(text: string): string {
  const lower = text.toLowerCase()
  if (/harga|price|biaya|budget/.test(lower)) return 'prototypes.ai.replies.pricing'
  if (/mobile|apps|aplikasi/.test(lower)) return 'prototypes.ai.replies.mobile'
  if (/otomatis|automation|automasi/.test(lower)) return 'prototypes.ai.replies.automation'
  if (/berapa lama|timeline|durasi|waktu/.test(lower)) return 'prototypes.ai.replies.timeline'
  return 'prototypes.ai.replies.default'
}

async function scrollToBottom() {
  await nextTick()
  if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
}

function send(text?: string) {
  const value = (text ?? input.value).trim()
  if (!value || isTyping.value) return

  messages.push({ role: 'user', text: value })
  input.value = ''
  isTyping.value = true
  scrollToBottom()

  const replyKey = keywordReplyKey(value)
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 900

  setTimeout(() => {
    isTyping.value = false
    messages.push({ role: 'bot', text: t(replyKey) })
    scrollToBottom()
  }, delay)
}

function sendChip(key: string) {
  send(t(`prototypes.ai.chips.${key}`))
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card">
    <div class="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
      <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white">
        <Icon name="lucide:bot" class="h-4 w-4" />
      </span>
      <div>
        <p class="text-sm font-semibold text-ink">{{ t('prototypes.ai.assistantName') }}</p>
        <span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {{ t('prototypes.ai.online') }}
        </span>
      </div>
    </div>

    <div ref="scrollRef" class="flex h-72 flex-col gap-3 overflow-y-auto p-4">
      <div class="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-sm text-ink">
        {{ t('prototypes.ai.greeting') }}
      </div>

      <div
        v-for="(m, i) in messages"
        :key="i"
        class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm"
        :class="
          m.role === 'user'
            ? 'ml-auto rounded-tr-sm bg-brand-gradient text-white'
            : 'rounded-tl-sm bg-surface text-ink'
        "
      >
        {{ m.text }}
      </div>

      <div v-if="isTyping" class="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-sm bg-surface px-3.5 py-3">
        <span class="h-1.5 w-1.5 animate-typing rounded-full bg-subtle" style="animation-delay: 0ms" />
        <span class="h-1.5 w-1.5 animate-typing rounded-full bg-subtle" style="animation-delay: 150ms" />
        <span class="h-1.5 w-1.5 animate-typing rounded-full bg-subtle" style="animation-delay: 300ms" />
      </div>
    </div>

    <div v-if="messages.length === 0" class="flex flex-wrap gap-2 border-t border-border px-4 py-3">
      <button
        v-for="key in chipKeys"
        :key="key"
        type="button"
        class="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-brand-start/40 hover:text-brand-start"
        @click="sendChip(key)"
      >
        {{ t(`prototypes.ai.chips.${key}`) }}
      </button>
    </div>

    <form class="flex items-center gap-2 border-t border-border p-3" @submit.prevent="send()">
      <input
        v-model="input"
        type="text"
        :placeholder="t('prototypes.ai.placeholder')"
        class="flex-1 rounded-full border border-border px-4 py-2 text-sm text-ink outline-none focus:border-brand-start/40"
      />
      <button
        type="submit"
        class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white transition-transform hover:scale-105"
        :aria-label="t('prototypes.ai.send')"
      >
        <Icon name="lucide:send" class="h-4 w-4" />
      </button>
    </form>
  </div>
</template>
