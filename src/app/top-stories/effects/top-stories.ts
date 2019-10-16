import { Injectable, Inject } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFireDatabase, Action } from '@angular/fire/database';
import * as fromTopStories from '../reducers';
import { Observable, of } from 'rxjs';
import { TopStoriesActionTypes } from '../actions/top-stories';
import { switchMap, mergeMap, take, catchError, withLatestFrom, map } from 'rxjs/operators';
import * as topStoriesActions from '../actions/top-stories';
import * as itemActions from '../../actions/items'
import { pageSize } from '../reducers/pagination';
import { HACKER_NEWS_DB } from 'src/app/hackernews-db';

@Injectable()
export class TopStoriesEffects {
    constructor(private actions$: Actions,
                private store: Store<fromTopStories.State>,
                @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase) {}

    @Effect()
    loadTopStories$: Observable<Action> = this.actions$.pipe(
        ofType(TopStoriesActionTypes.Refresh),
        switchMap(() => 
            this.db.list('v0/topstories').valueChanges()
            .pipe(
                take(1),
                mergeMap((ids: number[]) => of<Action>(
                    new topStoriesActions.LoadSuccess(ids),
                    new itemActions.Load(ids.slice(0, pageSize)))),
                catchError(error => of(new topStoriesActions.LoadFail(error))),
            )
        )
    );

    @Effect()
    loadMore$: Observable<Action> = this.actions$.pipe(
        ofType(TopStoriesActionTypes.LoadMore),
        withLatestFrom(this.store),
        map(([action, state]) => {
            const {
                pagination: {
                    offset,
                    limit,
                },
                stories: {
                    ids,
                }
            } = state.topStories;
            return new itemActions.Load(ids.slice(offset, offset + limit));
        })
    );

}
