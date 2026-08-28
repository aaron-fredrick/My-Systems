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

## Research-derived benchmark
Awwwards' current inspiration taxonomy repeatedly treats **scrolling, interaction design, microinteractions, parallax, responsive behaviour, storytelling, transitions, gestures, and 3D/WebGL** as separate quality dimensions. Recent examples also explicitly combine scroll + interaction + animation, mobile interaction + 3D, reactive cursors, and parallax rather than relying on static hover decoration.

The important lesson is not to copy the visual style of award-winning creative sites. Awwwards itself has highlighted the risk of copying fashionable layouts/effects without a clear brand concept. For My Systems, the benchmark is therefore **interaction quality and choreography**, while the visual language remains technical and infrastructure-oriented.

Research references:
- Awwwards single-page directory / interaction taxonomy: https://www.awwwards.com/websites/single-page-1/
- Awwwards scroll + animation + microinteraction example: https://www.awwwards.com/inspiration/scrolling-stats-tear-the-paper-ceiling
- Awwwards mobile scroll / responsive / 3D example: https://www.awwwards.com/inspiration/mobile-scroll-and-interactions-noomo-labs
- Awwwards cursor-led minimal interaction example: https://www.awwwards.com/inspiration/cursor-led-minimal-animations-shaaz-jung
- Awwwards interactive homepage example: https://www.awwwards.com/inspiration/interactive-homepage-range-rak
- Awwwards design-strategy warning against trend copying: https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf

## Motion language
`proximity -> response -> momentum -> alignment -> signal -> transition`

The site should feel like a system responding to an operator.

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
- [x] Active/scroll-active rows now use a controlled signal pulse instead of only a static border.

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
- [x] Consolidate motion CSS into a dedicated `motion-system.css` layer.
- [x] Remove the duplicate motion runtime from the page; `main.js` is now the functional interaction runtime.

## Target choreography
`Hero responds -> user scrolls -> hero recedes -> systems activate -> architecture takes over -> globe becomes the focus -> principles settle -> CTA resolves`

Avoid: `Everything is constantly moving.`

## Current implementation architecture
- `site/css/base.css` - reset/accessibility primitives.
- `site/css/style.css` - existing visual/layout/component styling.
- `site/css/motion-system.css` - motion-only presentation rules and interaction states.
- `site/css/brand-lock.css` - final brand/color authority and browser/theme override protection.
- `site/js/main.js` - GSAP/ScrollTrigger choreography, cursor, magnetic interactions, system activation, scroll velocity, and globe renderer/interaction.
- `site/index.html` - loads the layers in order: base -> visual -> motion -> brand lock.

The previous `motion-enhancement.css` / `motion-enhancement.js` layer has been removed from the runtime so there is no second animation system fighting `main.js`.

## Latest implementation pass
- Added a dedicated `motion-system.css` so motion presentation is no longer mixed into the visual layer.
- Consolidated the page runtime around `main.js`, eliminating duplicate hero/system/globe listeners.
- Added stateful system signal pulses for addressed rows.
- Preserved the existing brand palette and final brand-lock layer.
- Kept architecture text above the globe to prevent the previously observed overlap.
- Kept motion quiet when there is no interaction except for intentional globe/network activity.

## Next pass
1. Connect globe proximity/state variables directly to renderer behaviour so `aware`, `active`, and `settling` have visibly distinct but restrained responses.
2. Replace the remaining always-running globe signal activity with sparse stateful signals while retaining autonomous rotation.
3. Build a unified section-progress choreography rather than isolated ScrollTrigger timelines.
4. Add touch-specific interaction rules without hijacking native scroll.
5. Perform visual/performance QA at desktop, tablet, and mobile sizes.
6. Audit all brand colors and browser/theme override protection after final styling changes.

## Definition of done
The site should feel operational and alive when the viewer moves, hovers, scrolls, and interacts - not because it is constantly animated. It should still unmistakably feel like **My Systems**, not an Awwwards imitation.
