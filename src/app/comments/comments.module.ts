import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CommentsEffects } from './effects/comments';


@NgModule({
  declarations: [CommentsListComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    StoreModule.forFeature('comments', reducers),
    EffectsModule.forFeature([CommentsEffects]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommentsModule { }
