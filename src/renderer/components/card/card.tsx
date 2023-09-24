import type * as Entities from '../../../types/entities';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './card.scss';

export type CardProps = {
  card: Entities.Card
};

const Card: Component<CardProps> = () => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      return (
        <article class='Card Paper'>
          <h3 class='title body'>{props.card.title}</h3>
        </article>
      );
    }
  });

  return component;
};

export default Card;
