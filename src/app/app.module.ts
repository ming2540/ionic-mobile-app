import { NgModule, NgZone, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';
import { reducers, CustomRouterStateSerializer } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './effects/items';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { HACKER_NEWS_DB } from './hackernews-db';
import { AngularFireAuthModule } from '@angular/fire/auth'


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.app_db),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx HNC DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ItemEffects]),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    {
      provide: HACKER_NEWS_DB,
      useFactory: (platformId: Object, zone: NgZone) => 
        new AngularFireDatabase(environment.hackernews_db, 'HackerNews', null, platformId, zone),
        deps: [PLATFORM_ID, NgZone]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
