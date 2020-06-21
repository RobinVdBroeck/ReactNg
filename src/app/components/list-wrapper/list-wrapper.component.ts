import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Item } from 'src/app/model';
import { List } from '../list';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-list-wrapper',
  templateUrl: './list-wrapper.component.html',
  styleUrls: ['./list-wrapper.component.css'],
})
export class ListWrapperComponent implements AfterViewInit, OnChanges {
  @ViewChild('portal') portal: ElementRef;
  @Input() items: Item[];

  changeQueue = new ReplaySubject<Item[]>(1);

  ngAfterViewInit(): void {
    this.changeQueue.subscribe((_) => this.render());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeQueue.next(changes.items.currentValue);
  }

  private render() {
    const element = React.createElement(List, { items: this.items }, null);
    ReactDOM.render(element, this.portal.nativeElement);
  }
}
