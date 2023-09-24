import type * as Entities from '../../../types/entities';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { subscribe } from '../../state/publisher';
import { lanesSelector } from '../../state/selectors/lane.selector';
import Lane from '../lane/lane';

import './board.scss';

export type BoardProps = {
  board: Entities.Board
};

const Board: Component<BoardProps> = () => {
  const component = new forgo.Component<BoardProps>({
    render(props) {
      const lanes = lanesSelector.get(props.board.id);

      return (
        <div class='Board'>
          <h1>{props.board.title}</h1>
          <ul>
            {lanes.map(lane => <Lane key={lane.id} lane={lane} />)}
          </ul>
        </div>
      );
    }
  });

  subscribe(lanesSelector.shouldUpdate)(component);

  return component;
};

export default Board;
