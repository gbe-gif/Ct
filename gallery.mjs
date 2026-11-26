const leads = [
  ['woohyeok', '우혁', 'C'],
  ['haegyeom', '해겸', 'P'],
  ['taeo', '태오', 'H'],
  ['henrik', '헨릭', 'K'],
]

const support = ['이연', '재우', '지유', '두현', '예설', '정원', '로하']

function image(name, code, number) {
  return `<img src="https://gbe88.uk/Ct/${code}_${number}.webp" alt="${name} 수록 이미지" loading="lazy" decoding="async">`
}

export function renderGallery() {
  const index = leads.map(([id, name]) => `<a href="#gallery-${id}">${name}</a>`).join('')
  const leadSections = leads.map(([id, name, code]) => `
    <section id="gallery-${id}">
      <h2>${name}</h2>
      <div class="gallery-grid">
        ${Array.from({ length: 9 }, (_, index) => image(name, code, index + 1)).join('')}
      </div>
      <p class="gallery-empty">이미지 준비 중.</p>
    </section>`).join('')

  return `<div class="gallery">
    <h1 class="profile-title">수록 이미지</h1>
    <div class="profile-index" aria-label="인물별 이미지">${index}<a href="#gallery-support">조연</a></div>
    ${leadSections}
    <section id="gallery-support">
      <h2>조연</h2>
      <div class="gallery-grid">
        ${support.map((name, index) => `<figure>${image(name, 'S', index + 18)}<figcaption>${name}</figcaption></figure>`).join('')}
      </div>
      <p class="gallery-empty">이미지 준비 중.</p>
    </section>
  </div>`
}
