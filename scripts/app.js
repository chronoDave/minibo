import minimist from 'minimist';

import esbuild from './esbuild/esbuild.js';
import clean from './esbuild/plugins/clean.js';
import copy from './esbuild/plugins/copy.js';
import log from './esbuild/plugins/log.js';
import sass from './esbuild/plugins/sass.js';

const { watch, dev } = minimist(process.argv.slice(2));

/** App */
Promise.all([
  esbuild({
    entryPoints: [
      { in: 'src/app/index.ts', out: 'app' }
    ],
    external: [
      'electron'
    ],
    bundle: true,
    minify: !dev,
    platform: 'node',
    outdir: 'build/app',
    outbase: 'src/app',
    outExtension: {
      '.js': '.cjs'
    },
    plugins: [
      log('app'),
      copy([{
        in: 'src/app/assets',
        out: 'build/app/assets'
      }])
    ]
  })({ watch }),
  /** Renderer */
  esbuild({
    entryPoints: [
      'src/renderer/index.tsx',
      { in: 'src/renderer/index.scss', out: 'base' }
    ],
    bundle: true,
    minify: !dev,
    outdir: 'build/app/renderer',
    outbase: 'src/renderer',
    plugins: [
      log('renderer'),
      clean(['build/renderer']),
      sass({
        style: dev ?
          'expanded' :
          'compressed',
        depedencies: [
          'src/renderer/scss/core'
        ]
      }),
      copy([{
        in: 'src/renderer/index.html',
        out: 'build/app/renderer/index.html'
      }])
    ]
  })({ watch })
])
  .then(() => process.exit(0))
  .catch(console.error);
