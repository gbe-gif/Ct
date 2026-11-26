import { readFileSync } from 'node:fs'

export const localePaths = { ko: '', en: 'en/', ja: 'ja/' }

const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const dictionaries = Object.fromEntries(Object.entries({ en: 'english', ja: 'japanese' }).map(([locale, file]) => {
  const messages = JSON.parse(readFileSync(new URL(`./${file}.json`, import.meta.url), 'utf8'))
  const phrases = Object.keys(messages).sort((a, b) => b.length - a.length)
  return [locale, { messages, pattern: new RegExp(phrases.map(escapePattern).join('|'), 'g') }]
}))

function translate(text, locale) {
  const { messages, pattern } = dictionaries[locale]
  // Spouse identities are assembled from individual fields in the Markdown notes.
  const japanese = locale === 'ja'
  const normalized = text
    .replace(/(\d+)세 남성·([^·]+) 국적·([^·]+)·\(페소 이름\)의 배우자/g,
      japanese ? '$1歳・男性・$2国籍・$3・（ペルソナ名）の配偶者'
        : '$1 years old · Male · $2 · $3 · Spouse of (persona name)')
    .replace(/(\d+)세/g, japanese ? '$1歳' : '$1 years old')
  const result = normalized.replace(pattern, key => messages[key])
  if (/[가-힣]/.test(result)) throw new Error(`Missing ${locale} translation: ${text.trim()}`)
  return japanese ? result.replace(/([\p{Script=Han}\p{Script=Katakana}\p{Script=Hiragana}])\.(?=\s*$)/u, '$1。') : result
}

export function localizePage(html, locale) {
  if (locale === 'ko') return html
  // Translate text and reader-facing attributes; preserve URLs, IDs and asset paths.
  return html.replace(/<[^>]+>|[^<]+/g, part => {
    if (!part.startsWith('<')) return translate(part, locale)
    return part.replace(/(alt|aria-label|content)="([^"]*)"/g,
      (_, attr, value) => `${attr}="${translate(value, locale)}"`)
  })
}

export function languageSwitch(base, slug, locale) {
  const link = (lang, label) =>
    `<a href="${base}${localePaths[lang]}${slug}" lang="${lang}" hreflang="${lang}"${lang === locale ? ' aria-current="true"' : ''}>${label}</a>`
  const label = { ko: '언어', en: 'Language', ja: '言語' }[locale]
  return `<div class="languages" role="group" aria-label="${label}">
    ${link('ko', 'Kor')}${link('en', 'Eng')}${link('ja', 'Jp')}
  </div>`
}
