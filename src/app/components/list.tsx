import * as React from 'react';
import { Item } from '../model';

interface Props {
  items: Item[];
}

export const List: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  );
};
