import { readFileSync } from 'node:fs'

const messages = JSON.parse(readFileSync(new URL('./english.json', import.meta.url), 'utf8'))
const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const phrases = Object.keys(messages).sort((a, b) => b.length - a.length)
const pattern = new RegExp(phrases.map(escapePattern).join('|'), 'g')

function translate(text) {
  // Spouse identities are assembled from individual fields in the Markdown notes.
  const normalized = text
    .replace(/(\d+)세 남성·([^·]+) 국적·([^·]+)·\(페소 이름\)의 배우자/g,
      '$1 years old · Male · $2 · $3 · Spouse of (persona name)')
    .replace(/(\d+)세/g, '$1 years old')
  const result = normalized.replace(pattern, key => messages[key])
  if (/[가-힣]/.test(result)) throw new Error('Missing English translation: ' + text.trim())
  return result
}

export function englishPage(html) {
  // Translate text and reader-facing attributes; preserve URLs, IDs and asset paths.
  return html.replace(/<[^>]+>|[^<]+/g, part => {
    if (!part.startsWith('<')) return translate(part)
    return part.replace(/(alt|aria-label|content)="([^"]*)"/g,
      (_, attr, value) => `${attr}="${translate(value)}"`)
  })
}

export function languageSwitch(base, slug, locale) {
  const link = (lang, label, prefix) =>
    `<a href="${base}${prefix}${slug}" lang="${lang}" hreflang="${lang}"${lang === locale ? ' aria-current="true"' : ''}>${label}</a>`
  return `<div class="languages" role="group" aria-label="${locale === 'en' ? 'Language' : '언어'}">
    ${link('ko', 'Kor', '')}${link('en', 'Eng', 'en/')}<button type="button" disabled title="${locale === 'en' ? 'Japanese coming soon' : '일본어 준비 중'}">Jp</button>
  </div>`
}
