import type { Lane } from '../../../types/entities';

import isEqual from 'fast-deep-equal/es6';

import createSelector from '../selector';

import { boardSelector } from './board.selector';

export const laneSelector = createSelector(
  state => (id: string) => state().entities.lane.get(id) ?? null,
  (cur, next) => !isEqual(cur.entities.lane, next.entities.lane)
);

export const lanesSelector = createSelector(
  () => (id: string) => {
    const board = boardSelector.get(id);

    if (!board) return [];
    return Array.from(board.lanes)
      .reduce<Lane[]>((acc, cur) => {
        const lane = laneSelector.get(cur);
        if (lane) acc.push(lane);

        return acc;
      }, []);
  },
  (cur, next) => (
    boardSelector.shouldUpdate(cur, next) ||
    laneSelector.shouldUpdate(cur, next)
  )
);
