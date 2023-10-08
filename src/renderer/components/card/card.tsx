import type * as Entities from '../../../types/entities';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './card.scss';

export type CardProps = {
  card: Entities.Card
  lane: string
};

const Card: Component<CardProps> = () => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      const handleDragStart = (event: forgo.JSX.TargetedDragEvent<HTMLElement>) => {
        const root = event.currentTarget.closest('.Card')!;

        root?.classList.add('dragging');

        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer?.setDragImage(root, 0, 0);
        event.dataTransfer?.setData('text/plain', JSON.stringify({
          type: 'card',
          id: props.card.id,
          lane: props.lane
        }));
      };

      const handleDragEnd = (event: forgo.JSX.TargetedDragEvent<HTMLElement>) => {
        const root = event.currentTarget.closest('.Card');

        root?.classList.remove('dragging');
      };

      return (
        <article
          class='Card Paper'
          ondragstart={handleDragStart}
          ondragend={handleDragEnd}
        >
          <div class='title'>
            <span class='draggable' draggable>
              <Icon icon='drag' />
            </span>
            <h3 class='body'>{props.card.title}</h3>
          </div>
          <div class='body'>
            <p>{props.card.description}</p>
          </div>
        </article>
      );
    }
  });

  return component;
};

export default Card;
