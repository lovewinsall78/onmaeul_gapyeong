/**
 * 온마을 랜딩페이지 — Chiara Luzzana 스타일 텍스트 부각 + 스크롤 색상 전환 패치
 * ─────────────────────────────────────────────────────────────────────────────
 * 사용법: index.html 의 </body> 바로 위에 한 줄 추가
 *   <script src="color-patch.js"></script>
 * ─────────────────────────────────────────────────────────────────────────────
 * 다른 지역으로 확장 시: sectionColors 배열만 수정
 */
(function () {

  /* ── 1. 텍스트 부각 CSS 주입 (화이트 바탕 섹션용 에디토리얼 스타일) ── */
  var style = document.createElement('style');
  style.textContent = [

    /* body 전환 — 배경/글자색 모두 smooth */
    'body { transition: background 0.85s cubic-bezier(.25,.46,.45,.94), color 0.85s cubic-bezier(.25,.46,.45,.94); }',

    /* ── 히어로 오버레이 밝기 조정 ── */
    /* 기존: 상단 60% / 중간 25% / 하단 65% → 영상 더 잘 보이도록 완화 */
    '.hero-bg::after {',
    '  background:',
    '    linear-gradient(180deg,',
    '      rgba(10,9,8,0.38) 0%,',
    '      rgba(10,9,8,0.10) 38%,',
    '      rgba(10,9,8,0.48) 100%),',
    '    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(74,82,64,0.12) 0%, transparent 60%)',
    '  !important;',
    '}',

    /* ── 라이트 섹션 헤더 강조 ── */
    /* sec-eyebrow: 더 선명하게 */
    '.exp-section .sec-eyebrow { color: #0A0908; opacity: 1; letter-spacing: 5px; font-weight: 500; }',

    /* sec-title: 더 크고 무게감 있게 */
    '.exp-section .sec-title { color: #0A0908; font-size: clamp(34px,5vw,58px); letter-spacing: -0.025em; font-weight: 300; }',

    /* sec-sub: 선명한 다크 */
    '.exp-section .sec-sub { color: #3A3530; line-height: 2.1; }',

    /* 카테고리 탭 레이블 — 더 두껍게 */
    '.cat-tab-label { font-weight: 700; text-shadow: 0 2px 12px rgba(0,0,0,0.55); }',

    /* ── access-section: 크림 배경 위 다크 텍스트 ── */
    '.access-section .sec-eyebrow { color: #B8965A; opacity: 1; letter-spacing: 5px; }',
    '.access-section h2.sec-title { color: #0A0908; }',
    '.access-section .access-value { color: #3A3530; line-height: 1.95; }',
    '.access-section .access-label { color: #B8965A; letter-spacing: 4.5px; }',

    /* ── slogan: 크림 배경 + 크고 여백 넓게 ── */
    '.slogan-section { padding: 180px 48px; }',
    '.slogan-kr { color: #0A0908; font-size: clamp(30px,5.5vw,60px); letter-spacing: 0.04em; line-height: 1.7; }',
    '.slogan-kr span { color: #8A6A2A; }',
    '.slogan-en { color: rgba(10,9,8,0.35); }',
    '.slogan-sub { color: rgba(10,9,8,0.25); }',
    '.slogan-divider { background: #B8965A; }',

    /* ── 섹션 구분선 강조 ── */
    '.exp-section .section-label::after { background: linear-gradient(90deg,#0A0908,transparent); opacity:0.18; }',

    /* ── 모바일 ── */
    '@media (max-width:640px) {',
    '  .slogan-section { padding: 80px 20px; }',
    '}',

  ].join('\n');
  document.head.appendChild(style);


  /* ── 2. 섹션별 색상 매핑 ── */
  /* Chiara Luzzana 레퍼런스: 거의-흰 크림 #EDEDEA / 진한 검정 #0A0908 */
  var sectionColors = [
    {
      selector : '.hero',
      bg       : '#0A0908',   /* 유튜브 영상 뒤 — 거의 검정 */
      color    : '#FAF7F2',
    },
    {
      selector : '.exp-section',
      bg       : '#EDECEA',   /* Chiara Luzzana 바탕색 — 밝은 크림 화이트 */
      color    : '#0A0908',   /* 선명한 검정 — 텍스트 최대 부각 */
    },
    {
      selector : '.access-section',
      bg       : '#F0EBE0',   /* 따뜻한 리넨 크림 — 오시는 길 */
      color    : '#0A0908',
    },
    {
      selector : '#slogan-section',
      bg       : '#E8E4DC',   /* 미디엄 웜 크림 — 슬로건 */
      color    : '#0A0908',
    },
  ];


  /* ── 3. 각 섹션에 data-bg / data-color 속성 부여 ── */
  sectionColors.forEach(function (item) {
    var el = document.querySelector(item.selector);
    if (el) {
      el.dataset.bg    = item.bg;
      el.dataset.color = item.color;
    }
  });


  /* ── 4. IntersectionObserver — 스크롤 위치 감지 후 색상 전환 ── */
  var targets = document.querySelectorAll('[data-bg]');
  var nav     = document.getElementById('topnav');
  var TRANS   = 'background 0.85s cubic-bezier(.25,.46,.45,.94), color 0.85s cubic-bezier(.25,.46,.45,.94)';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var bg    = entry.target.dataset.bg;
      var color = entry.target.dataset.color;
      document.body.style.background = bg;
      document.body.style.color      = color;
      if (nav) {
        nav.style.color      = color;
        nav.style.transition = TRANS;
      }
    });
  }, { threshold: 0.45 });

  targets.forEach(function (el) { observer.observe(el); });

  console.log('[온마을 color-patch] 텍스트 부각 + 색상 전환 활성화 — 섹션 수:', targets.length);

})();
