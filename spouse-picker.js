const spouseDialog = document.querySelector('#spouse-dialog')
document.querySelector('#open-spouses').addEventListener('click', () => spouseDialog.showModal())

spouseDialog.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy-spouse]')
  if (!button) return
  const card = button.closest('details')
  const note = card.querySelector('textarea')
  const status = card.querySelector('[role="status"]')
  const english = document.documentElement.lang === 'en'
  try {
    await navigator.clipboard.writeText(note.value)
    status.textContent = english ? 'Copied. Paste the profile into your user notes.' : '복사했어요. 유저노트에 붙여 넣으세요.'
    note.hidden = true
  } catch {
    status.textContent = english ? 'Copy the Markdown below.' : '아래 마크다운을 직접 복사하세요.'
    note.hidden = false
    note.focus()
    note.select()
  }
})
