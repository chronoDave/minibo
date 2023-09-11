import type { Shape } from '../../../types/primitives';

import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';

import parse from '../../../utils/shape/parse';

export type StorageOptions<T> = {
  root: string
  name: string
  shape: T
};

export default class Storage<T extends Shape> {
  private readonly _root: string;

  protected readonly _file: string;
  protected _shape: T;

  private _read() {
    try {
      return parse<T>(fs.readFileSync(this._file, 'utf-8'));
    } catch (err) {
      return null;
    }
  }

  constructor(options: StorageOptions<T>) {
    this._root = options.root;
    this._shape = Object.seal(options.shape);
    this._file = path.join(this._root, `${options.name}.json`);

    const json = this._read();
    if (json) this._shape = merge<T>(this._shape, json);

    Object.seal(this._shape);
  }

  get() {
    return this._shape;
  }

  set(shape: T) {
    this._shape = shape;
    fs.writeFileSync(
      this._file,
      JSON.stringify(this._shape, null, '\t')
    );

    return this._shape;
  }
}
