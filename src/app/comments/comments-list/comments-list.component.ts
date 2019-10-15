import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Items } from '../../models/items';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromComment from '../reducers'
import { Location } from '@angular/common';
import * as fromItems from '../../reducers/items';
import { map } from 'rxjs/operators';
import * as commentsActions from '../actions/comments'

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit, OnDestroy {

  items$: Observable<Items>;
  private itemsLoading$: Observable<boolean>;
  private infiniteScollComponent: any;
  private subscriptions: Subscription[];

  constructor(private route: ActivatedRoute,
              private store: Store<fromComment.State>,
              private location: Location) { 
    this.items$ = this.store.pipe(select(fromComment.getSelectedItemChildren));
    this.itemsLoading$ = this.store.pipe(select(fromItems.isItemsLoading));
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.itemsLoading$.subscribe(loading => {
      if (!loading) {
        this.notifyScrollComplete();
      }
    }));
    this.subscriptions.push(this.route.params.pipe(
      map(params => new commentsActions.Select(parseInt(params.id, 10)))
    ).subscribe(this.store));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  load(event) {
    this.infiniteScollComponent = event.target;
    this.store.dispatch(new commentsActions.LoadMore());
  }

  goBack(): void {
    this.location.back();
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScollComponent){
      this.infiniteScollComponent.complete();
    }
  }
}
