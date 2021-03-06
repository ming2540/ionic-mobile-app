import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { TopStoriesRoutingModule } from './top-stories-routing.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TopStoriesComponent } from './top-stories.component';
import { StoreModule } from '@ngrx/store';
import { reducers as topStoriesReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TopStoriesEffects } from './effects/top-stories';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [TopStoriesComponent],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TopStoriesComponent,
      }
    ]),
    // TopStoriesRoutingModule
    StoreModule.forFeature('topStories', topStoriesReducer),
    EffectsModule.forFeature([TopStoriesEffects])
  ]
})
export class TopStoriesModule { }
