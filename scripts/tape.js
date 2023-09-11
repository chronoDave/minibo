const glob = require('fast-glob');
const path = require('path');

const esbuild = require('./esbuild/esbuild');
const clean = require('./esbuild/plugins/clean');
const log = require('./esbuild/plugins/log');

const outdir = path.resolve(__dirname, '../build/test');

esbuild({
  entryPoints: [
    ...glob.sync('../src/app/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    }),
    ...glob.sync('../src/utils/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    })
  ],
  bundle: true,
  external: [
    'tape',
    'electron'
  ],
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  platform: 'node',
  outdir,
  outbase: 'src',
  plugins: [
    log('tape'),
    clean([
      path.resolve(outdir, 'app'),
      path.resolve(outdir, 'utils')
    ])
  ]
})();
