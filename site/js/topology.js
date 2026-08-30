import { prefersReducedMotion, finePointer, clamp } from './config.js';

const systems = ['dns','drive','vault'];

export function initTopology() {
  const section = document.querySelector('.systems-section');
  const list = document.querySelector('.system-list');
  const track = document.querySelector('.topology-track');
  const pulse = document.querySelector('.topology-pulse');
  if (!section || !list || !track) return;

  const rows = [...list.querySelectorAll('.system')];
  let active = -1;
  let progress = 0;

  const setActive = index => {
    active = index;
    rows.forEach((row, i) => row.classList.toggle('topology-active', i === index));
    section.style.setProperty('--topology-progress', `${Math.max(0, index) / Math.max(1, rows.length - 1)}`);
    section.style.setProperty('--topology-index', index < 0 ? '0' : String(index + 1));
  };

  rows.forEach((row, index) => {
    row.addEventListener('pointerenter', () => { if (!prefersReducedMotion) setActive(index); }, { passive:true });
    row.addEventListener('focus', () => setActive(index));
  });

  const update = () => {
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    progress = clamp((vh * .82 - r.top) / Math.max(1, r.height - vh * .18), 0, 1);
    section.style.setProperty('--topology-scroll', progress.toFixed(3));
    if (!prefersReducedMotion) {
      const index = Math.min(rows.length - 1, Math.floor(progress * rows.length));
      if (progress > .12 && index !== active) setActive(index);
      if (progress <= .12 && active !== -1) setActive(-1);
    }
    if (pulse) pulse.style.setProperty('--pulse-x', `${(progress * 100).toFixed(1)}%`);
  };

  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', update, { passive:true });
  update();

  if (finePointer && !prefersReducedMotion) {
    section.addEventListener('pointermove', e => {
      const r = section.getBoundingClientRect();
      section.style.setProperty('--topology-pointer', `${((e.clientX-r.left)/r.width-.5).toFixed(3)}`);
    }, { passive:true });
  }
}
