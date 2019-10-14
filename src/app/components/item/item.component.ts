import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';
import { InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { OpenPageService } from '../../services/open-page/open-page.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {

  @Input() item: Item;
  @Output() toOpen = new EventEmitter<string>();
  constructor() { }

  openPage(url: string): void {
    this.toOpen.emit(url);
  }
}
