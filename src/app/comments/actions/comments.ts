import { Action } from '@ngrx/store';
import { Item } from 'src/app/models/item';

export enum CommentsActionTypes {
    Select = '[Comments] Select',
    LoadMore = '[Components] Load More',
    LoadSuccess = '[Components] Load Success',
}

export class Select implements Action {
    readonly type = CommentsActionTypes.Select;

    constructor(public payload: number) {}
}

export class LoadMore implements Action {
    readonly type = CommentsActionTypes.LoadMore;
}

export class LoadSuccess implements Action {
    readonly type = CommentsActionTypes.LoadSuccess;

    constructor(public payload: Item) {}
}

export type CommentsActions = Select | LoadMore | LoadSuccess;
