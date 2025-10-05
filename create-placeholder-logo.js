// create-placeholder-logo.js
// This creates a simple placeholder logo if you don't have one yet

const fs = require('fs');
const path = require('path');

console.log('📱 Creating placeholder logo for AquaIntel...\n');

// SVG placeholder logo
const createSVGLogo = (size, text) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="#FF9933"/>
  
  <!-- Blue circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#000080" opacity="0.9"/>
  
  <!-- Water droplet shape -->
  <path d="M ${size/2} ${size/2 - size/6} 
           Q ${size/2 - size/8} ${size/2} ${size/2} ${size/2 + size/6}
           Q ${size/2 + size/8} ${size/2} ${size/2} ${size/2 - size/6}" 
           fill="#FFFFFF" opacity="0.8"/>
  
  <!-- Text -->
  <text x="${size/2}" y="${size - 50}" 
        font-family="Arial, sans-serif" 
        font-size="${size/12}" 
        font-weight="bold" 
        fill="#FFFFFF" 
        text-anchor="middle">${text}</text>
</svg>`;
};

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// Check if logo.png already exists
const logoPath = path.join(assetsDir, 'logo.png');
if (fs.existsSync(logoPath)) {
  console.log('✅ logo.png already exists!');
  console.log('   Delete it first if you want to regenerate.\n');
  process.exit(0);
}

// Create SVG logo
const svgLogo = createSVGLogo(1024, 'AquaIntel');
const svgPath = path.join(assetsDir, 'logo.svg');
fs.writeFileSync(svgPath, svgLogo);

console.log('✅ Created logo.svg');
console.log('   Location:', svgPath);
console.log('\n⚠️  Important: You need to convert SVG to PNG!');
console.log('\n📝 Options to create logo.png:\n');
console.log('   1. Use an online SVG to PNG converter:');
console.log('      • https://cloudconvert.com/svg-to-png');
console.log('      • https://svgtopng.com/');
console.log('      • https://convertio.co/svg-png/\n');
console.log('   2. Use a design tool:');
console.log('      • Canva (https://canva.com) - Free, easy to use');
console.log('      • Figma (https://figma.com) - Professional design tool');
console.log('      • GIMP (free Photoshop alternative)\n');
console.log('   3. Use ImageMagick (if installed):');
console.log('      magick convert assets/logo.svg -resize 1024x1024 assets/logo.png\n');
console.log('   4. Download a free icon:');
console.log('      • https://www.flaticon.com/search?word=water');
console.log('      • https://icons8.com/icons/set/water\n');
console.log('🎯 Quick solution: Use Canva');
console.log('   1. Go to canva.com');
console.log('   2. Create 1024x1024 design');
console.log('   3. Use water droplet template');
console.log('   4. Add "AquaIntel" text');
console.log('   5. Download as PNG\n');
