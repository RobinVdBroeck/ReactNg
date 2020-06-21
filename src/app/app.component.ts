import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Item } from './model';
import { v4 as uuid } from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { produce, current } from 'immer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  items$ = new BehaviorSubject<Item[]>([]);

  private set items(value: Item[]) {
    this.items$.next(value);
  }
  private get items(): Item[] {
    return this.items$.getValue();
  }

  newItem: Item = {
    id: uuid(),
    value: '',
    completed: false,
  };

  addItem() {
    this.items = produce(this.items, (items) => {
      items.push(this.newItem);
    });

    this.newItem = {
      id: uuid(),
      value: '',
      completed: false,
    };

    this.cdr.detectChanges();
  }

  onToggleCompletion(id: string) {
    this.items = produce(this.items, (draft) => {
      const currentItem = draft.find((item) => item.id === id);
      if (currentItem) { currentItem.completed = !currentItem.completed; }
      else { console.warn('illegal item with id ', id); }
    });
  }
}
