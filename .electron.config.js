const url = require('url');
const path = require('path');

module.exports = {
  appId: 'com.electron.minibo',
  productName: 'Minibo',
  copyright: 'Copyright © 2023 ${author}',
  extraMetadata: {
    main: 'app.js'
  },
  directories: {
    output: path.join(__dirname, 'dist')
  },
  files: [
    '!**/*',
    'LICENSE',
    'package.json',
    { from: 'build/app' }
  ],
  npmRebuild: false,
  // Windows
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true
  },
  win: {
    target: [
      { target: 'portable', arch: 'x64' }
    ],
    icon: path.resolve(__dirname, 'build/app/assets/app.ico'),
    publisherName: 'Chronocide'
  }
}