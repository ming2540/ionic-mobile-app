import { Injectable, Inject } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ItemActionTypes, Load, LoadSuccess, LoadFail } from '../actions/items';
import { map, mergeMap, take, catchError } from 'rxjs/operators';
import { Item } from '../models/item';
import { HACKER_NEWS_DB } from '../hackernews-db';


@Injectable()
export class ItemEffects {
    constructor(private action$: Actions, 
                @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase) {}

    @Effect()
    loadItems$: Observable<Action> = this.action$.pipe(
        ofType(ItemActionTypes.Load),
        map((action: Load) => action.payload),
        mergeMap((ids: number[]) => 
            combineLatest(
                ids.map(id => this.db.object('/v0/item/' + id).valueChanges().pipe(take(1)))
            ).pipe(
                map((items: Item[]) => new LoadSuccess(items)),
                catchError(error => of(new LoadFail(error))),
        ))
    );
}