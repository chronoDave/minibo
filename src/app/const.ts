import { app } from 'electron';
import path from 'path';

import { IS_DEV } from '../utils/const';

export const USER_DATA = IS_DEV ?
  path.resolve(__dirname, '../../data/userData') :
  app.getPath('userData');
export const LOGS = IS_DEV ?
  path.resolve(__dirname, '../../data/logs') :
  path.resolve(app.getPath('logs'), app.getName());
