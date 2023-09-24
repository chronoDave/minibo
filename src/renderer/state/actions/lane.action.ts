import createAction from '../action';

export const moveCard = (card: string, from: string, to: string) =>
  createAction(state => {
    state.entities.lane.get(from)?.cards.delete(card);
    state.entities.lane.get(to)?.cards.add(card);
  });
