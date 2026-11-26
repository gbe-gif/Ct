const spouseDialog = document.querySelector('#spouse-dialog')
document.querySelector('#open-spouses').addEventListener('click', () => spouseDialog.showModal())

spouseDialog.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy-spouse]')
  if (!button) return
  const card = button.closest('details')
  const note = card.querySelector('textarea')
  const status = card.querySelector('[role="status"]')
  const language = document.documentElement.lang
  try {
    await navigator.clipboard.writeText(note.value)
    status.textContent = {
      ko: '복사했어요. 유저노트에 붙여 넣으세요.',
      en: 'Copied. Paste the profile into your user notes.',
      ja: 'コピーしました。ユーザーノートに貼り付けてください。',
    }[language]
    note.hidden = true
  } catch {
    status.textContent = {
      ko: '아래 마크다운을 직접 복사하세요.',
      en: 'Copy the Markdown below.',
      ja: '下のMarkdownを手動でコピーしてください。',
    }[language]
    note.hidden = false
    note.focus()
    note.select()
  }
})
