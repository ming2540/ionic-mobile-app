import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import * as fromComments from '../reducers/';
import { Observable, of } from 'rxjs';
import { CommentsActionTypes } from '../actions/comments';
import { switchMap, mergeMap, take, withLatestFrom, map } from 'rxjs/operators';
import * as commentsActions from '../actions/comments';
import { Item } from 'src/app/models/item';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as itemActions from '../../actions/items'
import { pageSize } from '../reducers/pagination';


@Injectable()
export class CommentsEffects {
    constructor(private actions$: Actions,
                private store: Store<fromComments.State>,
                private db: AngularFireDatabase) {}
    
    @Effect()
    loadComment$: Observable<Action> = this.actions$.pipe(
        ofType(CommentsActionTypes.Select),
        switchMap((action: commentsActions.Select) => 
            this.db.object(`v0/item/${action.payload}`).valueChanges().pipe(
                take(1),
                mergeMap((item: Item) => of<Action>(
                    new itemActions.LoadSuccess([item]),
                    new commentsActions.LoadSuccess(item),
                    new itemActions.Load((item.kids || []).slice(0, pageSize))))
            )
        )
    )

    @Effect()
    loadMore$: Observable<Action> = this.actions$.pipe(
        ofType(CommentsActionTypes.LoadMore),
        withLatestFrom(this.store),
        map(([action, state]) => {
            const {
                items: {entities},
                comments: {
                    pagination: {offset, limit}, 
                    comments: {selectedItemId}
                }
            } = state;
            const ids = entities[selectedItemId].kids || [];
            return new itemActions.Load(ids.slice(offset, offset + limit));
        })
    );

}