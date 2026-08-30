# My Systems Motion + Visual Design Plan

## Core concept — V2
**My Systems = Interactive Infrastructure.**

The website is not a conventional landing page with animations applied to it. The interface itself represents a living personal infrastructure network. Typography, navigation, topology, system states, signals, scroll progression and the globe are all parts of one system.

The target experience is:
> **This website behaves like a system.**

Awwwards is the execution benchmark — composition, originality, interaction quality, transitions, responsiveness, accessibility and performance — not a template to imitate.

## Visual direction
Controlled blend:
- Minimalism — 30%: whitespace, restraint, clarity.
- Swiss / International — 20%: grid, typography, alignment, information architecture.
- Futuristic — 20%: spatial depth, topology, responsive geometry, system visualisation.
- Glassmorphism — 12%: selective depth surfaces only.
- Aurora — 10%: environmental light around active visual moments.
- Cyberpunk — 8%: signals, technical states and interaction feedback.

The proportions are directional. Minimalism and Swiss structure dominate; futuristic infrastructure provides the identity; glass, aurora and cyberpunk remain supporting accents.

## Anti-template rules
Do not make My Systems resemble a generic AI/startup/creative developer landing page.
- No generic hero + decorative blob + feature-card formula.
- No grain/noise.
- No floating blobs.
- No purple/neon gradient treatment.
- No giant glowing cards.
- No excessive glassmorphism.
- No excessive glow/blur.
- No random 3D objects.
- No animation whose only purpose is to show animation.
- Do not turn the systems list into cards.
- Do not use trendy effects merely because they are common on award-gallery sites.

## Brand constraints
- My Systems brand profile is authoritative over trend influences.
- Preserve the dark neutral foundation, established typography, restrained blue signal accent, modular composition and infrastructure language.
- Keep the page dark but balanced; do not crush surfaces into near-black.
- All brand-sensitive colors are ultimately protected by `site/css/brand-lock.css` using `!important` where necessary to defeat browser/theme overrides.
- New visual effects may use transparency derived from the existing brand palette, but must not introduce an unrelated accent palette.

## Information design
Swiss principles provide the structural skeleton:
- mathematical grid
- deliberate alignment
- strong typographic hierarchy
- large confident type
- numerical indexing
- technical labels
- thin structural rules
- generous negative space
- controlled asymmetry
- no ambiguous hierarchy

## Interactive Infrastructure model
The website should behave as a stateful system rather than a sequence of isolated hover effects.

Core language:
`presence -> proximity -> response -> signal -> momentum -> alignment -> transition`

### Global interaction
User presence is an input. The interface responds through position, depth, signal strength and state — not through constant decoration.

Idle state is calm.
Interaction increases system activity.
Leaving an interaction causes the state to decay and settle.

## Hero — system initialization
The hero should no longer read as a conventional static hero.

Conceptual state:
`SYSTEM INITIALIZATION -> SYSTEM ONLINE`

Composition should combine:
- typography
- structural grid
- system state metadata
- network/topology geometry
- atmospheric light
- pointer depth

The topology is part of the hero composition, not an unrelated decoration.

Pointer:
- heading/copy respond at different depths
- network responds independently
- atmosphere follows subtly
- cursor becomes a system instrument

Scroll:
- hero progressively separates/recedes
- topology/network transitions toward the ecosystem
- state changes through movement rather than a simple fade-up

## Systems — interactive topology
The systems section is a major interaction moment.

The list remains editorial rather than card-based, but behaves like an addressed network.

Concept:
`SYSTEM ADDRESSING ACTIVE`

Interaction with a system should cause:
- row displacement
- number activation
- name movement
- description depth response
- status response
- signal line activation
- travelling signal pulse
- neighbouring systems to recede
- complete state reset on exit

The system topology track establishes the idea that these rows are endpoints in one infrastructure rather than unrelated portfolio items.

### V2 target
As the user progresses through the section, the editorial list should increasingly transition toward topology. The eventual interaction model can allow a selected system to become the network focus rather than simply highlighting a row.

## Architecture — network established
The architecture section is the conceptual bridge:
`SYSTEM TOPOLOGY -> WORLD NETWORK`

The globe must have a reason to exist. It represents the geographic/spatial manifestation of the system network, not a decorative globe.

State:
`NETWORK ESTABLISHED`

Globe:
- slow autonomous rotation when idle
- network signals continuously travel
- pointer proximity activates nodes/connections
- direct drag manipulates the globe
- release produces inertia
- motion settles back into autonomous rotation
- touch has equivalent direct manipulation

Future refinement:
- system topology can transition visually into globe connections
- active system can influence the globe's network emphasis
- architecture copy and globe should feel like one composition

## Scroll — primary narrative interaction
Scroll is not merely an entrance trigger.

Target narrative:

`SYSTEM INITIALIZATION`
→ hero establishes presence

`ADDRESSING`
→ systems activate

`NETWORK ESTABLISHED`
→ topology becomes spatial/geographic

`CONNECTED`
→ architecture/globe becomes dominant

`INDEPENDENT BY DEFAULT`
→ information settles

`SYSTEM READY`
→ CTA resolves the narrative

Scroll velocity is a transient signal: fast movement can create momentum; slow movement settles the system.

## Cursor
The cursor is an interface instrument, not decoration:
- default: technical reticle
- interactive system: `VIEW`
- action: `OPEN`
- globe: `DRAG`
- link: directional cue

Cursor state must always have a non-cursor equivalent for accessibility/touch.

## Glassmorphism
Glass is used only when something needs to visually float above the system:
- navigation
- contextual controls
- compact status surfaces
- globe controls/hints
- CTA interaction state

Avoid making the entire page glass.

## Aurora
Aurora is environmental light created around important system activity.
- subtle at idle
- stronger around active zones
- may respond to pointer/scroll
- derived from the existing blue brand signal
- never represented as permanent floating blobs

## Cyberpunk
Cyberpunk is an interaction/state language:
- signal pulses
- active nodes
- status indicators
- technical metadata
- restrained blue illumination

It does not control the overall palette.

## User-friendliness
Awwwards-quality visuals cannot compromise UX.
- navigation stays simple
- interaction affordances are discoverable
- important information is never hover-only
- keyboard focus mirrors pointer interaction
- touch equivalents exist
- scrolling stays natural
- text never becomes obscured by animation
- hit areas are appropriate for touch
- loading remains functional rather than theatrical
- reduced-motion remains usable

## Performance
- Prefer transform/opacity for DOM motion.
- Passive pointer/scroll listeners where possible.
- Batch high-frequency writes with RAF.
- Avoid redundant canvas redraws.
- Cap canvas DPR at a practical level.
- Reduce expensive work when offscreen.
- Keep animation smoothness above effect count.

## Accessibility
- Respect `prefers-reduced-motion` globally.
- Preserve keyboard/focus interaction.
- Never require custom cursor for comprehension.
- Never hide critical information behind hover.
- Provide touch equivalents.
- Maintain readable contrast and hierarchy.

## Runtime architecture
JS modules:
- `site/js/main.js` — orchestration
- `site/js/config.js` — capability/accessibility flags
- `site/js/scroll.js` — scroll choreography + velocity
- `site/js/pointer.js` — pointer depth + magnetic controls
- `site/js/systems.js` — system addressing/topology interaction
- `site/js/globe.js` — globe rotation/drag/inertia/network

CSS layers:
1. `base.css` — reset/tokens
2. `style.css` — core layout/visual system
3. `motion-system.css` — motion rules
4. `visual-finish.css` — single visual/art-direction refinement layer
5. `brand-lock.css` — final brand authority

Do not create another competing visual CSS layer.

## Current V2 implementation
- Interactive infrastructure hero metadata/topology introduced.
- Systems addressing metadata and signal tracks introduced.
- Architecture network state introduced.
- CTA system-ready state introduced.
- Visual finish layer contains Swiss grid, selective glass, aurora and signal treatments.
- Globe has autonomous rotation, drag, inertia, proximity response and network signals.
- Scroll and globe rendering have been optimized.
- Brand colour lock remains final.
- Grain/noise/decorative blob direction remains excluded.

## Next implementation stages
### Stage A — composition transformation
- Turn the hero topology into a meaningful responsive composition.
- Make systems transition from editorial rows into an actual topology as scroll progresses.
- Connect the topology transition conceptually to the globe.

### Stage B — interaction choreography
- Implement system selection/addressing state machine.
- Let selected systems influence nearby topology and globe emphasis.
- Make scroll states explicit and reversible.
- Add transition continuity between sections.

### Stage C — visual refinement
- Tune Swiss grid density and typography.
- Tune glass surfaces by context.
- Tune aurora intensity and environmental response.
- Tune cyberpunk signal density.
- Maintain balanced darkness and brand palette.

### Stage D — UX/performance
- Desktop/tablet/mobile QA.
- Touch interaction QA.
- Keyboard/accessibility QA.
- Reduced-motion QA.
- Canvas/GPU performance profiling.
- Eliminate text overlaps and stuck interaction states.

### Stage E — final award-level polish
- Timing/easing choreography.
- Transition continuity.
- Interaction latency.
- Visual hierarchy.
- Responsive composition.
- Final originality review: remove anything that feels like a generic award-gallery/template effect.

## Definition of done
The website must be:
- visually distinctive rather than trend-dependent
- interactive without being confusing
- technically coherent with the My Systems concept
- recognisably part of the My Systems series
- performant and accessible
- visually sophisticated enough to compete at an Awwwards level

Most importantly:
> **The interface should feel like the user's infrastructure responding to them.**
