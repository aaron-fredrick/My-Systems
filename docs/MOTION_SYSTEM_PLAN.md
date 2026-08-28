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
Awwwards' inspiration categories treat scrolling, interaction design, microinteractions, parallax, responsive behaviour, storytelling, transitions, gestures, and 3D/WebGL as distinct quality dimensions. My Systems uses these as a quality benchmark while deliberately retaining its own technical/infrastructure visual language.

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

## Runtime architecture
The interaction code is intentionally split by responsibility:
- `site/js/main.js` - orchestration only
- `site/js/config.js` - shared capability and accessibility flags
- `site/js/scroll.js` - GSAP/ScrollTrigger choreography and scroll velocity
- `site/js/pointer.js` - cursor, hero depth and magnetic controls
- `site/js/systems.js` - system-row interaction and scroll addressing
- `site/js/globe.js` - autonomous globe, node response, drag and inertia

CSS remains layered as:
1. `base.css` - reset/tokens
2. `style.css` - visual/layout system
3. `motion-system.css` - motion rules
4. `brand-lock.css` - final brand-authoritative overrides

## Implementation status
### Final interaction pass implemented
- Multi-layer hero pointer depth and perspective response.
- Hero scroll separation and exit choreography.
- Stronger magnetic controls with explicit pointer-exit reset.
- Cursor states for links, actions, system viewing and globe manipulation.
- System rows respond through independent movement, alignment and signal behaviour.
- Scroll-addressed system row state with neighbouring-row recession.
- Explicit system hover/focus reset to prevent stuck interaction borders.
- Autonomous globe rotation while idle.
- Direct globe drag with inertia and release settling.
- Globe node/connection proximity response and travelling network signals.
- Differentiated section reveal timing.
- Architecture/globe transition choreography.
- Scroll velocity as a transient input that settles back to zero.
- Pointer/touch-compatible globe manipulation.
- Reduced-motion handling across the modular runtime.
- No grain/noise/decorative blob layer.
- Brand colour authority retained in the final CSS layer.

## Final QA sequence
1. Validate desktop, tablet and mobile rendering.
2. Tune motion amplitude from rendered behaviour rather than adding effects blindly.
3. Verify hero and architecture text never overlap during scroll.
4. Verify system borders/classes clear after pointer, focus and scroll transitions.
5. Tune globe hit areas, drag inertia and touch gesture feel.
6. Profile canvas rendering on lower-power hardware.
7. Verify `brand-lock.css` remains the final authoritative colour layer.
8. Perform a final choreography pass so the page reads as one continuous narrative: hero -> systems -> architecture/globe -> principles -> CTA.
9. Do not add further effects unless they improve comprehension, responsiveness or storytelling.
