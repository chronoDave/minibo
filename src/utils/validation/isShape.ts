import type { Shape } from '../../types/primitives';

import isJson from './isJson';
import isObject from './isObject';

export default <T extends Shape = Shape>(x: unknown): x is T =>
  isObject(x) &&
  Object.values(x).every(isJson);
