const gallery = document.querySelector('.gallery')

gallery.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) event.target.hidden = true
}, true)

for (const image of gallery.querySelectorAll('img')) {
  if (image.complete && image.naturalWidth === 0) image.hidden = true
}

const passwordDialog = document.querySelector('#gallery-password')

if (passwordDialog) {
  // This gate controls the gallery UI. The R2 images are public.
  const expectedHash = 'e7c805d294c001c891a7b15705592c7dab19a0dbfc537f19f589459afef80e69'
  const openButton = document.querySelector('#open-gallery-password')
  const input = passwordDialog.querySelector('input')
  const status = passwordDialog.querySelector('[role="status"]')
  const form = passwordDialog.querySelector('form')
  const open = () => passwordDialog.showModal()

  openButton.addEventListener('click', open)
  passwordDialog.querySelector('[data-close-gallery-password]').addEventListener('click', () => passwordDialog.close())
  form.addEventListener('submit', async event => {
    event.preventDefault()
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.value.trim()))
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
    if (!passwordDialog.open) return
    if (hash !== expectedHash) {
      status.textContent = document.documentElement.lang === 'en'
        ? 'That password does not match. Please try again.'
        : '비밀번호가 일치하지 않아요. 다시 입력해주세요.'
      input.focus()
      input.select()
      return
    }

    const template = document.querySelector('#unsafe-gallery-template')
    const images = document.querySelector('#unsafe-images')
    images.replaceChildren(template.content.cloneNode(true))
    passwordDialog.close()
    form.reset()
    openButton.hidden = true
    images.querySelector('a').focus()
  })

  const room = document.querySelector('dialog[aria-labelledby="room-name"]')
  if (room.open) room.addEventListener('close', open, { once: true })
  else open()
}
