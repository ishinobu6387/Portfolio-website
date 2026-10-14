# Nobuhisa Ishiguro — Design System

An architecture portfolio design system for **Nobuhisa Ishiguro**, built from 39 spreads of a personal architecture portfolio (`uploads/NobuhisaIshiguroPortfolio*.jpg`) — model photography, floor plans, sections, and diagrammatic studies from projects including "The Working Multigenerational House," "Haus Gables," and a set of "Operational Verb" and "Diagrammatic" study models.

**Source repo:** `ishinobu6387/Portfolio-website` (GitHub) — at the time of this build the repo returned no tree (empty/no commits yet), so no code was imported from it. See `github.md`. If the repo is populated later, re-run a sync and this system should be rebuilt from the real site code instead of the portfolio JPGs alone.

## Index
- `styles.css` — root stylesheet, imports all tokens
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/base.css`
- `components/core/` — Button, Tag, NavLink, SectionLabel
- `components/layout/` — PageHeader, ProjectCard
- `guidelines/` — foundation specimen cards (Type, Colors, Spacing, Brand)
- `ui_kits/portfolio-site/` — splash page + table of contents + project page recreation
- `assets/imagery/` — photography and drawings lifted from the source portfolio
- `SKILL.md` — Claude Code-compatible skill wrapper

## Company / product context
Nobuhisa Ishiguro is an architecture student/designer; the portfolio is a single PDF-style deck ("Selected works 2025–2026") presented as full-bleed spreads: cover, then project sections each opening on a full-page hero render or model photo with a small caption block, followed by plans, sections, and diagrams. There is one surface to design for: **the portfolio website** — a splash/landing page and a table of contents leading into project detail pages, per the brief.

## Content fundamentals
- **Casing & voice:** titles and section labels are ALL CAPS, letterspaced, terse — "THE WORKING MULTIGENERATIONAL HOUSE," "SITE MODEL," "OPERATIONAL VERB STUDY MODELS," "SEQUENTIAL + COMPOSITE DIAGRAM." No exclamation, no marketing adjectives.
- **Register:** third-person/technical when labeling drawings ("MUSEUM BOARD + BRISTOL," "1/8" = 1'"), first-person only inside project narrative text ("My intention was to make the architecture dissolve into the experience of living" — quoted from critic Susana Torre, 2021, used as an epigraph).
- **Body copy** is set in serif italic/roman, essay-like and specific: e.g. the description of "Haus Gables" narrates a fictional inhabitant across "Year 1," "Year 5," "Year 9," "Year 27," "Year 49" with hard data points ("Number of books: 13,824"). Precision and quantification are part of the voice — dimensions, scales, material call-outs ("MUSEUM BOARD + BASSWOOD") appear as captions throughout.
- **No emoji, no icons-as-decoration, no exclamation points.** Tone is quiet, academic, confident without being promotional.
- **I vs. you:** essentially no direct address to a reader; copy narrates the work or an inhabitant, not "you." Keep any interface copy in this same observational register rather than second-person marketing voice.

## Visual foundations
- **Color:** strictly monochrome — black text (`--ink`) on warm off-white/paper backgrounds (`--paper`), full black title cards, and grayscale/greige model photography. Diagram-only accent colors appear inside individual drawings (sage green for "exposed/enclosed" diagrams, dusty rose figures, one navy-blue axonometric) — these are **project-diagram colors, not brand colors**; the system itself stays achromatic per the brief.
- **Type:** bold ALL-CAPS grotesque sans for every heading/label/title (source uses Proxima Nova); a classic Garamond serif, often italic, for quotes, captions, and narrative body copy. This pairing — heavy geometric caps vs. quiet italic serif — is the single most identifying visual signature of the brand and should be preserved everywhere.
- **Spacing:** generous, gallery-like whitespace. Titles sit isolated in large fields of blank paper (see cover: "PORTFOLIO" centered in the top third with acres of white below). Captions are small and pushed to a corner, never crowding the image.
- **Backgrounds:** full-bleed photography of physical study models (unpainted museum board / basswood, shot on seamless warm-gray or white sweep) and full-bleed line-art floor plans/sections on pure white. No gradients, no patterns, no textures beyond the actual paper-model grain in photos.
- **Animation:** none observed in source (static print deck). For the web, keep motion minimal and purposeful — short opacity/translate fades only (`--duration`, `--ease` tokens), no bounce/spring, echoing the deck's stillness.
- **Hover/press states:** treat like architectural drawing conventions, not app UI — invert (black⇄white) or underline-thicken on hover; press states darken slightly. No color hover states.
- **Borders:** avoid dividing lines/hairline rules as a default separator — prefer whitespace and scale contrast instead. Use a border only where there's a clear contrast between a subject and its background (e.g. a dark shape on the paper field), and then only a medium white rule — never a black/gray hairline as a structural device. `--radius:0` throughout, per the brief's "sharp, no curves" direction.
- **Shadows:** none in source material; the system uses flat fields and hairline borders instead of elevation shadows.
- **Imagery color vibe:** warm-neutral grayscale — bone/museum-board white, warm gray studio backdrops, occasional true-black voids (cut into a model to show a shaded interior). Photography reads as cool-neutral/architectural, not saturated.
- **Corner radii:** 0 everywhere — button, card, image crops are all hard right angles.
- **Cards:** no drop shadow, no rounded corners, no dividing border — separation comes from whitespace/margin alone; a project "card" is really just an image + all-caps label + serif caption stacked with generous margin.
- **Layout rules:** left/right or top-aligned title blocks next to (not on top of) full-bleed imagery; a fixed small scale/label annotation (e.g. "LEVEL 03," "1/8"=1'") anchored bottom-left of plan drawings.
- **Transparency/blur:** not used in source; skip glassmorphism/blur effects entirely.

## Iconography
The source portfolio contains **no icon system, no logo, and no illustrated icon set** — it is composed entirely of photography, line-drawn architectural plans/sections, and typography. Per instructions, no logo was invented. Wherever a mark would normally go, the design system renders the name "NOBUHISA ISHIGURO" in the display type. The only "iconographic" elements native to the brand are the architectural drawing conventions themselves (north arrows, door-swing arcs, dimension ticks, small human silhouette figures) — these should be treated as content/imagery, not as a reusable UI icon font. If the product needs interface icons (menu, close, arrow), this system uses plain typographic glyphs (×, →, ↓) or minimal 1px-stroke line icons at 24px, never emoji or filled icon styles.

## Font substitution
- **Proxima Nova** (headings) — now loaded from the real Adobe Fonts (Typekit) kit at `use.typekit.net/vfx5fqd.css`, family name `proxima-nova`. Montserrat remains as a fallback if the kit fails to load.
- **Garamond** (body/quotes) — still substituted with **EB Garamond** (Google Fonts), a close open revival. Share the real Garamond cut if you have it and it can be swapped in the same way.

## Components
- `components/core/Button` — sharp-edged primary/outline/ghost buttons, all-caps label type
- `components/core/Tag` — hairline-bordered metadata tag (material, scale, year)
- `components/core/SectionLabel` — small tracked-out caption/eyebrow label
- `components/core/NavLink` — underline-on-hover text link for TOC/nav
- `components/layout/PageHeader` — full-bleed title block (name + selected-works line)
- `components/layout/ProjectCard` — image + all-caps title + serif caption, used in the TOC grid

## UI kit
`ui_kits/portfolio-site/index.html` — an interactive splash page that transitions into a table-of-contents grid, then into a sample project detail page, built from the components above and the source imagery.

## Intentional additions
No component inventory was defined by a codebase/Figma source (the GitHub repo was empty), so a small necessary set was authored from scratch to serve the one product (portfolio website): Button, Tag, SectionLabel, NavLink, PageHeader, ProjectCard — sized only to what the splash/TOC/project-page flow needs.
