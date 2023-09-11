import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type AppShape = Constrain<Json, {
  window: {
    width: number
    height: number
    x: number
    y: number
  }
}>;

const appShape: Readonly<AppShape> = {
  window: {
    width: 640,
    height: 480,
    x: -1,
    y: -1
  }
};

export default appShape;
