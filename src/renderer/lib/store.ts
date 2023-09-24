import { produce, enableMapSet } from 'immer';

enableMapSet();

const store = <T extends Record<string, unknown>>(initial: T) => {
  let state = initial;

  return (next?: (cur: T) => void) => {
    if (next) state = produce(state, next);
    return state;
  };
};

export default store;
