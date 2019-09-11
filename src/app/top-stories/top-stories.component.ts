import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items } from '../models/items';
import { Subscription } from 'rxjs';
import { ItemService } from '../services/item/item.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
})
export class TopStoriesComponent implements OnInit, OnDestroy {

  items: Items;
  private offset = 0;
  private limit = 10;
  private subscription: Subscription

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.get()
      .subscribe(items => {console.log(items);this.items = items});
    this.doLoad(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doLoad(refresh: boolean) {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
    this.offset += this.limit;
  }

}
