// import { Injectable } from "@angular/core";
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { Store } from '@ngrx/store';
// import * as fromComments from '../reducers/';
// import { Observable } from 'rxjs';
// import { CommentsActionTypes } from '../actions/comments';
// import { switchMap, mergeMap, take } from 'rxjs/operators';
// import * as commentsActions from '../actions/comments';
// import { Item } from 'src/app/models/item';
// import { Action } from 'rxjs/internal/scheduler/Action';
// import * as itemActions from './actions/'


// @Injectable()
// export class CommentsEffects {
//     constructor(private actions$: Actions,
//                 private store: Store<fromComments.State>,
//                 private db: AngularFireDatabase) {}
    
//     @Effect()
//     loadComment$: Observable<Action> = this.actions$.pipe(
//         ofType(CommentsActionTypes.Select),
//         switchMap((action: commentsActions.Select) => 
//             this.db.object(`v0/item/${action.payload}`).valueChanges().pipe(
//                 take(1),
//                 mergeMap((item: Item) => of<Action>(
//                     new itemActions.LoadSuccess([item]),
//                     new  
//                 ))
//             )
//         )
//     )
// }