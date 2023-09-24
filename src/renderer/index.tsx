import type { Board as BoardEntity } from '../types/entities';

import * as forgo from 'forgo';

import Board from './components/board/board';

const board: BoardEntity = {
  id: 'main',
  title: 'Minibo',
  lanes: [{
    id: '1',
    title: 'To-do',
    cards: [{
      id: '1',
      title: 'Create board',
      tags: [],
      description: 'Create a board',
      checklist: []
    }]
  }, {
    id: '2',
    title: 'In Progress',
    cards: []
  }, {
    id: '3',
    title: 'Done',
    cards: []
  }]
};

forgo.mount((
  <Board board={board} />
), document.body);
