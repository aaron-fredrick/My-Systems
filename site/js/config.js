export const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
export const pointerQuery = window.matchMedia('(pointer: fine)');
export const prefersReducedMotion = motionQuery.matches;
export const finePointer = pointerQuery.matches;
export const root = document.documentElement;
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
