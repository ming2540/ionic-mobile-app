import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Items } from 'src/app/models/items';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  
  @Input() items: Items;
  @Output() toOpen = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  openPage(url) {
    console.log(this.toOpen.emit(url))
    this.toOpen.emit(url);
  }

}
