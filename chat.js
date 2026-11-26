const room = document.querySelector('dialog[aria-labelledby="room-name"]')
const sessionKey = 'seungjeongong:entered:' + new URL('.', document.currentScript.src).pathname
let entered = false
try { entered = sessionStorage.getItem(sessionKey) === 'yes' } catch {}

if (!entered && typeof room.showModal === 'function') {
  room.showModal()
  const enter = () => {
    try { sessionStorage.setItem(sessionKey, 'yes') } catch {}
    room.close()
    const heading = document.querySelector('h1')
    heading.tabIndex = -1
    heading.focus({ preventScroll: true })
  }
  room.addEventListener('cancel', event => {
    event.preventDefault()
    enter()
  })
  room.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    const button = room.querySelector('button[type="submit"]')
    if (button.disabled) return
    button.disabled = true
    const bubble = document.createElement('p')
    bubble.className = 'sent'
    bubble.textContent = document.querySelector('#draft').textContent
    room.querySelector('.messages').append(bubble)
    button.textContent = document.documentElement.lang === 'en' ? 'Sent' : '전송됨'
    setTimeout(() => { if (room.open) enter() }, 550)
  })
}
