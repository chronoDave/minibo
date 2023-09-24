import type * as Entities from '../../../types/entities';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Lane from '../lane/lane';

import './board.scss';

export type BoardProps = {
  board: Entities.Board
};

const Board: Component<BoardProps> = () => {
  const component = new forgo.Component<BoardProps>({
    render(props) {
      return (
        <div class='Board'>
          <h1>{props.board.title}</h1>
          <ul>
            {props.board.lanes.map(lane => <Lane lane={lane} />)}
          </ul>
        </div>
      );
    }
  });

  return component;
};

export default Board;
