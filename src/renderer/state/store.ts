import type { State } from '../types/state';

import createStore from '../lib/store';

export default createStore<State>({
  entities: {
    board: new Map(),
    lane: new Map(),
    card: new Map()
  },
  selected: {
    board: null
  }
});
