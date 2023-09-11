import { app } from 'electron';
import fs from 'fs';

import appShape from '../types/shapes/app.shape';
import { IS_DEV } from '../utils/const';

import * as PATH from './const';
import createWindow from './lib/electron/window';
import Logger from './lib/logger/logger';
import Storage from './lib/storage/storage';

if (IS_DEV) {
  fs.mkdirSync(PATH.USER_DATA, { recursive: true });
  fs.mkdirSync(PATH.LOGS, { recursive: true });
}

const logger = new Logger({ root: PATH.LOGS });
const storage = {
  app: new Storage({ name: 'app', shape: appShape, root: PATH.USER_DATA })
};

app.whenReady()
  .then(() => {
    const window = createWindow({ storage: storage.app, logger });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });

    app.on('render-process-gone', (e, w, d) => {
      logger.error(new Error(JSON.stringify(d)));
      app.quit();
    });

    app.on('child-process-gone', (e, d) => {
      logger.error(new Error(JSON.stringify(d)));
      app.quit();
    });

    return window;
  })
  .catch(console.error);
