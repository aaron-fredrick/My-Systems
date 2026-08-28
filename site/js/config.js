export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(pointer: fine)').matches;
export const root = document.documentElement;
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
