/* ============================================================
   CATHARSIS INTERNATIONAL — SHARED JAVASCRIPT
   ============================================================ */

/* ---------- NAV ---------- */
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim  = document.getElementById('scrim');
  const prog   = document.getElementById('progress');

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
    if (burger) {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  }

  if (burger) {
    burger.addEventListener('click', () => {
      const open = !drawer.classList.contains('open');
      if (drawer) drawer.classList.toggle('open', open);
      if (scrim) scrim.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }
  if (scrim) scrim.addEventListener('click', closeDrawer);
  if (drawer) drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setTimeout(closeDrawer, 60)));

  /* scroll → nav bg + progress bar */
  function onScroll() {
    const y = window.scrollY;
    const navEl = document.getElementById('nav');
    const headerWrapper = document.getElementById('global-header');
    if (navEl) navEl.classList.toggle('scrolled', y > 40);
    if (headerWrapper) headerWrapper.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active link highlight */
  const fullUri = location.pathname.toLowerCase();
  const isDocPage = fullUri.includes('document');
  const isSectorPage = fullUri.includes('sector') || fullUri.includes('job') || fullUri.includes('oil-gas') || fullUri.includes('construction') || fullUri.includes('hospitality') || fullUri.includes('plantation') || fullUri.includes('facility') || fullUri.includes('electro');
  const isProcessPage = fullUri.includes('process');
  const isRecruitmentGroup = isDocPage || isSectorPage || isProcessPage || fullUri.includes('recruitment');

  document.querySelectorAll('.nav__link, .drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const isRecLink = href.includes('recruitment') || href.includes('documents') || href.includes('job-sectors');
    if (isRecLink && isRecruitmentGroup && a.classList.contains('nav__link')) {
      a.classList.add('active');
    }
  });
})();

/* ---------- CUSTOM CURSOR (DISABLED AS REQUESTED) ---------- */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
})();

/* ---------- REVEAL ON SCROLL ---------- */
(function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ---------- 3D CARD TILT (DISABLED MOUSE TRACKING) ---------- */
(function initTilt() {
  // Mouse tracking tilt disabled
})();

/* ---------- COUNT-UP ---------- */
(function initCounters() {
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      if (!target) return;
      const dur = 1500, t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
})();

/* ---------- 3D CARD TILT ---------- */
(function initTilt() {
  if (!matchMedia('(pointer:fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `perspective(1000px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ---------- SECTOR FILTERS ---------- */
(function initFilters() {
  const grid = document.getElementById('sector-grid');
  if (!grid) return;
  document.querySelectorAll('.filter').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const k = f.dataset.filter;
      grid.querySelectorAll('.sector-detail-card, .sector').forEach(s => {
        s.classList.toggle('sector--hide', k !== 'all' && s.dataset.kind !== k);
      });
    });
  });
})();

/* ---------- SECTOR RAIL ---------- */
(function initRail() {
  const rail = document.getElementById('rail');
  if (!rail) return;
  document.querySelectorAll('[data-rail]').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = (rail.querySelector('.sector')?.offsetWidth || 340) + 22;
      rail.scrollBy({ left: btn.dataset.rail === 'next' ? step : -step, behavior: 'smooth' });
    });
  });
  let down = false, startX = 0, startL = 0;
  rail.addEventListener('pointerdown', e => { down = true; startX = e.clientX; startL = rail.scrollLeft; rail.classList.add('dragging'); });
  addEventListener('pointerup', () => { down = false; rail.classList.remove('dragging'); });
  rail.addEventListener('pointermove', e => { if (down) rail.scrollLeft = startL - (e.clientX - startX); });
})();

/* ---------- CONTACT FORM ---------- */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const name  = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const msg   = form.elements['message']?.value.trim();
    if (!name || !email || !msg) {
      status.textContent = 'Please fill in your name, email and message.';
      status.style.color = '#C0392B';
      status.classList.add('show');
      return;
    }
    const subject = encodeURIComponent(`Enquiry from ${name} — Catharsis International`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${form.elements['type']?.value}\n\nMessage:\n${msg}`);
    window.location.href = `mailto:info@catharsisintl.com?subject=${subject}&body=${body}`;
    status.textContent = '✓ Opening your email client. You can also reach us at info@catharsisintl.com';
    status.style.color = 'var(--blue)';
    status.classList.add('show');
  });
})();

/* ---------- SINGLE CERTIFICATE CAROUSEL CONTROLS ---------- */
(function initCertCarousels() {
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const trackId = btn.dataset.carousel;
      const track = document.getElementById(trackId);
      if (!track) return;
      const dir = parseInt(btn.dataset.dir, 10);
      const slides = track.querySelectorAll('.single-cert-slide');
      const total = slides.length;
      if (!total) return;

      let currentIdx = parseInt(track.dataset.index || '0', 10);
      currentIdx = (currentIdx + dir + total) % total;
      track.dataset.index = String(currentIdx);
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
    });
  });
})();

/* ---------- FOOTER YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- GLOBAL LIGHTBOX POPUP MODAL ---------- */
(function initLightbox() {
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-lightbox], .iso-cert-frame-large, .single-cert-slide img, .gallery-frame-main img, .iso-zoom-btn');
    if (!trigger) return;

    const modal = document.getElementById('lightbox-modal');
    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!modal || !imgEl) return;

    e.preventDefault();
    let src = '';
    let alt = '';

    if (trigger.tagName === 'A') {
      src = trigger.getAttribute('href');
      alt = trigger.getAttribute('data-caption') || 'ISO 9001:2015 Certificate — Catharsis International';
    } else if (trigger.tagName === 'IMG') {
      src = trigger.src;
      alt = trigger.alt;
    } else {
      const img = trigger.querySelector('img');
      if (img) { src = img.src; alt = img.alt; }
    }

    if (!src) return;

    imgEl.src = src;
    if (captionEl) captionEl.textContent = alt || 'Catharsis International Document View';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    function closeLightbox() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (closeBtn) closeBtn.removeEventListener('click', closeLightbox);
      if (backdrop) backdrop.removeEventListener('click', closeLightbox);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    function onKey(evt) {
      if (evt.key === 'Escape' && modal.classList.contains('open')) {
        closeLightbox();
        document.removeEventListener('keydown', onKey);
      }
    }
    document.addEventListener('keydown', onKey);
  });
})();
