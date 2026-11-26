import { mkdir, copyFile, cp, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { renderLeads } from './leads.mjs'
import { renderSupport } from './support.mjs'

const segments = (process.env.BASE_PATH || '').split('/').filter(Boolean).map(decodeURIComponent)
if (segments.some(s => !/^[\p{L}\p{N}_-]+$/u.test(s))) throw Error('BASE_PATH에는 문자, 숫자, 밑줄, 하이픈만 사용해 주세요.')
const base = '/' + segments.map(encodeURIComponent).join('/') + (segments.length ? '/' : '')
const origin = process.env.SITE_ORIGIN || (process.env.VERCEL_URL && 'https://' + process.env.VERCEL_URL)
if (origin && !/^https?:\/\/[\w.-]+(:\d+)?\/?$/.test(origin)) throw Error('SITE_ORIGIN에는 경로 없는 도메인 주소를 입력해 주세요.')
const pages = [['','세계관','◎'],['leads/','주연 캐릭터','♙'],['support/','조연','♧'],['gallery/','수록 이미지','▧']]
const list = (...items) => '<ul>'+items.map(s=>'<li>'+s+'</li>').join('')+'</ul>'
const section = (title, content) => '<section><h2>'+title+'</h2>'+content+'</section>'
const shared = '<div class="label">차밍고구마 &nbsp;/&nbsp; 동네 소모임</div>'
const hero = `<div class="hero"><div>${shared}<h1>승리 전략<br><em>공부해요.</em></h1>${list('동네 재테크 스터디라는 이름 아래 모인 배우자 외도 피해자들.')}</div><div class="folder" aria-hidden="true"><div class="sheet"><b>정기 모임 기록</b><i></i><i></i></div><div class="cover"><span>서초 · 소모임 자료철</span><strong>승전공</strong><small>개설일 &nbsp; 2026.11.01</small></div></div></div>`
const world = hero + '<div class="columns"><div>' +
section('소모임의 속사정', list('2026년 11월 1일, 우혁이 차밍고구마에 개설한 재테크 공부 모임.', '해겸, 태오, 헨릭, 그리고 당신이 모여 이혼에 대비하는 자리.', '배우자나 전 연인에게 관계 파탄의 책임이 있음을 뒷받침할 자료 수집.', '재산분할에서 자기 몫을 지키고 금전 손실을 줄이면서 충분한 위자료를 받는 것이 공동의 목표.')) +
section('차밍고구마',list('사는 동네를 기준으로 이웃과 중고 물건을 거래하고 생활 정보를 나누는 지역 플랫폼.', '필요한 생활 서비스를 맡길 전문가를 찾고, 개업한 전문가는 동네에 이름을 알리는 곳.', '관심사가 맞는 이웃끼리 소모임을 꾸리는 공간.', '이용 매너를 당도(°Bx)로 나타내며, 밤고구마·호박고구마·꿀고구마 등의 칭호를 사용.')) + '</div><aside>' +
section('정기 모임','<div class="meeting">일요일 <b>10:00</b></div>'+list('매주 서초 공유오피스 801호에서 집합.', '가져온 증거를 서류로 정리하고 우혁에게 법률 자문을 받는 시간.')) +
section('주중 번개',list('시간이 맞는 회원들이 주중에 모이는 비정기 만남으로, 보통 한두 차례 진행.', '제안자의 기분에 따라 도심 나들이, 체험, 오락, 운동 중 활동을 선택.', '서로의 근황을 듣고 쌓인 스트레스를 푸는 자리.'))+'</aside></div>'
await rm('dist',{recursive:true,force:true})
const dest = path.join('dist',...segments)
await mkdir(dest,{recursive:true})
await copyFile('style.css',path.join(dest,'style.css'))
await copyFile('chat.js',path.join(dest,'chat.js'))
await cp('fonts',path.join(dest,'fonts'),{recursive:true})
const bodies = {
  '': world,
  'leads/': shared + renderLeads(list),
  'support/': shared + renderSupport(list),
  'gallery/': shared + '<h1>수록 이미지</h1>' + section('공개 예정', list('수록 이미지 공개 준비 중.')),
}
for (const [slug,title] of pages) {
  const url = origin && new URL(base+slug,origin).href
  const name = title+' · 승전공'
  const body = bodies[slug]
  const nav = pages.map(([s,t,icon])=>`<a href="${base+s}" ${slug===s?'aria-current="page"':''}><span aria-hidden="true">${icon}</span>${t}</a>`).join('')
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${name}</title><meta name="description" content="차밍고구마의 재테크 소모임 승전공. 일요일 오전 열 시, 서초 801호에서 만나는 사람들의 이야기."><meta property="og:type" content="website"><meta property="og:title" content="${name}">${url?`<link rel="canonical" href="${url}"><meta property="og:url" content="${url}">`:''}<link rel="stylesheet" href="${base}style.css"></head><body><header><a href="${base}"><b>승전공</b><span>소모임 기록실</span></a><small>서울 · 서초</small></header><main>${body}</main><nav aria-label="페이지 이동">${nav}</nav></body></html>`
  const dir = path.join(dest,slug)
  await mkdir(dir,{recursive:true})
  const chat = `<dialog aria-labelledby="room-name"><div class="room">
    <div class="room-head"><span class="seed" aria-hidden="true"></span><div><small>차밍고구마 · 서초 생활권</small><h2 id="room-name">승리 전략 공부해요</h2></div><span class="members">5명</span></div>
    <div class="messages" role="log" aria-live="polite"><div class="room-date">11월 26일 목요일</div>
      <small>이혼소송전문 · 방장</small><time datetime="2026-11-26T20:47:00+09:00">20:47</time>
      <p>다들 오셨네요. 일요일 열 시, 서초 공유오피스 801호에서 뵙죠.</p>
      <p>자, 이제 본격적으로 반격해 볼까요?</p>
    </div>
    <form><label for="draft">당신의 메시지</label><div class="composer"><output id="draft">네. 저도 준비됐어요.</output><button type="submit">전송</button></div></form>
  </div></dialog>`
  await writeFile(path.join(dir,'index.html'),html.replace('</body>',chat+`<script src="${base}chat.js" defer></script></body>`))
}
