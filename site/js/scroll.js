import { prefersReducedMotion, root } from './config.js';

export function initScrollMotion() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if (window.ScrollTrigger) {
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('.hero-line', { yPercent: 115, duration: 1.15, stagger: .12, delay: .08 })
      .from('.hero .eyebrow', { opacity: 0, x: -18, duration: .55 }, '-=.72')
      .from('.hero .hero-bottom', { opacity: 0, y: 28, duration: .75 }, '-=.45');

    gsap.utils.toArray('.reveal').forEach((el, index) => {
      if (el.closest('.hero')) return;
      gsap.fromTo(el,
        { opacity: 0, y: el.classList.contains('principle') ? 38 : 28 },
        { opacity: 1, y: 0, duration: .8, delay: Math.min(index * .055, .3), ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    gsap.to('.orb', { y: -110, scale: 1.08, rotate: 3,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 } });
    gsap.to('.hero-grid', { y: 90, scale: 1.035,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.15 } });
    gsap.to('.hero-copy', { y: -55,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.scrollcue', { y: 28, opacity: 0,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '35% top', scrub: .7 } });

    document.querySelectorAll('.section-label').forEach(label => {
      if (label.closest('.hero')) return;
      gsap.fromTo(label, { x: -12, opacity: .25 }, { x: 0, opacity: 1, duration: .7,
        scrollTrigger: { trigger: label, start: 'top 90%', once: true } });
    });

    const architecture = document.querySelector('.architecture');
    if (architecture) {
      gsap.to('.architecture-copy', { y: -35,
        scrollTrigger: { trigger: architecture, start: 'top 85%', end: 'center center', scrub: 1.1 } });
      gsap.fromTo('.network', { y: 150, scale: .78, opacity: .25 }, { y: -10, scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: architecture, start: 'top 95%', end: '70% top', scrub: 1.15 } });
    }

    const cta = document.querySelector('.cta');
    if (cta) {
      gsap.fromTo('.cta-content', { y: 70, opacity: .65 }, { y: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: cta, start: 'top 90%', end: 'center center', scrub: .9 } });
      gsap.to('.cta .ring', { rotation: 180, scale: 1.08,
        scrollTrigger: { trigger: cta, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    }
  }

  let lastY = scrollY, lastT = performance.now(), velocity = 0;
  addEventListener('scroll', () => {
    const now = performance.now();
    velocity = Math.max(-3, Math.min(3, ((scrollY - lastY) / Math.max(8, now - lastT)) * 16));
    lastY = scrollY; lastT = now;
  }, { passive: true });
  const settle = () => { velocity *= .91; root.style.setProperty('--scroll-velocity', velocity.toFixed(3)); requestAnimationFrame(settle); };
  settle();
}
