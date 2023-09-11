import type { Json } from '../../types/primitives';

const isJson = (x: unknown): x is Json =>
  x === null ||
  typeof x === 'number' ||
  typeof x === 'string' ||
  typeof x === 'boolean' ||
  (Array.isArray(x) && x.every(isJson)) ||
  (typeof x === 'object' && Object.values(x).every(isJson));

export default isJson;
