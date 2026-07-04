const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const exts = ['.tsx', '.ts', '.jsx', '.js', '.css', '.md'];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (exts.includes(path.extname(entry.name))) {
      replaceInFile(full);
    }
  }
}

function replaceInFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // Replace common Tailwind purple classes to emerald
  content = content
    .replace(/from-purple/g, 'from-emerald')
    .replace(/to-purple/g, 'to-emerald')
    .replace(/bg-purple/g, 'bg-emerald')
    .replace(/text-purple/g, 'text-emerald')
    .replace(/hover:bg-purple/g, 'hover:bg-emerald')
    .replace(/hover:text-purple/g, 'hover:text-emerald')
    .replace(/shadow-purple/g, 'shadow-emerald')
    .replace(/ring-purple/g, 'ring-emerald')
    .replace(/border-purple/g, 'border-emerald')
    .replace(/focus:border-purple/g, 'focus:border-emerald')
    .replace(/from-purple-600/g, 'from-emerald-600')
    .replace(/from-purple-500/g, 'from-emerald-500')
    .replace(/from-purple-400/g, 'from-emerald-400')
    .replace(/to-purple-600/g, 'to-emerald-600')
    .replace(/to-purple-500/g, 'to-emerald-500')
    .replace(/to-purple-400/g, 'to-emerald-400')
    .replace(/purple-600/g, 'emerald-600')
    .replace(/purple-500/g, 'emerald-500')
    .replace(/purple-400/g, 'emerald-400');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}

walk(srcDir);
console.log('Replacement complete');
