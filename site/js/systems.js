import { prefersReducedMotion, finePointer, clamp } from './config.js';

export function initSystems() {
  const systems = [...document.querySelectorAll('.system')];
  systems.forEach(row => {
    row.addEventListener('pointermove', e => {
      if (!finePointer || prefersReducedMotion) return;
      const r = row.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const y = (e.clientY - r.top) / r.height - .5;
      row.style.setProperty('--row-y', `${(y * 6).toFixed(2)}px`);
      row.style.setProperty('--pointer-x', `${((x - .5) * 20).toFixed(2)}px`);
      row.style.setProperty('--pointer-y', `${(y * 2).toFixed(2)}px`);
      row.style.setProperty('--signal-origin', `${(x * 100).toFixed(1)}%`);
    }, { passive: true });
    row.addEventListener('pointerenter', () => row.classList.add('is-active'), { passive: true });
    row.addEventListener('pointerleave', () => reset(row), { passive: true });
    row.addEventListener('focus', () => row.classList.add('is-active'));
    row.addEventListener('blur', () => reset(row));
  });

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > .62) {
        systems.forEach(row => row.classList.remove('scroll-active'));
        entry.target.classList.add('scroll-active');
      } else if (!entry.isIntersecting) entry.target.classList.remove('scroll-active');
    }), { threshold: [.62, .8] });
    systems.forEach(row => observer.observe(row));
  }
}

function reset(row) {
  row.style.setProperty('--row-y', '0px');
  row.style.setProperty('--pointer-x', '0px');
  row.style.setProperty('--pointer-y', '0px');
  row.style.setProperty('--signal-origin', '0%');
  row.classList.remove('is-active');
}
