import * as forgo from 'forgo';

import App from './modules/app/app';
import store from './state/store';

store(state => {
  state.entities.board.set('id', {
    id: 'id',
    title: 'Default',
    lanes: new Set(['todo', 'inprogress', 'done']),
    tags: new Set()
  });
  state.entities.lane.set('todo', {
    id: 'todo',
    title: 'To-do',
    cards: new Set(['1'])
  });
  state.entities.lane.set('inprogress', {
    id: 'inprogress',
    title: 'In progress',
    cards: new Set()
  });
  state.entities.lane.set('done', {
    id: 'done',
    title: 'Done',
    cards: new Set()
  });
  state.entities.card.set('1', {
    id: '1',
    title: 'Minibo',
    tags: new Set()
  });

  state.selected.board = 'id';
});

forgo.mount(<App />, document.body);
