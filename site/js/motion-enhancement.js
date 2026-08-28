/* My Systems interaction layer: pointer, scroll, proximity and state. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer:fine)').matches;
  if (reduce) return;
  const root = document.documentElement;
  const cursor = document.querySelector('.cursor');
  const hero = document.querySelector('.hero');
  const architecture = document.querySelector('.architecture');
  const canvas = document.querySelector('#globe-canvas');

  if (cursor && fine) {
    const setState = state => { cursor.dataset.state = state; };
    document.querySelectorAll('.system').forEach(el => {
      el.addEventListener('mouseenter', () => setState('view'));
      el.addEventListener('mouseleave', () => setState('default'));
      el.addEventListener('focus', () => setState('view'));
      el.addEventListener('blur', () => setState('default'));
    });
    document.querySelectorAll('.button,.nav-cta').forEach(el => {
      el.addEventListener('mouseenter', () => setState('action'));
      el.addEventListener('mouseleave', () => setState('default'));
    });
    if (canvas) {
      canvas.addEventListener('mouseenter', () => setState('drag'));
      canvas.addEventListener('mouseleave', () => setState('default'));
      canvas.addEventListener('pointerdown', () => setState('drag'));
      canvas.addEventListener('pointerup', () => setState('drag'));
    }
  }

  if (hero && fine) {
    let tx = 0, ty = 0, x = 0, y = 0;
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - .5;
      ty = (e.clientY - r.top) / r.height - .5;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; }, { passive: true });
    const loop = () => {
      x += (tx - x) * .055;
      y += (ty - y) * .055;
      root.style.setProperty('--mx', x.toFixed(4));
      root.style.setProperty('--my', y.toFixed(4));
      root.style.setProperty('--hero-rx', (y * -1.8).toFixed(2) + 'deg');
      root.style.setProperty('--hero-ry', (x * 2.4).toFixed(2) + 'deg');
      requestAnimationFrame(loop);
    };
    loop();
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      .to('.hero-copy', { y: -90, scale: .94, opacity: .35, ease: 'none' }, 0)
      .to('.orb', { x: 70, y: -150, scale: 1.16, opacity: .45, ease: 'none' }, 0)
      .to('.hero-grid', { y: 150, scale: 1.08, opacity: .18, ease: 'none' }, 0);
    if (architecture) {
      gsap.fromTo('.architecture .network', { y: 90, scale: .9, opacity: .45 }, {
        y: -35, scale: 1.02, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: architecture, start: 'top 92%', end: 'center 42%', scrub: 1.1 }
      });
      gsap.to('.architecture-copy', {
        y: -45,
        scrollTrigger: { trigger: architecture, start: 'top bottom', end: 'center center', scrub: 1.1 }
      });
    }
    const cta = document.querySelector('.cta');
    if (cta) gsap.fromTo('.cta-content', { y: 70, opacity: .65 }, {
      y: 0, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: cta, start: 'top 90%', end: 'center center', scrub: .9 }
    });
  }

  if (fine) {
    document.querySelectorAll('.system').forEach(row => {
      row.addEventListener('pointermove', e => {
        const r = row.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        row.style.setProperty('--pointer-x', (x * 16).toFixed(2) + 'px');
        row.style.setProperty('--pointer-y', (y * 4).toFixed(2) + 'px');
        row.style.setProperty('--signal-origin', ((x + .5) * 100).toFixed(1) + '%');
      }, { passive: true });
      row.addEventListener('pointerleave', () => {
        row.style.setProperty('--pointer-x', '0px');
        row.style.setProperty('--pointer-y', '0px');
        row.style.setProperty('--signal-origin', '0%');
      }, { passive: true });
    });
  }

  let lastY = scrollY, lastT = performance.now(), velocity = 0;
  addEventListener('scroll', () => {
    const now = performance.now();
    const dt = Math.max(8, now - lastT);
    velocity = Math.max(-1, Math.min(1, (scrollY - lastY) / dt * .9));
    lastY = scrollY;
    lastT = now;
  }, { passive: true });
  function velocityLoop() {
    velocity *= .91;
    root.style.setProperty('--motion-v', velocity.toFixed(3));
    root.style.setProperty('--scroll-velocity', (velocity * 10).toFixed(2));
    requestAnimationFrame(velocityLoop);
  }
  velocityLoop();

  const rows = [...document.querySelectorAll('.system')];
  if ('IntersectionObserver' in window) {
    const rowObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('scroll-active', entry.isIntersecting));
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    rows.forEach(row => rowObserver.observe(row));
  }

  const principles = [...document.querySelectorAll('.principle')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('in-focus', entry.isIntersecting));
    }, { threshold: .55 });
    principles.forEach(p => observer.observe(p));
  }

  // Globe interaction state. CSS/renderer can consume these variables without decorative animation.
  if (canvas && fine) {
    const network = canvas.closest('.network');
    let px = 0, py = 0, proximity = 0, state = 'idle';
    const setState = next => {
      if (state === next) return;
      state = next;
      if (network) network.dataset.globeState = next;
    };
    canvas.addEventListener('pointermove', e => {
      const r = canvas.getBoundingClientRect();
      px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - .5) * 2));
      py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - .5) * 2));
      proximity = 1;
      if (state !== 'active') setState('aware');
      root.style.setProperty('--globe-px', px.toFixed(3));
      root.style.setProperty('--globe-py', py.toFixed(3));
    }, { passive: true });
    canvas.addEventListener('pointerdown', () => setState('active'));
    canvas.addEventListener('pointerup', () => setState('settling'));
    canvas.addEventListener('pointerleave', () => {
      proximity = 0;
      if (state !== 'active') setState('settling');
    }, { passive: true });
    const globeLoop = () => {
      proximity *= .94;
      const influence = proximity * .035;
      root.style.setProperty('--globe-influence-x', (px * influence).toFixed(4));
      root.style.setProperty('--globe-influence-y', (py * influence).toFixed(4));
      if (state === 'settling' && proximity < .02) setState('idle');
      requestAnimationFrame(globeLoop);
    };
    globeLoop();
  }
})();
