/* eslint-disable @typescript-eslint/no-require-imports */
// This file ensures compatibility with GitHub Pages
const fs = require('fs');
const path = require('path');

// Import the TypeScript config
require('ts-node/register');
const tsConfig = require('./next.config.ts').default;

// Add a custom export handler
const nextConfig = {
  ...tsConfig,
  // Add this to ensure .nojekyll file is created
  async afterExport() {
    const outDir = path.join(process.cwd(), 'out');
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  }
};

module.exports = nextConfig;