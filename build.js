// Regenerates index.html (the published page) from Portfolio.dc.html (the Claude Design source):
// same document, plus what a published page needs that the design file doesn't carry —
// the tab title, description, share-preview tags, favicon and Adobe Fonts link in <head>, and a
// plain-text copy of the portfolio for anything that reads the page without running its script
// (search engines, link previews, the site reviewers that security filters rely on).
// Run after editing or re-exporting Portfolio.dc.html:  node build.js
const fs = require('fs');
const path = require('path');

const SITE = 'https://nobuhisaishiguro.studio/';
const TITLE = 'Nobuhisa Ishiguro — Selected Works';
const DESCRIPTION = 'Portfolio for Nobuhisa Ishiguro, Architecture student at Carnegie Mellon University: ' +
  'Haus Gables precedent study, Mapmaker’s Imaginarium, and The Working Multigenerational House.';
const NAME_JA = '石黒　伸寿';

// Structured data (schema.org JSON-LD): tells search engines who the site belongs to, and that the
// Instagram and LinkedIn profiles are the same person — the signal behind name searches.
const PERSON_ID = SITE + '#person';
const STRUCTURED = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Nobuhisa Ishiguro',
      alternateName: [NAME_JA, NAME_JA.replace(/\s/g, '')],
      url: SITE,
      jobTitle: 'Architecture student',
      affiliation: { '@type': 'CollegeOrUniversity', name: 'Carnegie Mellon University', url: 'https://www.cmu.edu/' },
      sameAs: [
        'https://www.instagram.com/hisart341',
        'https://www.linkedin.com/in/nobuhisa-ishiguro-343b433a9'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': SITE + '#website',
      url: SITE,
      name: 'Nobuhisa Ishiguro',
      alternateName: NAME_JA,
      description: 'Portfolio for Nobuhisa Ishiguro, Architecture student at Carnegie Mellon University',
      inLanguage: 'en',
      author: { '@id': PERSON_ID },
      about: { '@id': PERSON_ID }
    }
  ]
}, null, 2).replace(/</g, '\\u003c');   // a "<" in the data must not end the script tag

const VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1">';
const HEAD = [
  VIEWPORT,
  `<title>${TITLE}</title>`,
  `<meta name="description" content="${DESCRIPTION}">`,
  '<meta name="author" content="Nobuhisa Ishiguro">',
  `<link rel="canonical" href="${SITE}">`,
  '<meta property="og:type" content="website">',
  `<meta property="og:url" content="${SITE}">`,
  `<meta property="og:title" content="${TITLE}">`,
  `<meta property="og:description" content="${DESCRIPTION}">`,
  `<meta property="og:image" content="${SITE}assets/splash/multigenerational-house-1.jpg">`,
  '<meta name="twitter:card" content="summary_large_image">',
  '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
  '<link rel="stylesheet" href="https://use.typekit.net/vfx5fqd.css">',
  // React from this site, not unpkg.com (which some school, office and parental-control networks
  // block). support.js only fetches React from the CDN when it isn't already loaded. These are
  // react@18.3.1 / react-dom@18.3.1, byte-identical to the SRI hashes pinned in support.js.
  '<script src="vendor/react.production.min.js"></script>',
  '<script src="vendor/react-dom.production.min.js"></script>',
  `<script type="application/ld+json">
${STRUCTURED}
</script>`,
  '<noscript><style>x-dc{display:none!important}html,body{background:#f7f6f2!important}</style></noscript>'
].join('\n');

// Shown only when scripts don't run; everyone else gets the designed site.
const NOSCRIPT = `<noscript>
<div style="min-height:100vh;background:#f7f6f2">
<div style="max-width:640px;margin:0 auto;padding:64px 24px;font-family:'EB Garamond',Garamond,'Times New Roman',serif;color:#161513;background:#f7f6f2;line-height:1.6">
<h1 style="font-family:Montserrat,'Helvetica Neue',Arial,sans-serif;font-size:18px;letter-spacing:.14em;text-transform:uppercase">Nobuhisa Ishiguro</h1>
<p lang="ja" style="margin-top:-8px">${NAME_JA}</p>
<p>Portfolio for Nobuhisa Ishiguro, Architecture student at Carnegie Mellon University. Selected works — studio projects, shown through physical models, orthographic drawings, diagrams and project statements.</p>
<h2 style="font-family:Montserrat,'Helvetica Neue',Arial,sans-serif;font-size:14px;letter-spacing:.14em;text-transform:uppercase">Poiesis II</h2>
<ol>
<li><strong>Haus Gables Precedent</strong> — a precedent study of Haus Gables by Jennifer Bonner (Atlanta, Georgia): orthographic drawings, an isometric section, ventilation and isovist diagrams, and a physical model.</li>
<li><strong>Map Maker’s Imaginarium</strong> — iterative design through the grid system: an imaginarium for a cartographer, developed through diagrammatic and representational study models, plans, elevations and sections.</li>
<li><strong>The Working Multigenerational House</strong> — a house made of bookshelves that grows with a family’s collection over fifty years, shown through study, site and final models, plans, sections and an unfolded interior section.</li>
</ol>
<h2 style="font-family:Montserrat,'Helvetica Neue',Arial,sans-serif;font-size:14px;letter-spacing:.14em;text-transform:uppercase">Poiesis III</h2>
<p>Projects in progress.</p>
<p>This site needs JavaScript to show the full portfolio. Contact: <a href="https://www.linkedin.com/in/nobuhisa-ishiguro-343b433a9">LinkedIn</a> · <a href="https://www.instagram.com/hisart341">Instagram</a></p>
</div>
</div>
</noscript>`;

const src = fs.readFileSync(path.join(__dirname, 'Portfolio.dc.html'), 'utf8');
if (!src.includes(VIEWPORT)) throw new Error('viewport meta not found in Portfolio.dc.html');
if (!src.includes('<html>')) throw new Error('<html> tag not found in Portfolio.dc.html');
if (!src.includes('<body>\n')) throw new Error('<body> tag not found in Portfolio.dc.html');
const out = src
  .replace('<html>', '<html lang="en">')
  .replace(VIEWPORT, HEAD)
  .replace('<body>\n', '<body>\n' + NOSCRIPT + '\n');
fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log('index.html rebuilt from Portfolio.dc.html');
