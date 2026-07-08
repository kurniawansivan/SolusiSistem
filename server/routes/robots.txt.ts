export default defineEventHandler((event) => {
  const site = useRuntimeConfig().public.siteUrl
  setHeader(event, 'Content-Type', 'text/plain')
  return `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`
})
