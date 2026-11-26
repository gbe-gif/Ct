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

export function renderGallery(base, unsafe = false) {
  const first = unsafe ? 10 : 1
  const count = unsafe ? 8 : 9
  const index = leads.map(([id, name]) => `<a href="#gallery-${id}">${name}</a>`).join('')
  const leadSections = leads.map(([id, name, code]) => `
    <section id="gallery-${id}">
      <h2>${name}</h2>
      <div class="gallery-grid">
        ${Array.from({ length: count }, (_, index) => image(name, code, first + index)).join('')}
      </div>
      <p class="gallery-empty">이미지 준비 중.</p>
    </section>`).join('')

  if (unsafe) {
    return `<div class="gallery">
      <h1 class="profile-title">언세이프 수록 이미지</h1>
      <div class="profile-index"><a href="${base}gallery/">수록 이미지로 돌아가기</a></div>
      <button type="button" class="spouse-action" id="open-gallery-password" aria-haspopup="dialog">비밀번호 입력</button>
      <div id="unsafe-images"></div>
      <template id="unsafe-gallery-template">
        <div class="profile-index" aria-label="인물별 이미지">${index}</div>
        ${leadSections}
      </template>
      <dialog id="gallery-password" aria-labelledby="gallery-password-title">
        <form>
          <h2 id="gallery-password-title">언세이프 수록 이미지</h2>
          <label for="gallery-password-input">언세이프 버전 상세정보에 기재된 비밀번호를 입력해주세요</label>
          <input id="gallery-password-input" type="text" required autocomplete="off" autocapitalize="none" spellcheck="false" autofocus>
          <p role="status"></p>
          <div class="gallery-password-actions">
            <button type="submit" class="spouse-action">확인</button>
            <button type="button" class="spouse-action" data-close-gallery-password>닫기</button>
          </div>
        </form>
      </dialog>
    </div>`
  }

  return `<div class="gallery">
    <h1 class="profile-title">수록 이미지</h1>
    <a class="gallery-unsafe-link" href="${base}gallery/unsafe/">언세이프 수록 이미지</a>
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
