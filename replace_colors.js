const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /192,\s*192,\s*192/g, replace: '142, 31, 48' },
  { regex: /169,\s*169,\s*169/g, replace: '115, 24, 38' },
  { regex: /157,\s*78,\s*221/g, replace: '142, 31, 48' },
  { regex: /20,\s*11,\s*45/g, replace: '26, 10, 14' },
  { regex: /10,\s*8,\s*20/g, replace: '15, 5, 8' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replace } of replacements) {
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Color replacement complete.');
