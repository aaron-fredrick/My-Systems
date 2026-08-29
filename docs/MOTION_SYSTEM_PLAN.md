# My Systems Motion + Visual Design Plan

## Purpose
Build a high-end, Awwwards-standard interactive website for My Systems that remains highly usable and unmistakably part of the My Systems series.

The experience should feel like a living infrastructure system: responsive to the user's presence, deliberate during scroll, quiet when idle, and visually sophisticated without becoming a generic effects showcase.

## Visual direction
The graphic language is a controlled blend of:

| Influence | Weight | Role |
|---|---:|---|
| Minimalism | 30% | Foundation, whitespace, restraint, clarity |
| Swiss / International | 20% | Grid, typography, alignment, hierarchy, information structure |
| Futuristic | 20% | Spatial depth, system visualisation, responsive geometry |
| Glassmorphism | 12% | Selective translucent surfaces and overlays |
| Aurora | 10% | Atmospheric depth around major visual moments |
| Cyberpunk | 8% | Technical signals, active states, interaction details |

The weights are directional, not literal. Minimalism and Swiss structure remain dominant; futuristic interaction is the main differentiator; glass, aurora and cyberpunk are accents.

### Target aesthetic
**Swiss information architecture + futuristic infrastructure + restrained cyberpunk signals + selective glass surfaces + subtle aurora atmosphere.**

Do not turn this into a neon cyberpunk, glassmorphism or generic AI landing page.

## Brand constraints
- My Systems brand profile remains authoritative over aesthetic trends.
- Preserve the existing dark neutral foundation, restrained blue signal accent, established typography, modular composition, and technical/infrastructure identity.
- Keep the page dark but balanced; avoid crushing the visual hierarchy into near-black.
- Brand-sensitive colors remain protected by `site/css/brand-lock.css` and must use `!important` where necessary to defeat browser/theme overrides.
- No grain/noise.
- No decorative blobs.
- No purple/neon gradient treatment.
- No excessive glow or blur.
- No giant glowing cards.
- No random floating objects.
- No visual effect whose only purpose is to demonstrate animation.

## Swiss / information design principles
- Use a strong mathematical grid.
- Maintain deliberate alignment and spacing.
- Use large, confident typography with restrained technical labels.
- Preserve numerical indexing and thin structural rules.
- Use negative space as an active design element.
- Allow controlled asymmetry, but never ambiguous hierarchy.
- Text must remain readable and content must not depend on hover.

## Futuristic infrastructure language
Future-facing visuals should come from the system itself:
- topology
- nodes
- routing lines
- signal propagation
- system states
- spatial depth
- responsive geometry
- data-like transitions
- globe/network visualisation

## Glassmorphism rules
Glass is a depth mechanism, not the primary identity.

Use it selectively for:
- navigation surfaces
- contextual controls
- globe interaction controls
- small status surfaces
- CTA interaction states

Avoid turning the systems list into a grid of glass cards. Preserve the editorial/system-row treatment.

## Aurora rules
Aurora is atmospheric and subordinate.
- Very low contrast at idle.
- Used around major visual zones rather than behind every section.
- Can respond subtly to pointer position and scroll progress.
- Should feel like environmental light inside an infrastructure space.
- Never use permanent animated blobs.

## Cyberpunk rules
Cyberpunk appears mainly through interaction and technical state:
- signal lines
- active nodes
- cursor states
- system addressing
- tiny status changes
- restrained blue illumination

It should not dictate the page palette.

## User-friendliness / Awwwards standard
Awwwards is the quality benchmark for execution, not permission to compromise usability.

Required:
- navigation remains simple and predictable
- interactions are discoverable
- hover states have keyboard/focus equivalents
- important content is never hover-only
- touch interactions have intentional equivalents
- scrolling remains natural
- motion never blocks reading or navigation
- loading should not become theatrical
- reduced-motion remains fully usable
- interaction hit areas are generous enough for touch

The desired effect is **high visual sophistication with low cognitive friction**.

## Motion language
`proximity -> response -> momentum -> alignment -> signal -> transition`

The site should feel like a system responding to an operator.

### Hero
- Multi-layer pointer depth.
- Different parallax rates for copy, grid and network/orb layers.
- Subtle perspective response.
- Scroll-driven separation and exit.
- Motion settles cleanly when the pointer leaves.
- Mobile uses viewport/touch equivalents where useful.

### Scroll
- Scroll is continuous choreography, not a collection of fade-ups.
- Hero progressively recedes.
- Sections use different parallax depths.
- Architecture transitions into the globe rather than appearing as an isolated block.
- Systems rows become scroll-addressable.
- Principles resolve sequentially.
- CTA responds to scroll progress/velocity and settles.
- Scroll velocity is a transient motion signal and must decay.

### Systems
Each row behaves like an addressed interface schematic rather than a card.

On interaction:
- row shifts horizontally
- number responds
- system name tracks pointer slightly
- description moves at a different depth
- status responds
- structural signal line activates
- a signal travels through the line
- neighbouring rows recede subtly
- state resets completely on pointer/focus exit

### Globe
Three intentional states:

`IDLE -> INTERACTION -> RELEASE`

Idle:
- slow autonomous rotation
- continuous but restrained network activity

Pointer:
- slight pointer influence
- proximity response
- active nodes/connections

Drag:
- direct manipulation
- inertia after release
- gradual return to autonomous motion

The globe must visibly have a reason to exist even when untouched.

### Cursor
The cursor is an interface instrument:
- default technical reticle
- system: `VIEW`
- action: `OPEN`
- globe: `DRAG`
- link: directional cue

Keep states subtle and brand-consistent.

## Series-level rule
My Systems is a family of infrastructure projects. Every project should feel like a node in one ecosystem.

Recurring visual grammar:
- Blue = signal/interaction.
- Lines = connectivity.
- Movement = response/state.
- Nodes = systems/endpoints.
- Alignment = architecture/order.
- Proximity = attention.
- Scroll = progression through the system.

## Runtime architecture
- `site/js/main.js` - orchestration
- `site/js/config.js` - shared capability/accessibility flags
- `site/js/scroll.js` - GSAP/ScrollTrigger choreography + scroll velocity
- `site/js/pointer.js` - cursor, hero depth + magnetic controls
- `site/js/systems.js` - system-row interaction + scroll addressing
- `site/js/globe.js` - autonomous globe, node response, drag + inertia

CSS layers:
1. `base.css` - reset/tokens
2. `style.css` - visual/layout system
3. `motion-system.css` - motion rules
4. `brand-lock.css` - final brand-authoritative overrides

## Performance principles
- Prefer transforms and opacity for interactive movement.
- Keep pointer/scroll listeners passive where possible.
- Batch high-frequency CSS updates through RAF.
- Avoid redundant canvas redraws.
- Cap high-DPI canvas rendering at a practical DPR.
- Stop or reduce expensive work when visuals are offscreen where possible.
- Do not trade interaction smoothness for additional visual effects.

## Accessibility
- Respect `prefers-reduced-motion` globally.
- Preserve keyboard interaction and focus states.
- Never require a custom cursor for comprehension.
- Never make critical information hover-only.
- Ensure touch equivalents exist for meaningful pointer interactions.

## Current implementation
- Hero pointer depth and scroll choreography implemented.
- Magnetic controls implemented with reset behaviour.
- Cursor interaction states implemented.
- Systems movement/signal/scroll addressing implemented.
- Globe autonomous rotation, drag, inertia and node response implemented.
- Scroll velocity and settling implemented.
- Motion runtime split into dedicated modules.
- Globe and scroll rendering optimized.
- Brand colour authority retained.
- Grain/noise/decorative blob layer removed.

## Next implementation phase: visual finish
1. Apply the visual direction to the actual surface system: depth, selective glass and restrained aurora.
2. Rebalance section contrast without changing the core brand palette.
3. Refine grid/alignment and Swiss typographic hierarchy.
4. Make system interaction visually richer without turning rows into cards.
5. Refine globe/environment integration so architecture and globe read as one system.
6. Add final transition choreography between major sections.
7. Validate desktop, tablet and mobile interaction.
8. Run browser-level visual QA and tune durations, thresholds, easing, displacement and hit areas.
9. Profile canvas and scroll performance on lower-powered hardware.
10. Run final accessibility and brand-lock audit.

## Definition of done
The site should make the user think:

> **This website behaves like a system.**

It should be visually award-level, interactive and memorable, while remaining calm, legible, usable and recognisably My Systems.