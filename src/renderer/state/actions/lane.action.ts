import type { Card } from '../../../types/entities';

import createId from '../../../utils/id/id';
import createAction from '../action';

export const moveCard = (card: string, from: string, to: string) =>
  createAction(state => {
    state.entities.lane.get(from)?.cards.delete(card);
    state.entities.lane.get(to)?.cards.add(card);
  });

export const createCard = (lane: string) => {
  const card: Card = {
    id: createId(),
    title: 'Card',
    tags: new Set()
  };

  createAction(state => {
    state.entities.card.set(card.id, card);
    state.entities.lane.get(lane)?.cards.add(card.id);
  });
};
