import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Directive } from 'vue'

let registered = false

function ensureScrollTrigger() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

interface RevealOptions {
  delay?: number
  y?: number
  x?: number
}

/**
 * v-reveal: fades + slides an element in once it scrolls into view.
 * Pair with the `.reveal` CSS class (sets initial opacity: 0) to avoid a flash of visible content.
 */
export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (import.meta.server) return
    ensureScrollTrigger()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 })
      return
    }

    const opts = binding.value ?? {}
    gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 28, x: opts.x ?? 0 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.8,
        delay: opts.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  },
}
