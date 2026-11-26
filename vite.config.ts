import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import type { Plugin } from 'vite'
import { existsSync, readdirSync } from 'node:fs'

// GitHub Pages sends no CORS headers; a `crossorigin` script tag is then
// blocked by strict webviews (Telegram iOS) => blank page. Strip it.
function stripCrossorigin(): Plugin {
  return {
    name: 'strip-crossorigin',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(/ crossorigin(="[^"]*")?/g, '')
      },
    },
  }
}

// base must match the GitHub repo name exactly: served from
// https://muhammad-kandil.github.io/toki-quest/
export default defineConfig({
  base: '/toki-quest/',
  plugins: [
    react(),
    // Transpile + polyfill for older iOS Safari / Telegram's iOS webview,
    // which blank-screened on modern JS syntax (??= etc.) shipped by deps.
    legacy({
      targets: ['defaults', 'ios >= 12', 'safari >= 12'],
    }),
    stripCrossorigin(),
  ],
  build: {
    target: 'es2015',
  },
  // Teacher game: use the painted campus only if it exists (else an SVG fallback, no 404).
  // Mission art present under public/teacher/ (missing pictures fall back, never 404).
  define: {
    __TEACHER_CAMPUS_ART__: JSON.stringify(existsSync('public/art/campus.jpg')),
    __TEACHER_ART__: JSON.stringify(listFiles('public/teacher').map((f) => f.slice('public/'.length))),
  },
})

function listFiles(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? listFiles(`${dir}/${d.name}`) : [`${dir}/${d.name}`],
  )
}
