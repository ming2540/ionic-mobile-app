import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CommentsComponent } from './comments/comments.component';
import { ItemComponent } from './item/item.component';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [TimeAgoPipe, ItemComponent, ItemsComponent, CommentComponent, CommentsComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ItemsComponent, CommentsComponent],
})
export class ComponentsModule { }
