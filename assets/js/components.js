/* ============================================================
   CATHARSIS INTERNATIONAL — GLOBAL COMPONENTS LOADER
   Dynamically renders identical Header Topbar, Navigation & Footer across all pages
   ============================================================ */
(function loadGlobalComponents() {
  let currentPath = location.pathname.split('/').pop() || 'index.html';
  if (!currentPath || currentPath === '/') currentPath = 'index.html';
  if (!currentPath.includes('.')) currentPath += '.html';

  let pathSegments = location.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && (pathSegments[pathSegments.length - 1].includes('.') || pathSegments[pathSegments.length - 1] === currentPath.replace('.html', ''))) {
    pathSegments.pop();
  }
  let basePath = pathSegments.length > 0 ? '../'.repeat(pathSegments.length) : '';

  const fullUri = location.pathname.toLowerCase();
  const isDocPage = fullUri.includes('document');
  const isSectorPage = fullUri.includes('sector') || fullUri.includes('job') || fullUri.includes('oil-gas') || fullUri.includes('construction') || fullUri.includes('hospitality') || fullUri.includes('plantation') || fullUri.includes('facility') || fullUri.includes('electro');
  const isProcessPage = fullUri.includes('process');
  const isRecruitmentGroup = isDocPage || isSectorPage || isProcessPage || fullUri.includes('recruitment');

  const headerHTML = `
<div class="global-header-wrapper" id="global-header">
  <div class="header-topbar">
    <div class="wrap">
      <div class="topbar__info">
        <span><i class="fa-solid fa-phone"></i> +880 9612 008811 / 8815</span>
        <span><i class="fa-solid fa-envelope"></i> info@catharsisintl.com</span>
      </div>
      <div class="topbar__badges">
        <span class="topbar-tag">RL.-549</span>
        <span class="topbar-tag">ISO 9001:2015</span>
        <span class="topbar-tag">BAIRA MEMBER</span>
      </div>
    </div>
  </div>

  <header class="nav luxury-nav" id="nav" role="banner">
    <div class="nav__inner">
      <a href="${basePath}index.html" class="brand" aria-label="Catharsis International — Home">
        <img class="brand__logo" src="${basePath}images/Logo.png" alt="Catharsis International">
      </a>
      
      <nav class="nav__center" aria-label="Main navigation">
        <a class="nav__link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}" href="${basePath}index.html">Home</a>
        <a class="nav__link ${currentPath === 'about.html' ? 'active' : ''}" href="${basePath}about.html">About</a>
        <a class="nav__link ${currentPath === 'services.html' ? 'active' : ''}" href="${basePath}services.html">Services</a>
        
        <div class="nav__dropdown">
          <a class="nav__link ${isRecruitmentGroup ? 'active' : ''}" href="${basePath}recruitment-process.html">
            <span>Recruitment</span>
            <i class="fa-solid fa-chevron-down nav__dropdown-arrow"></i>
          </a>
          <div class="nav__submenu">
            <a href="${basePath}recruitment-process.html" class="nav__submenu-link ${isProcessPage || (isRecruitmentGroup && !isDocPage && !isSectorPage) ? 'active' : ''}">
              <i class="fa-solid fa-list-check"></i>
              <div>
                <b>Recruitment Process</b>
                <span>12-step worker deployment workflow</span>
              </div>
            </a>
            <a href="${basePath}recruitment-documents.html" class="nav__submenu-link ${isDocPage ? 'active' : ''}">
              <i class="fa-solid fa-folder-open"></i>
              <div>
                <b>Required Documents</b>
                <span>Country documents &amp; sample files</span>
              </div>
            </a>
            <a href="${basePath}job-sectors.html" class="nav__submenu-link ${isSectorPage ? 'active' : ''}">
              <i class="fa-solid fa-briefcase"></i>
              <div>
                <b>Job Sectors</b>
                <span>6 core manpower deployment industries</span>
              </div>
            </a>
          </div>
        </div>

        <a class="nav__link ${currentPath === 'grievance.html' ? 'active' : ''}" href="${basePath}grievance.html">Grievance</a>
      </nav>
      
      <div class="nav__right">
        <a class="nav__cta-btn" href="${basePath}contact.html">
          <span>Contact Us</span>
          <i class="fa-solid fa-arrow-right-long"></i>
        </a>
        <button class="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
</div>

<div class="scrim" id="scrim"></div>
<nav class="drawer" id="drawer" aria-label="Mobile navigation">
  <a class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}" href="${basePath}index.html">Home</a>
  <a class="${currentPath === 'about.html' ? 'active' : ''}" href="${basePath}about.html">About</a>
  <a class="${currentPath === 'services.html' ? 'active' : ''}" href="${basePath}services.html">Services</a>
  <a class="${isProcessPage || (isRecruitmentGroup && !isDocPage && !isSectorPage) ? 'active' : ''}" href="${basePath}recruitment-process.html">Recruitment Process</a>
  <a class="drawer__sublink ${isDocPage ? 'active' : ''}" href="${basePath}recruitment-documents.html"><i class="fa-solid fa-folder-open"></i> Required Documents</a>
  <a class="drawer__sublink ${isSectorPage ? 'active' : ''}" href="${basePath}job-sectors.html"><i class="fa-solid fa-briefcase"></i> Job Sectors</a>
  <a class="${currentPath === 'grievance.html' ? 'active' : ''}" href="${basePath}grievance.html">Grievance / অভিযোগ</a>
  <a class="${currentPath === 'code-of-conduct.html' ? 'active' : ''}" href="${basePath}code-of-conduct.html">Code of Conduct</a>
  <a class="${currentPath === 'contact.html' ? 'active' : ''}" href="${basePath}contact.html">Contact Us</a>
  <a href="${basePath}contact.html#grievance">Grievance / অভিযোগ</a>
  <p class="drawer__foot">ISO 9001:2015 · BAIRA · RL.-549</p>
</nav>
`;

  const footerHTML = `
<footer class="footer luxury-footer" role="contentinfo">
  <div class="wrap">
    <!-- Top Callout & License Badges Strip -->
    <div class="footer__top-strip">
      <div class="footer-brand-meta">
        <div class="footer-logo-box">
          <img class="footer-logo" src="${basePath}images/Logo.png" alt="Catharsis International">
        </div>
      </div>

      <div class="footer-cta-card">
        <div>
          <b>Need Ethical Manpower Solution?</b>
          <p>Reach our recruitment experts for transparent deployment.</p>
        </div>
        <a href="${basePath}contact.html" class="btn btn--primary btn--sm"><i class="fa-solid fa-paper-plane"></i> Contact Us</a>
      </div>
    </div>

    <!-- Main Footer Grid -->
    <div class="footer__grid">
      <!-- Col 1: About & Group Infrastructure -->
      <div class="footer__col">
        <h4>About Catharsis</h4>
        <p class="footer__tag">Pioneering ethical manpower recruitment in Bangladesh since 1997. Operating 100% transparent zero-cost migration and fully owned group infrastructure under Govt License RL.-549.</p>
        
        <div class="footer-social-box">
          <span class="social-head">Connect With Us:</span>
          <div class="social">
            <a href="https://www.facebook.com/catharsismanpower" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="mailto:info@catharsisintl.com" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
            <a href="https://wa.me/8801335143358" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="tel:+8809612008811" aria-label="Phone"><i class="fa-solid fa-phone"></i></a>
          </div>
        </div>
      </div>

      <!-- Col 2: Quick Links -->
      <div class="footer__col">
        <h4>Quick Navigation</h4>
        <ul class="footer-links">
          <li><a href="${basePath}index.html"><i class="fa-solid fa-chevron-right"></i> Home</a></li>
          <li><a href="${basePath}about.html"><i class="fa-solid fa-chevron-right"></i> About Us</a></li>
          <li><a href="${basePath}recruitment-process.html"><i class="fa-solid fa-chevron-right"></i> Recruitment Process</a></li>
          <li><a href="${basePath}job-sectors.html"><i class="fa-solid fa-chevron-right"></i> Job Sectors</a></li>
          <li><a href="${basePath}code-of-conduct.html"><i class="fa-solid fa-chevron-right"></i> Code of Conduct</a></li>
          <li><a href="${basePath}contact.html"><i class="fa-solid fa-chevron-right"></i> Contact Us</a></li>
          <li><a href="${basePath}contact.html#grievance"><i class="fa-solid fa-chevron-right"></i> Grievance Support</a></li>
        </ul>
      </div>

      <!-- Col 3: Group Infrastructure & Services -->
      <div class="footer__col">
        <h4>Group Entities</h4>
        <ul class="footer-links">
          <li><a href="services.html"><i class="fa-solid fa-check"></i> Catharsis Training Centre</a></li>
          <li><a href="services.html"><i class="fa-solid fa-check"></i> Medical Centre Ltd. (CMCL)</a></li>
          <li><a href="services.html"><i class="fa-solid fa-check"></i> Catharsis Travels Ltd.</a></li>
          <li><a href="index.html#zero-cost"><i class="fa-solid fa-check"></i> Zero Cost Migration</a></li>
          <li><a href="index.html#certifications"><i class="fa-solid fa-check"></i> RBA &amp; IOM Certifications</a></li>
        </ul>
      </div>

      <!-- Col 4: Corporate Headquarters -->
      <div class="footer__col">
        <h4>Corporate Head Office</h4>
        <ul class="footer-contact-info">
          <li>
            <i class="fa-solid fa-location-dot"></i>
            <span>2185/A, Block-I (Extension), Bashundhara C/A, Madani Avenue, Dhaka-1229, Bangladesh</span>
          </li>
          <li>
            <i class="fa-solid fa-headset"></i>
            <div>
              <a href="tel:+8809612008811">+880 9612 008811</a> / <a href="tel:+8809612008815">8815</a>
            </div>
          </li>
          <li>
            <i class="fa-solid fa-envelope"></i>
            <div>
              <a href="mailto:info@catharsisintl.com">info@catharsisintl.com</a>
            </div>
          </li>
          <li>
            <i class="fa-solid fa-shield-cat"></i>
            <div>
              <a href="mailto:catharsis.grievances@gmail.com">catharsis.grievances@gmail.com</a>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Copyright Bar -->
    <div class="footer__bar">
      <div class="copy-text">
        © <span id="year"></span> <b>Catharsis International</b>. All rights reserved.
      </div>
      <div class="footer-bottom-links">
        <span>Govt. License RL.-549</span>
        <span>•</span>
        <span>ISO 9001:2015 Certified</span>
        <span>•</span>
        <a href="contact.html#grievance">Grievance Portal</a>
      </div>
    </div>
  </div>
</footer>

<a class="wa" href="https://wa.me/8801335143358" target="_blank" rel="noopener" aria-label="WhatsApp">
  <i class="fa-brands fa-whatsapp" style="font-size:28px"></i>
</a>

<!-- GLOBAL LIGHTBOX MODAL -->
<div class="lightbox-modal" id="lightbox-modal" role="dialog" aria-modal="true" aria-label="Image Preview">
  <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <button class="lightbox-close" id="lightbox-close" aria-label="Close image preview">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <img id="lightbox-img" src="" alt="Full view preview">
    <div class="lightbox-caption" id="lightbox-caption"></div>
  </div>
</div>
`;

  const headerMount = document.getElementById('header-component');
  if (headerMount) headerMount.innerHTML = headerHTML;

  const footerMount = document.getElementById('footer-component');
  if (footerMount) footerMount.innerHTML = footerHTML;

  /* Set Footer Year */
  const yrEl = document.getElementById('year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  /* Dynamically inject 3D Site Loader ONLY on Index Page */
  const path = location.pathname;
  const pageFile = path.split('/').pop();
  const isHomePage = (!pageFile || pageFile === 'index.html' || pageFile === 'index' || path === '/');

  if (isHomePage) {
    if (typeof THREE === 'undefined') {
      const s1 = document.createElement('script'); s1.src = basePath + 'assets/libs/three.min.js';
      const s2 = document.createElement('script'); s2.src = basePath + 'assets/libs/GLTFLoader.js';
      const s3 = document.createElement('script'); s3.src = basePath + 'assets/js/loader3d.js';
      s1.onload = () => {
        document.head.appendChild(s2);
        s2.onload = () => {
          document.head.appendChild(s3);
        };
      };
      document.head.appendChild(s1);
    } else if (!window.__catharsis3DLoaderInit) {
      const s3 = document.createElement('script'); s3.src = basePath + 'assets/js/loader3d.js';
      document.head.appendChild(s3);
    }
  }
})();
