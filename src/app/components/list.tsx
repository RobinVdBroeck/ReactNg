import * as React from 'react';
import { Item } from '../model';

interface Props {
  items: Item[];
  toggleCompletion(id: string): void;
}

export const List: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li
          key={item.id}
          data-key={item.id}
          onClick={($event) => {
            $event.preventDefault();
            props.toggleCompletion(item.id);
          }}
        >
          {item.value} {item.completed ? 'COMPLETED' : 'NOT COMPLETED'}
        </li>
      ))}
    </ul>
  );
};
