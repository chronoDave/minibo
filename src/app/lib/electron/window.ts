import type { AppShape } from '../../../types/shapes/app.shape';
import type Logger from '../logger/logger';
import type Storage from '../storage/storage';

import { BrowserWindow } from 'electron';
import { produce } from 'immer';

import appShape from '../../../types/shapes/app.shape';
import { IS_DEV } from '../../../utils/const';
import debounce from '../../utils/debounce';

export type WindowOptions = {
  storage: Storage<AppShape>,
  logger: Logger
};

export default (options: WindowOptions) => {
  const window = new BrowserWindow({
    ...options.storage.get().window,
    title: 'Minibo',
    minWidth: appShape.window.width,
    minHeight: appShape.window.height,
    webPreferences: {
      enableWebSQL: false
    }
  });

  const onResize = debounce(() => {
    const { width, height } = window.getBounds();

    options.storage.set(produce(draft => {
      draft.window.width = width;
      draft.window.height = height;
    })(options.storage.get()));
  }, 100);

  const onMove = debounce(() => {
    const [x, y] = window.getPosition();

    options.storage.set(produce(draft => {
      draft.window.x = x;
      draft.window.y = y;
    })(options.storage.get()));
  }, 100);

  window.on('resize', onResize);
  window.on('move', onMove);

  window.once('ready-to-show', () => {
    window.show();

    if (IS_DEV) {
      // eslint-disable-next-line global-require
      require('chokidar')
        .watch(`${__dirname}/renderer/**/*`)
        .on('change', () => window.reload());
    }
  });

  window.loadFile('renderer/index.html');

  return window;
};
