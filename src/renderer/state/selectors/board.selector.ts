import isEqual from 'fast-deep-equal/es6';

import createSelector from '../selector';

export const boardSelector = createSelector(
  state => (id: string) => state().entities.board.get(id) ?? null,
  (cur, next) => !isEqual(cur.entities.board, next.entities.board)
);

export const selectedBoardSelector = createSelector(
  state => () => {
    if (!state().selected.board) return null;
    return state().entities.board.get(state().selected.board!) ?? null;
  },
  (cur, next) => (
    !isEqual(cur.entities.board, next.entities.board) ||
    cur.selected.board !== next.selected.board
  )
);
