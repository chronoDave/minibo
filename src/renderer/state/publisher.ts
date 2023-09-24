import type { State } from '../types/state';
import type { Component } from 'forgo';

import createPublisher from '../lib/publisher';

type Message = {
  cur: State,
  next: State
};

export const publisher = createPublisher<Message>();

export const subscribe = (shouldUpdate: (cur: State, next: State) => boolean) =>
  (component: Component<any>) => {
    const subscriber = (message: Message) => {
      if (shouldUpdate(message.cur, message.next)) component.update();
    };

    component.mount(() => publisher.subscribe(subscriber));
    component.unmount(() => publisher.unsubscribe(subscriber));
  };
