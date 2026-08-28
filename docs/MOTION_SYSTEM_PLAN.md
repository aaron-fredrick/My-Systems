# My Systems Motion System Plan

## Purpose
Build a high-end interactive motion system for My Systems that feels like infrastructure/interface motion rather than decorative animation.

The motion keeps the viewer engaged through responsiveness, scroll choreography, proximity, alignment, signals, and momentum while preserving the My Systems brand and series identity.

## Brand constraints
- Motion is subordinate to the My Systems brand profile and series identity.
- Awwwards-quality interaction is a quality benchmark, not a reason to copy agency aesthetics.
- Preserve the dark neutral palette, restrained blue signal accent, established typography, modular composition, and technical/infrastructure language.
- Motion reinforces interconnected personal infrastructure/systems.
- No grain/noise, blobs, purple gradients, neon treatment, glassmorphism, excessive blur, or generic AI-landing-page effects.
- Do not make the page UI-heavy; interaction and motion carry the sophistication.
- Keep the page dark but balanced rather than crushed into near-black sections.
- Brand-sensitive colors remain protected by `site/css/brand-lock.css`; use `!important` where required to prevent browser/theme overrides.
- Preserve `prefers-reduced-motion` and provide touch equivalents where interaction exists.

## Motion language
`proximity -> response -> momentum -> alignment -> signal -> transition`

The site should feel like a system responding to an operator.

## Awwwards benchmark
Use high-quality award work to benchmark interaction fidelity, scroll-linked storytelling, cursor/hover behaviour, transitions, responsive behaviour, accessibility, performance, and choreography - not visual styling.

The target remains recognisably My Systems: technical, calm, precise, modular, infrastructure-oriented, and restrained.

## Series-level design rule
My Systems is a series of related infrastructure projects. Individual systems may have their own functional visualisations, but they must feel like parts of one ecosystem.

Recurring interaction language:
- Blue = signal/interaction, not decoration.
- Lines = connectivity/structure.
- Movement = response/state, not ambient noise.
- Nodes = systems/endpoints.
- Alignment = architecture/order.
- Proximity = interaction/attention.
- Scroll = progression through the system.

Do not introduce motifs that make the site feel like a separate generic creative-tech experiment.

## Implementation roadmap

### Phase 1 - Hero depth and pointer response
- [x] Multi-layer hero pointer response.
- [x] Different movement depth for grid, copy, and orbital visual.
- [x] Subtle perspective/rotation response layered over translation.
- [x] Controlled heading scale/translation response during hero exit.
- [ ] Add touch/device equivalent where appropriate.

### Phase 2 - Scroll choreography
- [x] Hero parallax on scroll.
- [x] Staggered section reveal timing.
- [x] Architecture/globe scroll-linked movement.
- [x] Coordinated hero exit timeline.
- [x] Hero layers progressively separate on exit.
- [x] Stronger architecture/globe transition.
- [x] Scroll velocity captured as a temporary motion input and decays to rest.
- [ ] Extend the unified scroll-progress model across every major section.
- [ ] Add section-specific parallax depths after visual QA.

### Phase 3 - Systems interaction
- [x] Pointer-responsive row movement.
- [x] Active-row signal line.
- [x] Scroll-linked row activation.
- [x] Number/name/description/status respond as separate layers.
- [x] System name tracks pointer subtly.
- [x] Signal origin follows the pointer.
- [x] Neighbouring rows recede when one row is addressed.
- [x] Keyboard focus uses the same active-row language.
- [x] Reset signal transforms on pointer exit to prevent stuck borders.
- [ ] Replace remaining generic looping signal behaviour with interaction/scroll-driven signalling.

### Phase 4 - Globe interaction
- [x] Continuous autonomous rotation restored.
- [x] Pointer/drag interaction.
- [x] Drag momentum and release settling.
- [x] Network signal particles.
- [x] Node hover response.
- [x] Pointer-position tracking.
- [x] Globe interaction state layer: `idle -> aware -> active -> settling`.
- [x] Proximity input is calculated and exposed to the visual layer.
- [ ] Apply proximity influence to globe rotation without making it chase the cursor.
- [ ] Make idle network activity sparse and intentional.
- [ ] Connect globe state directly to renderer rotation/activity behaviour.
- [x] Tune globe scale/position through the architecture scroll sequence.

### Phase 5 - Cursor as interface
- [x] Existing cursor follows pointer and expands on interactive targets.
- [x] Semantic states: default, `VIEW`, `OPEN/ACTION`, `DRAG`.
- [x] Cursor state coupled to system rows and globe.
- [x] Disabled on coarse pointers and reduced motion.

### Phase 6 - Principles and CTA
- [x] Principles respond sequentially according to scroll position.
- [x] Restrained pointer/velocity response.
- [x] CTA content resolves through scroll progress.
- [ ] Give CTA ring a controlled resolution/settling moment.

### Phase 7 - Choreography, QA and polish
- [ ] Review the page as one continuous motion sequence.
- [ ] Prevent simultaneous animation overload.
- [ ] Define quiet zones between major motion moments.
- [ ] Tune easing, duration, displacement, and velocity globally.
- [ ] Check 60fps performance on desktop and mid-range mobile hardware.
- [ ] Verify no layout shift.
- [ ] Verify keyboard navigation/focus states.
- [ ] Verify reduced-motion mode.
- [ ] Verify touch interactions do not conflict with native scrolling.
- [x] Prevent architecture label/heading layering conflicts.
- [x] Reformat the main stylesheet so the motion layer can be maintained safely.

## Target choreography
`Hero responds -> user scrolls -> hero recedes -> systems activate -> architecture takes over -> globe becomes the focus -> principles settle -> CTA resolves`

Avoid: `Everything is constantly moving.`

## Current implementation notes
Primary files:
- `site/js/main.js`
- `site/js/motion-enhancement.js`
- `site/css/style.css`
- `site/css/motion-enhancement.css`
- `site/css/brand-lock.css`

Prefer CSS transforms, requestAnimationFrame, and the existing GSAP/ScrollTrigger setup. Avoid expensive filters, unnecessary DOM effects, and continuous animation of large element counts.

## Latest implementation pass
- Reformatted `site/css/style.css` into readable sections before continuing implementation.
- Preserved the My Systems palette and protected page/architecture backgrounds with `!important`.
- Added a structured interaction layer for hero depth, system pointer response, scroll activation, scroll velocity, and globe state/proximity signals.
- Kept the implementation focused on infrastructure/interface behaviour rather than decorative effects.

## Next pass
1. Connect globe proximity/state variables to the globe renderer so `aware`, `active`, and `settling` visibly affect rotation/activity.
2. Replace the remaining generic system signal loop with pointer/scroll-driven signal travel.
3. Complete full-page choreography and timing QA.
4. Audit all brand colors and browser/theme override protection.
5. Test performance, touch, keyboard and reduced-motion behaviour.

## Definition of done
The site should feel operational and alive when the viewer moves, hovers, scrolls, and interacts - not because it is constantly animated. It should still unmistakably feel like **My Systems**, not an Awwwards imitation.
