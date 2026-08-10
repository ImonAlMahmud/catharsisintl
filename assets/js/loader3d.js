/* ============================================================
   CATHARSIS INTERNATIONAL — GLOBAL SITE LOADER SYSTEM
   - Index Page: White 3D Logo Loader (Individual 3D WebGL Instance)
   - Other Pages: Sleek Normal CSS Brand Spinner
   ============================================================ */
(function initCatharsisSiteLoader() {
  /* Check if current page is Home / Index Page */
  var path = location.pathname;
  var pageFile = path.split('/').pop();
  var isHomePage = (!pageFile || pageFile === 'index.html' || pageFile === 'index' || path === '/');

  /* If NOT homepage, do not render any loader */
  if (!isHomePage) return;

  if (window.__catharsis3DLoaderInit) return;
  window.__catharsis3DLoaderInit = true;

  /* Determine relative base path based on directory depth */
  var pathSegments = location.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && (pathSegments[pathSegments.length - 1].includes('.') || !pathSegments[pathSegments.length - 1].includes('/'))) {
    pathSegments.pop();
  }
  var basePath = pathSegments.length > 0 ? '../'.repeat(pathSegments.length) : '';
  var modelPath = basePath + 'catharsis_log_3D.glb';

  /* Inject Loader CSS Styles */
  var style = document.createElement('style');
  style.id = 'catharsis-loader-styles';
  style.textContent = `
    #catharsis-site-loader {
      position: fixed;
      inset: 0;
      z-index: 99999999;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #001B52;
      transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }
    #catharsis-site-loader.loader-done {
      opacity: 0;
      transform: scale(1.025);
      pointer-events: none;
    }

    /* WHITE 3D LOGO LOADER (INDEX PAGE ONLY) */
    .loader-white-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 36px;
      border-radius: 24px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 48, 135, 0.08);
      box-shadow: 0 20px 50px rgba(0, 48, 135, 0.08);
    }
    .loader-3d-stage {
      position: relative;
      width: 88px;
      height: 88px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader-stage-glow {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 48, 135, 0.12) 0%, rgba(200, 16, 46, 0.06) 50%, transparent 70%);
      filter: blur(12px);
      animation: loaderGlowPulse 1.8s ease-in-out infinite alternate;
    }
    @keyframes loaderGlowPulse {
      0% { transform: scale(0.85); opacity: 0.6; }
      100% { transform: scale(1.1); opacity: 1; }
    }
    .loader-3d-canvas {
      position: relative;
      z-index: 2;
      width: 100% !important;
      height: 100% !important;
      outline: none;
    }
    .loader-brand-title {
      font-family: 'Cinzel', 'Playfair Display', serif;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 1.2px;
      color: #001B52;
      margin-bottom: 3px;
      text-transform: uppercase;
      text-align: center;
    }
    .loader-brand-sub {
      font-size: 11px;
      color: #475569;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
      text-align: center;
      font-weight: 500;
    }
    .loader-progress-wrap {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .loader-bar-track {
      width: 100%;
      height: 4px;
      background: rgba(0, 48, 135, 0.08);
      border-radius: 999px;
      overflow: hidden;
      position: relative;
    }
    .loader-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #003087 0%, #C8102E 55%, #C99700 100%);
      border-radius: 999px;
      box-shadow: 0 0 8px rgba(200, 16, 46, 0.4);
      transition: width 0.1s ease-out;
    }
    .loader-percent-num {
      font-size: 11.5px;
      font-weight: 700;
      color: #003087;
      letter-spacing: 0.6px;
    }

    /* SLEEK NORMAL SPINNER (OTHER PAGES) */
    .normal-spinner-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .normal-spinner {
      width: 36px;
      height: 36px;
      border: 3.5px solid rgba(0, 48, 135, 0.12);
      border-top-color: #003087;
      border-radius: 50%;
      animation: normalSpin 0.65s linear infinite;
    }
    @keyframes normalSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .normal-spinner-text {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: #003087;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  `;
  (document.head || document.documentElement).appendChild(style);

  /* Create Loader Container */
  function mountLoaderDOM() {
    var loaderDiv = document.getElementById('catharsis-site-loader');
    if (!loaderDiv) {
      loaderDiv = document.createElement('div');
      loaderDiv.id = 'catharsis-site-loader';
      var parent = document.body || document.documentElement;
      if (parent.firstChild) {
        parent.insertBefore(loaderDiv, parent.firstChild);
      } else {
        parent.appendChild(loaderDiv);
      }
    }

    if (isHomePage) {
      /* White 3D Logo Loader Layout */
      loaderDiv.innerHTML = `
        <div class="loader-white-card">
          <div class="loader-3d-stage">
            <div class="loader-stage-glow"></div>
            <canvas id="catharsis-loader-canvas" class="loader-3d-canvas"></canvas>
          </div>
          <div class="loader-brand-title">Catharsis International</div>
          <div class="loader-brand-sub">RL-549 • ISO 9001:2015 Audited</div>
          <div class="loader-progress-wrap">
            <div class="loader-bar-track">
              <div id="loader-bar-fill" class="loader-bar-fill"></div>
            </div>
            <div id="loader-percent" class="loader-percent-num">0%</div>
          </div>
        </div>
      `;
    } else {
      /* Normal Sleek CSS Spinner Layout for Other Pages */
      loaderDiv.innerHTML = `
        <div class="normal-spinner-wrap">
          <div class="normal-spinner"></div>
          <div class="normal-spinner-text">Catharsis</div>
        </div>
      `;
    }
    return loaderDiv;
  }

  var loaderDiv = mountLoaderDOM();

  if (!isHomePage) {
    /* Fast hide for Normal Spinner on Other Pages */
    function hideNormalSpinner() {
      setTimeout(function() {
        loaderDiv.classList.add('loader-done');
        setTimeout(function() {
          if (loaderDiv && loaderDiv.parentNode) loaderDiv.parentNode.removeChild(loaderDiv);
        }, 400);
      }, 120);
    }
    if (document.readyState === 'complete') {
      hideNormalSpinner();
    } else {
      window.addEventListener('load', hideNormalSpinner);
      setTimeout(hideNormalSpinner, 1200);
    }
    return; // Done for normal spinner pages!
  }

  /* HOME PAGE INDIVIDUAL 3D LOGO LOADER LOGIC */
  var percent = 0;
  var modelLoaded = false;
  var pageLoaded = false;
  var barFill = document.getElementById('loader-bar-fill');
  var percentEl = document.getElementById('loader-percent');

  var initialInterval = setInterval(function() {
    if (!modelLoaded && percent < 45) {
      percent += Math.floor(Math.random() * 8) + 4;
      if (percent > 45) percent = 45;
      if (barFill) barFill.style.width = percent + '%';
      if (percentEl) percentEl.textContent = percent + '%';
    }
  }, 35);

  function onModelLoaded() {
    if (modelLoaded) return;
    modelLoaded = true;
    clearInterval(initialInterval);

    var showcaseInterval = setInterval(function() {
      if (percent < 100) {
        percent += 4;
        if (percent > 100) percent = 100;
        if (barFill) barFill.style.width = percent + '%';
        if (percentEl) percentEl.textContent = percent + '%';
      }

      if (percent >= 100 && pageLoaded) {
        clearInterval(showcaseInterval);
        finishAndHide3D();
      }
    }, 25);
  }

  function finishAndHide3D() {
    if (barFill) barFill.style.width = '100%';
    if (percentEl) percentEl.textContent = '100%';
    setTimeout(function() {
      loaderDiv.classList.add('loader-done');
      setTimeout(function() {
        if (loaderDiv && loaderDiv.parentNode) loaderDiv.parentNode.removeChild(loaderDiv);
      }, 450);
    }, 200);
  }

  if (document.readyState === 'complete') {
    pageLoaded = true;
  } else {
    window.addEventListener('load', function() {
      pageLoaded = true;
    });
  }

  /* Fallback Maximum Timeout */
  setTimeout(function() {
    if (!modelLoaded) onModelLoaded();
    pageLoaded = true;
  }, 3000);

  /* Render Individual 3D Model using Three.js */
  function render3DModelWhite() {
    var canvas = document.getElementById('catharsis-loader-canvas');
    if (!canvas || typeof THREE === 'undefined') {
      onModelLoaded();
      return;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0.2, 7.0);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(1);
    renderer.setSize(88, 88, false);

    /* Studio Bright Lights for White Background */
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    var keyLight = new THREE.DirectionalLight(0xffffff, 1.5); keyLight.position.set(4, 7, 6); scene.add(keyLight);
    var navyLight = new THREE.PointLight(0x003087, 2.8, 25); navyLight.position.set(-4, 4, 4); scene.add(navyLight);
    var redLight = new THREE.PointLight(0xC8102E, 2.2, 25); redLight.position.set(4, -3, 4); scene.add(redLight);

    var mainGroup = new THREE.Group(); scene.add(mainGroup);
    var modelGroup = new THREE.Group(); mainGroup.add(modelGroup);

    if (typeof THREE.GLTFLoader !== 'undefined') {
      var loader = new THREE.GLTFLoader();
      loader.load(modelPath, function(gltf) {
        var model = gltf.scene;
        var box = new THREE.Box3().setFromObject(model);
        var maxDim = Math.max.apply(null, box.getSize(new THREE.Vector3()).toArray());
        var sz = 4.1 / (maxDim || 1);
        model.scale.setScalar(sz);

        var c2 = box.getCenter(new THREE.Vector3());
        model.position.set(-c2.x * sz, -c2.y * sz, -c2.z * sz);

        modelGroup.add(model);

        // Render 1st frame immediately and trigger load completion
        renderer.render(scene, camera);
        onModelLoaded();
      }, undefined, function(err) {
        console.warn('3D Loader GLB note:', err);
        onModelLoaded();
      });
    } else {
      onModelLoaded();
    }

    var time = 0;
    function animate() {
      time += 0.038;
      modelGroup.rotation.y += 0.032;
      modelGroup.position.y = Math.sin(time * 2.5) * 0.12;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* Execute 3D Rendering */
  if (typeof THREE !== 'undefined' && typeof THREE.GLTFLoader !== 'undefined') {
    render3DModelWhite();
  } else {
    var s1 = document.createElement('script'); s1.src = basePath + 'assets/libs/three.min.js';
    var s2 = document.createElement('script'); s2.src = basePath + 'assets/libs/GLTFLoader.js';
    s1.onload = function() {
      document.head.appendChild(s2);
      s2.onload = function() {
        render3DModelWhite();
      };
    };
    (document.head || document.documentElement).appendChild(s1);
  }
})();
