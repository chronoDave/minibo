import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';

export default dirs => ({
  name: 'copy',
  setup: () => {
    const copy = dir => {
      console.time(`[copy] copied ${dir.in}`);
      fs.rmSync(
        path.resolve(process.cwd(), dir.out),
        { recursive: true, force: true }
      );
      fs.cpSync(
        path.resolve(process.cwd(), dir.in),
        path.resolve(process.cwd(), dir.out),
        { recursive: true }
      );
      console.timeEnd(`[copy] copied ${dir.in}`);
    };

    dirs.forEach(copy);

    chokidar.watch(dirs.map(dir => dir.in), {
      cwd: process.cwd(),
      awaitWriteFinish: true
    })
      .on('change', file => {
        const dir = dirs.find(x => file.split(path.sep).join(path.posix.sep).includes(x.in));
        if (dir) copy(dir);
      });
  }
});
