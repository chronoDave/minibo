const minimist = require('minimist');

const esbuild = require('./esbuild/esbuild');
const clean = require('./esbuild/plugins/clean');
const copy = require('./esbuild/plugins/copy');
const log = require('./esbuild/plugins/log');
const sass = require('./esbuild/plugins/sass');

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
  .then(() => {
    if (!watch) process.exit(0)
  })
  .catch(console.error);
