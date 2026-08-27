# My Systems Motion System Plan

## Purpose

Build a high-end interactive motion system for the My Systems website that feels like infrastructure/interface motion rather than decorative animation.

The motion should keep the viewer engaged through responsiveness, scroll choreography, proximity, alignment, signals, and momentum while preserving the My Systems brand: technical, calm, precise, modular, and infrastructure-oriented.

## Brand constraints

- Preserve the existing dark neutral palette and restrained `#5BA7FF` accent.
- Preserve Manrope for display/UI text and DM Mono for technical metadata.
- No grain or noise.
- No blobs, purple gradients, neon treatment, glassmorphism, excessive blur, or generic AI-landing-page effects.
- Motion must support hierarchy and system behaviour, not decorate empty space.
- Quiet when the viewer is idle; responsive when the viewer interacts.
- Preserve `prefers-reduced-motion` and provide touch equivalents where interaction exists.

## Motion language

Core vocabulary:

`proximity -> response -> momentum -> alignment -> signal -> transition`

The site should feel like a system responding to an operator.

## Implementation roadmap

### Phase 1 - Hero depth and pointer response

- [x] Multi-layer hero pointer response.
- [x] Different movement depth for grid, copy, and orbital visual.
- [ ] Add subtle perspective/rotation response, not only translation.
- [ ] Add controlled heading scale/translation response during hero exit.
- [ ] Add touch/device equivalent where it improves mobile experience without requiring permissions.

### Phase 2 - Scroll choreography

- [x] Hero parallax on scroll.
- [x] Section reveal timing is staggered rather than a single generic fade.
- [x] Architecture/globe receives scroll-linked movement.
- [ ] Build a unified scroll-progress model so major sections participate in one choreography.
- [ ] Add section-specific parallax depths.
- [ ] Make hero elements progressively separate as the user leaves the hero.
- [ ] Make architecture transition visually into the globe rather than treating it as an isolated reveal.
- [ ] Add scroll velocity as a temporary motion input; displacement must settle back to rest.

### Phase 3 - Systems interaction

- [x] Pointer-responsive row movement.
- [x] Active-row signal line.
- [x] Scroll-linked row activation.
- [ ] Make number/name/description/status respond as separate layers.
- [ ] Make the system name track the pointer subtly within the row.
- [ ] Add travelling signal behaviour tied to the active row rather than a generic looping hover.
- [ ] Subtly recede neighbouring rows while one row is addressed.
- [ ] Add stronger keyboard focus equivalence for the same interaction language.

### Phase 4 - Globe interaction

- [x] Continuous autonomous rotation restored.
- [x] Pointer/drag interaction.
- [x] Drag momentum and release settling.
- [x] Network signal particles.
- [x] Node hover response.
- [ ] Add controlled pointer-proximity influence without making the globe chase the cursor.
- [ ] Add intentional idle network activity with sparse, non-random-feeling events.
- [ ] Improve the idle -> interaction -> release state machine so transitions are perceptibly intentional.
- [ ] Tune globe scale/position through the architecture scroll sequence.

### Phase 5 - Cursor as interface

- [x] Existing cursor follows pointer and expands on interactive targets.
- [ ] Add semantic cursor states: default, link, `VIEW`, and globe/drag.
- [ ] Couple cursor state to system-row activation.
- [ ] Couple cursor state to globe interaction.
- [ ] Keep cursor behaviour disabled on coarse pointers and under reduced motion.

### Phase 6 - Principles and CTA

- [ ] Reveal principles sequentially according to scroll position.
- [ ] Add restrained pointer response to principle boundaries/content.
- [ ] Replace purely decorative CTA motion with scroll-progress/velocity response.
- [ ] Give CTA ring a controlled resolution/settling moment when the CTA becomes the focus.

### Phase 7 - Choreography and polish

- [ ] Review the entire page as one continuous motion sequence.
- [ ] Prevent simultaneous animation overload.
- [ ] Define deliberate quiet zones between major motion moments.
- [ ] Tune easing, duration, displacement, and velocity globally.
- [ ] Check 60fps performance on desktop and mid-range mobile hardware.
- [ ] Verify no layout shift is introduced by motion.
- [ ] Verify keyboard navigation and focus states.
- [ ] Verify reduced-motion mode removes non-essential movement while retaining usability.
- [ ] Verify touch interactions do not conflict with native scrolling.

## Target choreography

`Hero responds -> user scrolls -> hero recedes -> systems activate -> architecture takes over -> globe becomes the focus -> principles settle -> CTA resolves`

Avoid:

`Everything is constantly moving.`

## Quality bar

The target is premium interactive/web-design quality comparable to strong Awwwards-level work, but without copying another site's visual identity. The distinction should come from choreography, interaction fidelity, restraint, and consistency with the My Systems brand.

A feature is not complete merely because it animates. It is complete when the motion communicates a relationship between the viewer and the system.

## Current implementation notes

Primary motion files:

- `site/js/main.js`
- `site/css/style.css`

When adding motion, prefer CSS transforms and requestAnimationFrame/GSAP ScrollTrigger where already available. Avoid unnecessary DOM effects, expensive filters, or continuous animation of large numbers of elements.

## Definition of done

The finished motion layer should make the site feel operational and alive even when content is unchanged. A visitor should discover motion by moving, hovering, scrolling, and interacting - not by being bombarded by autonomous effects.
