import type { State } from '../types/state';

import store from './store';

const selector = <T extends (...args: any[]) => any>(
  get: (state: () => State) => T,
  shouldUpdate: (cur: State, next: State) => boolean
) => ({ get: get(store), shouldUpdate });

export default selector;
