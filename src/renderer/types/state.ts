import type { Board, Lane, Card } from '../../types/entities';

export type State = {
  entities: {
    board: Map<string, Board>
    lane: Map<string, Lane>
    card: Map<string, Card>
  },
  selected: {
    board: string | null
  }
};

export type Selector<T> = {
  get: T
  shouldUpdate: (cur: State, next: State) => boolean
};
