import type * as Entities from '../../../types/entities';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Card from '../../components/card/card';
import { moveCard } from '../../state/actions/lane.action';
import { subscribe } from '../../state/publisher';
import { cardsSelector } from '../../state/selectors/card.selector';

import './lane.scss';

export type LaneProps = {
  lane: Entities.Lane
};

const Lane: Component<LaneProps> = () => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const cards = cardsSelector.get(props.lane.id);

      const handleDrop = (event: forgo.JSX.TargetedDragEvent<HTMLUListElement>) => {
        try {
          const data = JSON.parse(event.dataTransfer!.getData('text/plain'));
          if (data.type === 'card') {
            event.preventDefault();
            moveCard(data.id, data.lane, props.lane.id);
          }
        } catch (err) {
          console.error(err);
        }
      };

      const handleDragOver = (event: forgo.JSX.TargetedDragEvent<HTMLUListElement>) => {
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
      };

      return (
        <div class='Lane'>
          <h2>{props.lane.title}</h2>
          <ul
            ondrop={handleDrop}
            ondragover={handleDragOver}
          >
            {cards.map(card => (
              <Card
                key={card.id}
                lane={props.lane.id}
                card={card}
              />
            ))}
          </ul>
        </div>
      );
    }
  });

  subscribe(cardsSelector.shouldUpdate)(component);

  return component;
};

export default Lane;
