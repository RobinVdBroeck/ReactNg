import { async, flush, fakeAsync } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ListWrapperComponent } from './list-wrapper.component';
import { v4 as uuid } from 'uuid';
import { Component, Input } from '@angular/core';
import { Item } from 'src/app/model';

// Because of ngOnChanges not being triggered automaticly in tests, we need to use a host component
@Component({
  template: '<app-list-wrapper [items]="items"></app-list-wrapper>',
})
class ListWrapperHostComponent {
  @Input() items: Item[];
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
