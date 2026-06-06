const fs = require('fs');
const path = require('path');

const srcDir = path.join('e:\\Winngoo-Awards', 'src');
console.log('Processing:', srcDir);

const replacements = [
  { search: '--color-gold-primary', replace: '--color-primary' },
  { search: '--color-gold-highlight', replace: '--color-primary-highlight' },
  { search: '--color-gold-shadow', replace: '--color-primary-shadow' },
  { search: '#D4A843', replace: '#C0C0C0' },
  { search: '#F5D070', replace: '#E5E4E2' },
  { search: '#8B6914', replace: '#808080' },
  { search: '212, 168, 67', replace: '192, 192, 192' },
  { search: '197, 154, 48', replace: '169, 169, 169' },
  { search: '#0A0814', replace: '#140B2D' },
  { search: '#12101F', replace: '#24124D' },
  { search: '#05040A', replace: '#0A0516' },
  { search: '13, 15, 26', replace: '36, 18, 77' },
  { search: '10, 8, 20', replace: '20, 11, 45' },
  { search: '#a67c00', replace: '#808080' },
  { search: '#5C450D', replace: '#696969' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      for (const { search, replace } of replacements) {
        // use split join to replace all instances globally, ignoring case for hex codes
        // For hex codes, we can use regex
        let pattern = search;
        if (search.startsWith('#')) {
          const reg = new RegExp(search, 'gi');
          content = content.replace(reg, replace);
        } else {
          content = content.split(search).join(replace);
        }
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
