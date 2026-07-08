import { vReveal } from '~/composables/useScrollReveal'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', vReveal)
})
