import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './button.scss';

export type ButtonProps = {
  onClick: (event: forgo.JSX.TargetedMouseEvent<HTMLButtonElement>) => void
};

const Button: Component<ButtonProps> = () => {
  const component = new forgo.Component<ButtonProps>({
    render(props) {
      return (
        <button
          class='Button'
          type='button'
          onclick={event => props.onClick(event)}
        >
          {props.children}
        </button>
      );
    }
  });

  return component;
};

export default Button;
