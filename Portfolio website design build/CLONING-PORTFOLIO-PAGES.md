# Cloning a printed portfolio sheet into the website

The repeatable process behind pages 02–18 (Multigenerational House) and 19–30
(Mapmaker's Imaginarium). Follow it verbatim for any further project.

## 1. Read the printed sheet
Every page in `uploads/page jpg/` is 5100×3300 (a 2000×1294 sheet, aspect 1.5456).
For each sheet, note as **fractions of the sheet**:
- each photo/drawing box (left, top, width, height)
- each text block's left/top/width and its alignment
- which images bleed off an edge (give those a box that overshoots by 0.1–0.2%)

## 2. Prepare the artwork — never place a raw export
Raw drawing sheets are letter-portrait with acres of white margin, sometimes
rotated, and photos are 8–14k px. Three passes, all via `run_script`:

1. **Trim** — downscale to 700px wide, scan for the ink bounding box
   (`alpha>10 && (r<242||g<242||b<242)`), map back to full resolution, crop with
   a few px of padding. Output to `assets/<proj>/t/`.
2. **Rotate when the book rotates it** — the five MGH level plans are drawn
   portrait and printed landscape: rotate −90° *before* trimming. Plans that
   share a scale across pages must be cropped to one **common window** (the union
   bbox), not to each drawing's own bbox — otherwise they drift page to page.
3. **Downscale photos** to ≤2000–2400px and re-encode as JPEG via
   `canvas.convertToBlob({type:'image/jpeg', quality:.86})`. 5 MB → ~200 KB.
   Output to `assets/<proj>/s/`. (`toBlob` does not exist in the sandbox;
   `convertToBlob` does.)

If a diagram exists only in the printed PDF, crop it straight out of the page
JPG (that is how `mmi/t/program-circ.jpg` and `mmi/t/seq-panels.jpg` were made).

## 3. Size drawing boxes from the artwork's own aspect
`contain` letterboxes, which shifts the ink off the printed position. Derive the
box height from the trimmed file:

    h% = w% × 1.5456 / (imgWidth / imgHeight)

Photos use `cover` and can be any shape — the crop editor pans them.

## 4. Author the page as data
One `page()` block per sheet in `PROJECTS[].blocks`:

    page('20 — Diagrammatic study models', [
      F('a', 0, 0, 50, 100, 'assets/mmi/s/study-3.jpg'),
      F('b', 50.2, 0, 49.8, 49.5, 'assets/mmi/s/study-1.jpg')
    ], [
      T(8, 25, 34, 'center', [LN('h2', 'Diagrammatic study models'),
                              LN('sub', 'Museum board + basswood', .5)])
    ])

- `F(slot, l, t, w, h, src, fit)` — `slot` letters a…h key the crop store, so
  keep a letter on the same photo across edits.
- `T(l, t, w, align, lines)`, `LN(role, text, marginTopVw)`.
- Type comes only from `ROLE` (`h1 h2 h3 sub cap tiny sc body note`), sized in
  `vw` so it tracks the sheet. Write copy in sentence case; the roles apply the
  caps. Never hand-set a font size on a page.
- The sheet label (`'20 — …'`) becomes `data-screen-label`, so review comments
  name the right page.

## 5. The one runtime trap
Whole-value template holes — `style`, `ref`, `onClick` — bind **once per template
node**, and one node is reused for every project's block at the same index. A
`style="left:{{ f.l }}"` hole silently keeps the first project's numbers.
So geometry, crop and type travel as **string** `data-` attributes
(`data-geo`, `data-tgeo`, `data-img`, `data-role`, `data-slot`) and
`paintPages()` writes the inline styles after every render. `scanLayout()`
caches each element's untouched geometry once and restores it every pass, so
`paintPages()` must also *rebase* that cache — it does.

When frames change shape, bump `LAYOUT_KEY` and the `CROP_V` migration so
overrides saved against the old markup are dropped.

## 6. Verify by measurement, not by eye
Screenshots of a long scrolling stack are unreliable. Read the geometry back:

    pages = [...document.querySelectorAll('[data-om-page]')]

and compare each child's rect, as a percentage of the page rect, against the
fractions measured in step 1. Check one page in **each** project after
switching projects — that is where the stale-hole bug shows up.
