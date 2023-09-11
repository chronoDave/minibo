import fs from 'fs';
import path from 'path';

export default dirs => ({
  name: 'clean',
  setup: build => {
    build.onStart(() => {
      dirs.forEach(dir => {
        const folder = path.isAbsolute(dir) ?
          dir :
          path.join(process.cwd(), dir);

        fs.rmSync(folder, {
          recursive: true,
          force: true
        });
      });
    });
  }
});
