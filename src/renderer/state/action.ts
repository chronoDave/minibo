import type { State } from '../types/state';

import { publisher } from './publisher';
import store from './store';

const action = (produce: (state: State) => void) => {
  const cur = store();
  const next = store(produce);

  publisher.publish({ cur, next });
};

export default action;
