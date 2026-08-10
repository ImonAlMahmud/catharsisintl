/* ============================================================
   CATHARSIS INTERNATIONAL — GLOBAL 3D LOGO COMPONENT
   Renders interactive 3D GLB Catharsis Logo with WebGL, lighting & parallax
   ============================================================ */
(function initGlobal3DLogos() {
  function setupCanvas(el) {
    if (!el || typeof THREE === 'undefined') return;
    if (el.dataset.initialized) return;
    el.dataset.initialized = 'true';

    var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.3, 7.8);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.15;

    /* Studio Lighting for Catharsis 3D Logo */
    scene.add(new THREE.AmbientLight(0xffffff, 0.88));
    var keyLight = new THREE.DirectionalLight(0xffffff, 1.4); keyLight.position.set(4, 7, 6); scene.add(keyLight);
    var fillLight= new THREE.DirectionalLight(0xffffff, 0.6); fillLight.position.set(-4, -2, 4); scene.add(fillLight);
    var navyRim  = new THREE.PointLight(0x003087, 2.2, 30); navyRim.position.set(-5, 4, 5); scene.add(navyRim);
    var redFill  = new THREE.PointLight(0xE31B23, 1.4, 25); redFill.position.set(5, -3, 4); scene.add(redFill);

    var mainGroup = new THREE.Group(); scene.add(mainGroup);
    var modelGroup = new THREE.Group(); mainGroup.add(modelGroup);

    /* Determine relative model path based on page depth */
    var modelPath = el.dataset.model || 'catharsis_log_3D.glb';
    var pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && (pathSegments[pathSegments.length - 1].includes('.') || !pathSegments[pathSegments.length - 1].includes('/'))) {
      pathSegments.pop();
    }
    var basePath = pathSegments.length > 0 ? '../'.repeat(pathSegments.length) : '';
    if (!modelPath.startsWith('http') && !modelPath.startsWith('/')) {
      modelPath = basePath + modelPath;
    }

    if (typeof THREE.GLTFLoader !== 'undefined') {
      var loader = new THREE.GLTFLoader();
      loader.load(modelPath, function(gltf) {
        var model = gltf.scene;
        var box = new THREE.Box3().setFromObject(model);
        var maxDim = Math.max.apply(null, box.getSize(new THREE.Vector3()).toArray());
        var sz = 4.2 / (maxDim || 1);
        model.scale.setScalar(sz);

        var c2 = box.getCenter(new THREE.Vector3());
        model.position.set(-c2.x * sz, -c2.y * sz, -c2.z * sz);

        model.traverse(function(node) {
          if (node.isMesh && node.material) {
            [].concat(node.material).forEach(function(mat) {
              mat.roughness = Math.max(mat.roughness || 0, 0.3);
              mat.metalness = Math.min(mat.metalness || 0, 0.7);
              mat.needsUpdate = true;
            });
          }
        });

        modelGroup.add(model);
      }, undefined, function(err) {
        console.warn('3D Logo Load Notice:', err);
      });
    }

    /* Mouse Parallax Disabled */
    var tx=0, ty=0;

    function resize() {
      var r = el.getBoundingClientRect(); if(!r.width) return;
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width/r.height;
      camera.updateProjectionMatrix();
    }
    addEventListener('resize', resize); resize();

    var time = 0;
    var spin = 0;
    (function loop() {
      time += 0.016;
      if (!reduce) {
        spin += 0.0055;
        modelGroup.position.y = Math.sin(time * 1.6) * 0.16;
      }
      modelGroup.rotation.x += (tx - modelGroup.rotation.x) * 0.05;
      modelGroup.rotation.y += (ty + spin - modelGroup.rotation.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  }

  function renderAll() {
    var canvases = document.querySelectorAll('.logo3d-canvas, #logo3d');
    canvases.forEach(setupCanvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
})();
