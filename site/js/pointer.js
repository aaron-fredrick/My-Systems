import { prefersReducedMotion, finePointer, root, clamp } from './config.js';

export function initPointerMotion() {
  const cursor = document.querySelector('.cursor');
  const hero = document.querySelector('.hero');

  if (cursor && finePointer && !prefersReducedMotion) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const loop = () => { x += (tx - x) * .18; y += (ty - y) * .18; cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; requestAnimationFrame(loop); };
    loop();
    const state = value => { cursor.dataset.state = value; cursor.classList.toggle('active', value !== 'default'); };
    document.querySelectorAll('.system').forEach(el => {
      el.addEventListener('mouseenter', () => state('view'));
      el.addEventListener('mouseleave', () => state('default'));
      el.addEventListener('focus', () => state('view'));
      el.addEventListener('blur', () => state('default'));
    });
    document.querySelectorAll('.button,.nav-cta').forEach(el => {
      el.addEventListener('mouseenter', () => state('action'));
      el.addEventListener('mouseleave', () => state('default'));
    });
  }

  if (hero && finePointer && !prefersReducedMotion) {
    let px = 0, py = 0, targetX = 0, targetY = 0;
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      targetX = (e.clientX - r.left) / r.width - .5;
      targetY = (e.clientY - r.top) / r.height - .5;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; }, { passive: true });
    const loop = () => {
      px += (targetX - px) * .075; py += (targetY - py) * .075;
      root.style.setProperty('--mx', px.toFixed(3)); root.style.setProperty('--my', py.toFixed(3));
      root.style.setProperty('--hero-rx', `${(py * -2.2).toFixed(2)}deg`);
      root.style.setProperty('--hero-ry', `${(px * 3.2).toFixed(2)}deg`);
      requestAnimationFrame(loop);
    };
    loop();
  }

  if (!prefersReducedMotion && finePointer) {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width || 1), -1, 1);
        const dy = clamp((e.clientY - (r.top + r.height / 2)) / (r.height || 1), -1, 1);
        el.style.setProperty('--mag-x', `${(dx * 12).toFixed(2)}px`);
        el.style.setProperty('--mag-y', `${(dy * 9).toFixed(2)}px`);
      }, { passive: true });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--mag-x', '0px'); el.style.setProperty('--mag-y', '0px'); }, { passive: true });
    });
  }
}
