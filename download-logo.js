const fs = require('fs');
const https = require('https');
const path = require('path');

console.log('🎨 AquaIntel Logo Generator\n');

// Download a simple placeholder from a public API
const downloadPlaceholder = async () => {
  const assetsDir = path.join(__dirname, 'assets');
  const logoPath = path.join(assetsDir, 'logo.png');
  
  // Check if logo already exists
  if (fs.existsSync(logoPath)) {
    console.log('✅ logo.png already exists!');
    console.log('   Location:', logoPath);
    console.log('\n   Delete it first if you want to regenerate.\n');
    return;
  }
  
  console.log('📥 Downloading placeholder logo...\n');
  
  // Using a simple placeholder service
  const url = 'https://via.placeholder.com/1024/FF9933/FFFFFF.png?text=AquaIntel';
  
  const file = fs.createWriteStream(logoPath);
  
  https.get(url, (response) => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log('✅ Created placeholder logo!');
      console.log('   Location:', logoPath);
      console.log('   Size: 1024x1024 pixels\n');
      console.log('⚠️  This is a temporary placeholder.');
      console.log('   For a professional logo, see LOGO_FIX.md\n');
      console.log('🚀 You can now run:');
      console.log('   eas build -p android --profile preview\n');
    });
  }).on('error', (err) => {
    fs.unlink(logoPath, () => {});
    console.error('❌ Error downloading placeholder:', err.message);
    console.log('\n📝 Manual solution:');
    console.log('   1. Go to https://via.placeholder.com/1024/FF9933/FFFFFF.png?text=AquaIntel');
    console.log('   2. Right-click and save as logo.png');
    console.log('   3. Move to assets/ folder\n');
  });
};

// Create assets directory if needed
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
  console.log('📁 Created assets/ directory\n');
}

downloadPlaceholder();
