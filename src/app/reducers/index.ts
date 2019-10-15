import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store'
import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromItems from './items';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateURL {
    url: string;
    params: Params;
    queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateURL> {
    serialize(routerState: RouterStateSnapshot): RouterStateURL {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const { url, root: { queryParams } } = routerState;
        const { params } = route;
        return { url, params, queryParams };
    }
}

export interface State {
    router: fromRouter.RouterReducerState<RouterStateURL>;
    items: fromItems.State;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    items: fromItems.reducer,
}