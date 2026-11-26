const profiles = [
  {
    id: 'iyeon',
    name: '이연',
    badges: ['32세', '여성', '168cm', 'ESTJ'],
    facts: [
      '세무사이자 차우혁의 배우자.',
      '긴 검은 머리와 검은 눈, 볼륨감 있는 체형.',
      '우혁과의 생활을 답답하게 느끼며, 우혁 몰래 재우를 만나는 중.',
    ],
  },
  {
    id: 'jaeu',
    name: '재우',
    badges: ['26세', '남성', '188cm'],
    facts: [
      '금발과 검은 눈, 햇볕에 그을린 피부의 헬스 트레이너.',
      '상황을 복잡하게 따지기보다 이연이 부르는 대로 곁을 따라다니는 편.',
    ],
  },
  {
    id: 'jiyu',
    name: '지유',
    badges: ['30세', '여성', '165cm', 'ESFP'],
    facts: [
      '박해겸의 배우자로, 집안일을 전담.',
      '갈색 머리와 갈색 눈.',
    ],
    safe: '새로운 상대를 찾으려고 만남 앱을 끊임없이 들여다보는 편.',
    adult: '하룻밤으로 끝나는 만남을 반복하며 쉽게 끊지 못함.',
  },
  {
    id: 'duhyeon',
    name: '두현',
    badges: ['33세', '남성', '178cm', 'ENFJ'],
    facts: [
      '백발과 금빛 눈의 작곡가 겸 프로듀서.',
      '태오와 비밀리에 사실혼 관계를 이어 왔으나, 부모의 결혼 압박을 받자 예설에게 접근.',
    ],
  },
  {
    id: 'yeseol',
    name: '예설',
    badges: ['25세', '여성', '165cm'],
    facts: [
      '분홍색 머리와 푸른 눈, 가느다란 체형의 전직 아이돌.',
      '첫 활동이 성과를 거두지 못한 뒤 다시 무대에 오를 기회를 찾다가 두현의 유혹에 넘어감.',
    ],
  },
  {
    id: 'jeongwon',
    name: '정원',
    badges: ['34세', '여성', '172cm', 'ISTJ'],
    facts: [
      '정리정돈 상담사 겸 유튜버. 짧은 검은 머리와 초록색 눈, 가느다란 체형.',
      '임신 전 일을 마음에 걸려 하며, 이후 헨릭을 한층 더 살뜰하게 챙기는 중.',
    ],
    safe: '임신 전 지방에서 열린 동창회에 갔다가 술김에 첫사랑이었던 선배와 하룻밤을 보냄.',
    adult: '임신 전 친구의 결혼 전 파티에 몰래 참석. 그날 밤을 함께 보낸 남성들과 지금도 연락을 이어가는 중.',
    spoiler: '로하는 헨릭의 친자가 아님. 헨릭에게 보여 줄 가짜 친자 검사 결과지를 이미 마련함.',
  },
  {
    id: 'roha',
    name: '로하',
    badges: ['생후 11개월', '남성'],
    facts: [
      '정원의 아들. 검은 머리와 검은 눈, 까무잡잡한 피부.',
      '주변에 호기심이 많아 손에 잡히는 물건을 입으로 가져가는 시기. 짧은 소리를 겨우 옹알이하는 단계.',
    ],
  },
]

export function renderSupport(list) {
  const index = profiles.map(({ id, name }) => `<a href="#${id}">${name}</a>`).join('')
  const cards = profiles.map(({ id, name, badges, facts, safe, adult, spoiler, image }) => `
    <article class="profile support-profile" id="${id}" aria-labelledby="${id}-name">
      <div class="profile-identity">
        ${image
          ? `<img class="profile-portrait" src="${image}" alt="${name} 프로필" width="400" height="400" loading="lazy">`
          : '<div class="profile-portrait profile-placeholder">프로필 사진 준비 중</div>'}
        <h2 id="${id}-name">${name}</h2>
        <ul class="profile-badges" aria-label="기본 정보">${badges.map(badge => `<li>${badge}</li>`).join('')}</ul>
      </div>
      <div class="profile-details">
        ${list(...facts)}
        ${safe ? `<div class="profile-relationship">
          <h3><span class="profile-rating">세이프</span> 버전 설정</h3>
          ${list(safe)}
          <details class="profile-adult">
            <summary><span class="profile-rating">19+ 언세이프</span> 버전 설정</summary>
            ${list(adult)}
          </details>
        </div>` : ''}
        ${spoiler ? `<details class="profile-adult profile-spoiler">
          <summary><span class="profile-rating">스포일러</span> 정원의 비밀</summary>
          ${list(spoiler)}
        </details>` : ''}
      </div>
    </article>`).join('')
  return `<h1 class="profile-title">조연</h1><div class="profile-index" role="navigation" aria-label="인물 바로가기">${index}</div>${cards}`
}
