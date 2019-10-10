import { Action } from '@ngrx/store';

export enum TopStoriesActionTypes {
    Refresh = '[Top Stories] Refresh',
    LoadMore = '[Top Stories] LoadMore',
    LoadSuccess = '[Top Stories] LoadSuccess',
    LoadFail = '[Top Stories] LoadFail', 
}

export class Refresh implements Action {
    readonly type = TopStoriesActionTypes.Refresh
}

export class LoadMore implements Action {
    readonly type = TopStoriesActionTypes.LoadMore
}

export class LoadSuccess implements Action {
    readonly type = TopStoriesActionTypes.LoadSuccess
    constructor(public payload: number[]) {}
}

export class LoadFail implements Action {
    readonly type = TopStoriesActionTypes.LoadFail
    constructor(public payload: any) {}
}

export type TopStoriesActions = Refresh | LoadMore | LoadSuccess | LoadFail;