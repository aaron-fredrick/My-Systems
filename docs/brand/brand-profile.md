# My Systems Brand Profile

## Identity

**My Systems** is a family of self-hosted, configurable systems built around ownership, control, interoperability and practical engineering.

The visual identity should feel:

- Technical
- Calm
- Precise
- Modular
- Trustworthy
- Practical
- Modern without being trendy

It should look like infrastructure built by an engineer, not a generic SaaS marketing site.

## Naming

Use the family pattern:

**My + concise system noun**

Examples: MyDNS, MyDrive, MyVault, MyAuth, MyProxy, MyMonitor.

Names should describe the system's primary responsibility. Avoid forced names and unnecessary projects.

## Colour System

The colour system uses neutral surfaces with restrained semantic accents. Individual systems may have their own accent while remaining visually part of the same family.

### Dark Theme

| Token | Purpose | Value |
| --- | --- | --- |
| `bg-0` | Main background | `#0B0F14` |
| `bg-1` | Elevated surface | `#111821` |
| `bg-2` | Interactive/elevated surface | `#18212B` |
| `border` | Subtle border | `#273341` |
| `text-primary` | Primary text | `#F3F6F8` |
| `text-secondary` | Secondary text | `#AEB9C4` |
| `text-muted` | Muted text | `#71808E` |
| `brand-primary` | Family brand | `#5BA7FF` |
| `brand-hover` | Brand interaction | `#79B8FF` |
| `success` | Success | `#52C788` |
| `warning` | Warning | `#E8B65A` |
| `error` | Error | `#F07178` |
| `info` | Informational | `#64B5F6` |

### Light Theme

| Token | Purpose | Value |
| --- | --- | --- |
| `bg-0` | Main background | `#F7F9FB` |
| `bg-1` | Elevated surface | `#FFFFFF` |
| `bg-2` | Interactive/elevated surface | `#EEF2F6` |
| `border` | Subtle border | `#D7DEE6` |
| `text-primary` | Primary text | `#17202A` |
| `text-secondary` | Secondary text | `#4E5B68` |
| `text-muted` | Muted text | `#748291` |
| `brand-primary` | Family brand | `#1769C2` |
| `brand-hover` | Brand interaction | `#0F57A4` |
| `success` | Success | `#18794E` |
| `warning` | Warning | `#9A6500` |
| `error` | Error | `#C23B42` |
| `info` | Informational | `#1769C2` |

## System Accents

System accents distinguish products without creating separate brands.

| System | Accent direction |
| --- | --- |
| MyDNS | Blue / network |
| MyDrive | Sky / storage |
| MyBackup | Violet / recovery |
| MyVault | Amber / security |
| MyAuth | Indigo / identity |
| MyProxy | Cyan / gateway |
| MyMonitor | Green / observability |
| MyHome | Teal / automation |
| MyNotify | Orange / notification |

Accents should be used selectively for system identification, active states, diagrams and key UI elements - not as large decorative colour blocks.

## Typography

Prefer a clean modern sans-serif for UI and documentation. Use a technical monospace face only for code, commands, identifiers and system-level metadata.

Hierarchy should be clear through size, weight and spacing rather than excessive colour.

## Layout

Use a restrained spacing scale:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px`

Prefer:

- clear content widths
- generous whitespace
- consistent alignment
- restrained borders
- modest corner radii
- information-dense but calm dashboards

## Components

Interactive components should define:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Success
- Warning
- Error

## Accessibility

- Maintain readable contrast in both themes.
- Do not communicate critical state through colour alone.
- Keep keyboard focus visible.
- Use comfortable interactive targets.
- Respect reduced-motion preferences.

## Visual Hierarchy

Prioritise:

**System state → primary action → important information → supporting metadata → decoration**

For infrastructure dashboards, health and failures should dominate the visual hierarchy.

## Voice

Documentation and product copy should be:

- Direct
- Technical
- Factual
- Clear
- Concise

Avoid exaggerated marketing language, vague claims and unnecessary buzzwords.

Prefer **"Run your own DNS resolver"** over **"Revolutionise your digital infrastructure."**

## Asset Structure

```text
brand/
├── logo/
│   ├── primary/
│   ├── monochrome/
│   └── mark/
├── icons/
├── screenshots/
├── diagrams/
└── README.md
```

The family identity is **My Systems**. Individual projects use the shared identity plus their system accent.

## Product Identity

A mature system should present:

- MyX name
- One-line description
- Version
- Documentation
- Repository
- License
- Supported deployment targets

The identity should remain consistent whether the system is viewed in a README, GitHub repository, documentation site or application UI.
