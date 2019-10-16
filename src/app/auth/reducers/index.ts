import * as fromAuth from './auth'
import * as fromLoginPage from './login-page';
import * as fromSignupPage from './signup-page'
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
    status: fromAuth.State;
    loginPage: fromLoginPage.State;
    signupPage: fromSignupPage.State;
};

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    status: fromAuth.reducer,
    loginPage: fromLoginPage.reducer,
    signupPage: fromSignupPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status,
);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginPage,
);

export const getLoginPageError = createSelector(
    selectLoginPageState,
    fromLoginPage.getError
);

export const getLoginPageLoading = createSelector(
    selectLoginPageState,
    fromLoginPage.getLoading
);

export const selectSignupPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.signupPage,
);

export const getSignupPageError = createSelector(
    selectSignupPageState,
    fromSignupPage.getError
);

export const getSignupPageLoading = createSelector(
    selectSignupPageState,
    fromSignupPage.getLoading
);




