import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from './item/item.service';
import { OpenPageService } from './open-page/open-page.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ItemService, OpenPageService]
})
export class ServicesModule { }
