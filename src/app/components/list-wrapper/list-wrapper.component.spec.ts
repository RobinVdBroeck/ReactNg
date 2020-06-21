import { Component, EventEmitter } from '@angular/core';
import { fakeAsync, flush } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Item } from 'src/app/model';
import { v4 as uuid } from 'uuid';
import { ListWrapperComponent } from './list-wrapper.component';

// Because of ngOnChanges not being triggered automaticly in tests, we need to use a host component
@Component({
  template:
    '<app-list-wrapper [items]="items" (toggleCompletion)="onToggleCompletion($event)"></app-list-wrapper>',
})
class ListWrapperHostComponent {
  items: Item[];
  toggleCompletion = new EventEmitter<any>();

  onToggleCompletion(value: any) {
    this.toggleCompletion.emit(value);
  }
}

describe('ListWrapperComponent', () => {
  const createComponent = createComponentFactory({
    component: ListWrapperHostComponent,
    declarations: [ListWrapperComponent],
  });
  let spectator: Spectator<ListWrapperHostComponent>;
  let component: ListWrapperHostComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        items: [],
      },
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render original list', () => {
      expect(spectator.query('li')).toHaveLength(0);
    });

    it('should rerender when list changes', fakeAsync(async () => {
      spectator.setInput('items', [
        {
          id: uuid(),
          value: 'test',
          completed: false,
        },
      ]);

      expect(spectator.query('li')).toHaveLength(1);
    }));
  });

  describe('events', () => {
    it('should emit when li is clicked', fakeAsync(() => {
      spyOn(component.toggleCompletion, 'emit');
      const item = {
        id: uuid(),
        value: 'test',
        completed: false,
      };
      spectator.setInput('items', [item]);

      const selector = `li[data-key='${item.id}']`;
      spectator.click(selector);
      spectator.detectChanges();
      flush();

      expect(component.toggleCompletion.emit).toHaveBeenCalledWith(item.id);
    }));
  });
});
