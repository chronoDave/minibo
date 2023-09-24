import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { subscribe } from '../../state/publisher';
import { selectedBoardSelector } from '../../state/selectors/board.selector';
import Board from '../board/board';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const board = selectedBoardSelector.get();

      if (!board) return <div>Loading...</div>;
      return <Board board={board} />;
    }
  });

  subscribe(selectedBoardSelector.shouldUpdate)(component);

  return component;
};

export default App;
