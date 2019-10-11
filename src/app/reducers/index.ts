import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store'
import { Params } from '@angular/router';
import * as fromItems from './items';

export interface RouterStateURL {
    url: string;
    params: Params;
    queryParams: Params;
}

export interface State {
    router: fromRouter.RouterReducerState<RouterStateURL>;
    items: fromItems.State;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    items: fromItems.reducer,
}