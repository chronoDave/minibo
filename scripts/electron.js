const { execFile } = require('child_process');
const chokidar = require('chokidar');

const run = () => {
  console.log('[electron] starting electron');

  const childProcess = execFile('node', [
    './node_modules/electron/cli.js',
    'build/app/app.js'
  ]);

  childProcess.stdout.on('data', console.log);
  childProcess.stderr.on('data', console.error);

  return childProcess;
};

let app = run();
chokidar.watch([
  'build/app/app.js'
])
  .on('change', () => {
    console.log('[electron] detected change, restarting');
    app.kill('SIGINT');
    app = run();
  })
  .on('error', err => {
    app.kill('SIGINT');
    console.error(err);
  });
