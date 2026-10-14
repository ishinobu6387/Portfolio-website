// Regenerates index.html (the published page) from Portfolio.dc.html (the Claude Design source):
// same document, plus the tab title, description, favicon and Adobe Fonts link in <head>.
// Run after editing or re-exporting Portfolio.dc.html:  node build.js
const fs = require('fs');
const path = require('path');

const VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1">';
const HEAD = [
  VIEWPORT,
  '<title>Nobuhisa Ishiguro — Selected Works</title>',
  '<meta name="description" content="Architecture portfolio of Nobuhisa Ishiguro: Haus Gables precedent study, Mapmaker’s Imaginarium, and The Working Multigenerational House.">',
  '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
  '<link rel="stylesheet" href="https://use.typekit.net/vfx5fqd.css">'
].join('\n');

const src = fs.readFileSync(path.join(__dirname, 'Portfolio.dc.html'), 'utf8');
if (!src.includes(VIEWPORT)) throw new Error('viewport meta not found in Portfolio.dc.html');
fs.writeFileSync(path.join(__dirname, 'index.html'), src.replace(VIEWPORT, HEAD));
console.log('index.html rebuilt from Portfolio.dc.html');
