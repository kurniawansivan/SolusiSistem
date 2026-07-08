// One-off asset generator: rasterizes public/logo.svg and public/og-image.svg to PNG.
// Re-run with `node scripts/generate-icons.mjs` whenever the logo changes.
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')

const logoSvg = readFileSync(resolve(publicDir, 'logo.svg'))
const ogSvg = readFileSync(resolve(publicDir, 'og-image.svg'))

await sharp(logoSvg, { density: 384 }).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png'))
await sharp(logoSvg, { density: 384 }).resize(512, 512).png().toFile(resolve(publicDir, 'icon-512.png'))
await sharp(logoSvg, { density: 384 }).resize(32, 32).png().toFile(resolve(publicDir, 'favicon-32x32.png'))
await sharp(ogSvg).resize(1200, 630).png().toFile(resolve(publicDir, 'og-image.png'))

console.log('Icons generated: apple-touch-icon.png, icon-512.png, favicon-32x32.png, og-image.png')
