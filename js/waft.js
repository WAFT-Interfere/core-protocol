/**
 * WAFT — 共通スクリプト
 * 対境界線広域干渉及び超領域的表現開発機構
 */

(function () {
  'use strict';

  // ─── カスタムカーソル ───
  const cursor = document.createElement('div');
  cursor.id = 'waft-cursor';
  document.body.appendChild(cursor);

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener('mouseenter', () => { cursor.style.opacity = '0.5'; });
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ─── 干渉ライン ───
  const line = document.createElement('div');
  line.className = 'interference-line';
  document.body.appendChild(line);

  function triggerInterference() {
    line.style.animationPlayState = 'running';
    line.style.opacity = '1';
    setTimeout(() => {
      line.style.animationPlayState = 'paused';
      line.style.opacity = '0';
    }, 4000);
    // 次回：ランダムな間隔（30〜90秒）
    setTimeout(triggerInterference, 30000 + Math.random() * 60000);
  }
  setTimeout(triggerInterference, 8000 + Math.random() * 20000);

  // ─── 伏字の解除 ───
  document.querySelectorAll('.redacted').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('revealed'));
  });

  // ─── フェードインオブザーバー ───
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.animationDelay = (i * 0.08) + 's';
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // ─── ナビゲーション：現在ページのハイライト ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ─── ページ遷移フェード ───
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || a.target === '_blank') return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.4s';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 400);
    });
  });

  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.6s';
    document.body.style.opacity = '1';
  });

  // ─── コンソールへのメッセージ ───
  const msg = [
    '%c対境界線広域干渉及び超領域的表現開発機構',
    'color: #0000FF; font-family: monospace; font-size: 11px;'
  ];
  const msg2 = [
    '%cWAFT / OBSERVER TERMINAL ACTIVE\n> 観測者を認識しました。あなたの閲覧は記録されます。',
    'color: #555; font-family: monospace; font-size: 10px;'
  ];
  console.log(...msg);
  console.log(...msg2);

})();

  // ─── ハンバーガーメニュー ───
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      // メニュー開放中はスクロール禁止
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // リンククリックでメニューを閉じる
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
