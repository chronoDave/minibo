import type * as Entities from '../../../types/entities';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Card from '../card/card';

import './lane.scss';

export type LaneProps = {
  lane: Entities.Lane
};

const Lane: Component<LaneProps> = () => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      return (
        <div class='Lane'>
          <h2>{props.lane.title}</h2>
          <ul>
            {props.lane.cards.map(card => <Card card={card} />)}
          </ul>
        </div>
      );
    }
  });

  return component;
};

export default Lane;
