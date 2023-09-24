import type { Card } from '../../../types/entities';

import isEqual from 'fast-deep-equal/es6';

import createSelector from '../selector';

import { laneSelector } from './lane.selector';

export const cardSelector = createSelector(
  state => (id: string) => state().entities.card.get(id) ?? null,
  (cur, next) => !isEqual(cur.entities.card, next.entities.card)
);

export const cardsSelector = createSelector(
  () => (id: string) => {
    const lane = laneSelector.get(id);

    if (!lane) return [];
    return Array.from(lane.cards)
      .reduce<Card[]>((acc, cur) => {
        const card = cardSelector.get(cur);
        if (card) acc.push(card);

        return acc;
      }, []);
  },
  (cur, next) => (
    cardSelector.shouldUpdate(cur, next) ||
    laneSelector.shouldUpdate(cur, next)
  )
);
