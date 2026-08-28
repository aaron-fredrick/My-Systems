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
Awwwards' current inspiration taxonomy repeatedly treats scrolling, interaction design, microinteractions, parallax, responsive behaviour, storytelling, transitions, gestures, and 3D/WebGL as separate quality dimensions. The benchmark for My Systems is interaction quality and choreography, while the visual language remains technical and infrastructure-oriented.

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
The interaction code is now intentionally split by responsibility:

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

### Completed
- Multi-layer hero pointer depth and subtle perspective response.
- Hero scroll separation and exit choreography.
- Magnetic controls with explicit pointer-exit reset.
- System rows respond through movement, alignment and signal-line behaviour.
- Scroll-addressed system row state.
- Explicit system hover/focus reset to prevent the previous stuck-border behaviour.
- Autonomous globe rotation while idle.
- Direct globe drag with inertia.
- Globe node/connection proximity response.
- Differentiated section reveal timing.
- Architecture/globe transition choreography.
- Scroll velocity as a transient input that settles back to zero.
- Touch-compatible pointer events for globe manipulation.
- Reduced-motion handling across the modular runtime.
- No grain/noise/decorative blob layer.

### Next QA pass
- Test the live page at desktop, tablet and mobile widths.
- Tune motion amplitude from real rendered behaviour rather than increasing effects blindly.
- Check all hero and architecture text for overlap during scroll.
- Verify system borders and active classes always clear after pointer/focus transitions.
- Tune globe drag inertia, hover hit areas and mobile gesture feel.
- Profile canvas rendering on lower-power hardware.
- Verify brand-lock colours remain authoritative after all CSS refactoring.
- Only after QA, consider additional scroll-linked transitions.
