const gallery = document.querySelector('.gallery')

gallery.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) event.target.hidden = true
}, true)

for (const image of gallery.querySelectorAll('img')) {
  if (image.complete && image.naturalWidth === 0) image.hidden = true
}
