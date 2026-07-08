export function useReducedMotion() {
  const prefersReduced = ref(false)

  onMounted(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.value = query.matches
    const onChange = (e: MediaQueryListEvent) => (prefersReduced.value = e.matches)
    query.addEventListener('change', onChange)
    onUnmounted(() => query.removeEventListener('change', onChange))
  })

  return prefersReduced
}
