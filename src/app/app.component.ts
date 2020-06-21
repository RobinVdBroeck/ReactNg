import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Item } from './model';
import { v4 as uuid } from 'uuid';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  items$ = new BehaviorSubject<Item[]>([]);

  newItem: Item = {
    id: uuid(),
    value: '',
    completed: false,
  };

  addItem() {
    this.items$.next([...this.items$.getValue(), this.newItem]);

    this.newItem = {
      id: uuid(),
      value: '',
      completed: false,
    };

    this.cdr.detectChanges();
  }
}
