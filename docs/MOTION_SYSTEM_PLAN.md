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
- Brand colors are protected by `site/css/brand-lock.css` and should remain explicitly locked with `!important` when new visual rules are introduced.

## Motion language

Core vocabulary:

`proximity -> response -> momentum -> alignment -> signal -> transition`

The site should feel like a system responding to an operator.

## Implementation roadmap

### Phase 1 - Hero depth and pointer response

- [x] Multi-layer hero pointer response.
- [x] Different movement depth for grid, copy, and orbital visual.
- [x] Subtle perspective/rotation response layered over translation.
- [x] Controlled heading scale/translation response during hero exit.
- [ ] Add touch/device equivalent where it improves mobile experience without requiring permissions.

### Phase 2 - Scroll choreography

- [x] Hero parallax on scroll.
- [x] Section reveal timing is staggered rather than a single generic fade.
- [x] Architecture/globe receives scroll-linked movement.
- [x] Major hero exit motion is coordinated through a single scroll timeline.
- [x] Hero layers progressively separate as the user leaves the hero.
- [x] Architecture/globe transition is given a stronger scroll entrance.
- [x] Scroll velocity is available as a temporary motion input and settles back to rest.
- [ ] Extend the unified scroll-progress model across every major section.
- [ ] Add more deliberate section-specific parallax depths after visual QA.

### Phase 3 - Systems interaction

- [x] Pointer-responsive row movement.
- [x] Active-row signal line.
- [x] Scroll-linked row activation.
- [x] Number/name/description/status respond as separate layers.
- [x] System name tracks pointer subtly within the row.
- [x] Signal origin follows the operator's pointer position.
- [x] Neighbouring rows recede while one row is addressed.
- [x] Keyboard focus receives the same active-row language.
- [x] Reset signal transforms when the row loses hover/focus/active state to prevent stuck borders.
- [ ] Replace the remaining generic looping signal behaviour with a fully pointer/scroll-progress-driven travelling signal.

### Phase 4 - Globe interaction

- [x] Continuous autonomous rotation restored.
- [x] Pointer/drag interaction.
- [x] Drag momentum and release settling.
- [x] Network signal particles.
- [x] Node hover response.
- [x] Controlled pointer-position tracking captured for interaction choreography.
- [ ] Apply pointer proximity influence to globe rotation without making it chase the cursor.
- [ ] Add intentional idle network activity with sparse, non-random-feeling events.
- [ ] Improve the idle -> interaction -> release state machine so transitions are perceptibly intentional.
- [x] Tune globe scale/position through the architecture scroll sequence.

### Phase 5 - Cursor as interface

- [x] Existing cursor follows pointer and expands on interactive targets.
- [x] Semantic cursor states: default, `VIEW`, `OPEN`, and `DRAG`.
- [x] Cursor state is coupled to system-row activation.
- [x] Cursor state is coupled to globe interaction.
- [x] Cursor behaviour is disabled on coarse pointers and under reduced motion.

### Phase 6 - Principles and CTA

- [x] Principles respond sequentially according to scroll position.
- [x] Restrained pointer/velocity response on principle boundaries.
- [x] CTA content resolves through scroll progress.
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
- [x] Prevent architecture label/heading layering conflicts by explicitly separating text and globe stacking contexts.

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
- `site/js/motion-enhancement.js`
- `site/css/style.css`
- `site/css/motion-enhancement.css`
- `site/css/brand-lock.css`

When adding motion, prefer CSS transforms and requestAnimationFrame/GSAP ScrollTrigger where already available. Avoid unnecessary DOM effects, expensive filters, or continuous animation of large numbers of elements.

## Latest implementation pass

The globe/architecture pass has now been implemented:

- Globe remains autonomously rotating when idle.
- Pointer position is tracked continuously for the globe interaction layer.
- Drag input continues to provide direct rotation and release momentum.
- Node proximity/hover remains available as the globe's active visual response.
- Architecture copy movement was softened and its scroll trigger starts later so the heading has clear separation from the globe entrance.
- Globe entrance now has a larger, slower depth transition to make the architecture section feel like a deliberate hand-off from the preceding content.
- System row pointer variables now include horizontal and vertical response, giving the four row information layers distinct movement.
- Active system signal origin is reset on pointer exit.
- Brand palette remains unchanged and locked.

## Next implementation pass

The next pass should focus on **true globe proximity/state behaviour and full-page choreography**, not decorative effects:

1. Use the tracked pointer position to influence globe rotation subtly based on proximity.
2. Introduce explicit idle -> aware -> active -> settling globe states.
3. Make network activity sparse and event-like rather than continuously uniform.
4. Replace the remaining generic system signal loop with interaction/scroll-driven signalling.
5. Perform a full-page timing pass and remove competing motion.
6. Test performance, touch, keyboard and reduced-motion behaviour.

## Definition of done

The finished motion layer should make the site feel operational and alive even when content is unchanged. A visitor should discover motion by moving, hovering, scrolling, and interacting - not by being bombarded by autonomous effects.
