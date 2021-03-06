import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items } from '../models/items';
import { Subscription, Observable, from } from 'rxjs';

import * as fromTopStories from './reducers';
import * as topStoriesActions from './actions/top-stories';
import * as fromAuth from '../auth/reducers/';
import { Store, select } from '@ngrx/store';
import { LoadingController, ToastController } from '@ionic/angular';
import { filter, concatMap, map } from 'rxjs/operators';
import { OpenPageService } from '../services/open-page/open-page.service';
import { Logout } from '../auth/actions/auth';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
})
export class TopStoriesComponent implements OnInit, OnDestroy {

  items$: Observable<Items>;
  private itemsLoading$: Observable<boolean>;
  private idsLoading$: Observable<boolean>;
  private error$: Observable<any>;
  private loading: HTMLIonLoadingElement;
  private subscriptions: Subscription[];
  private infiniteScrollComponent: any;
  private refresherComponent: any;
  loggedIn$: Observable<boolean>;
  user$: Observable<any>;


  constructor(private store: Store<fromTopStories.State>,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private openPageService: OpenPageService) {

    this.items$ = store.pipe(select(fromTopStories.getDisplayItems), map(items => items.results));
    
    this.itemsLoading$ = store.pipe(select(fromTopStories.isItemLoading));
    this.idsLoading$ = store.pipe(select(fromTopStories.isTopStoriesLoading));
    this.error$ = store.pipe(select(fromTopStories.getError), filter(error => error != null));
    // this.loggedIn$ = store.pipe(select(fromAuth.))
    this.user$ = store.pipe(select(fromAuth.getUser));
    this.subscriptions = [];
    }

  ngOnInit() {
    this.subscriptions.push(this.itemsLoading$.subscribe(
      loading => {
        if(!loading) {
          this.notifyScrollComplete();
        }
    }));
    this.subscriptions.push(this.idsLoading$.pipe(concatMap(loading => {
      return loading ? from(this.showLoading()) : from(this.hideLoading());
    })).subscribe());
    this.subscriptions.push(this.error$.pipe(concatMap(error => from(this.showError(error)))).subscribe());
    this.doLoad(true);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  load(event) {
    this.infiniteScrollComponent = event.target;    
    this.doLoad(true);
  }

  refresh(event) {
    this.refresherComponent = event.target;
    this.doLoad(true);
  }

  doLoad(refresh: boolean) {
    if (refresh) {
      this.store.dispatch(new topStoriesActions.Refresh());
    } else {
      this.store.dispatch(new topStoriesActions.LoadMore());
    }
  }
  
  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

  private showLoading(): Promise<void> {
    return this.hideLoading().then(() => {
      return this.loadingCtrl.create({
        message: 'Loading...',
      }).then(loading => {
        this.loading = loading;
        return this.loading.present();
      });
    });
  }

  private hideLoading(): Promise<void> {
    if (this.loading) {
      this.notifyRefreshComplete();
      return this.loading.dismiss().then(() => null);
    }
    return Promise.resolve();
  }

  private showError(error: any): Promise<void> {
    return this.toastCtrl.create({
      message: `An error occured: ${error}`,
      duration: 3000,
      showCloseButton: true,
    }).then(toast => toast.present());
  } 

  openUrl(url) {
    this.openPageService.open(url);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
