import { execFile } from 'child_process';
import chokidar from 'chokidar';

const run = () => {
  console.log('[electron] starting electron');

  const childProcess = execFile('node', [
    './node_modules/electron/cli.js',
    'build/app/app.cjs'
  ]);

  childProcess.stdout.on('data', console.log);
  childProcess.stderr.on('data', console.error);

  return childProcess;
};

let app = run();
chokidar.watch([
  'build/app/app.cjs'
]).on('change', () => {
  console.log('[electron] detected change, restarting');
  app.kill('SIGINT');
  app = run();
});
