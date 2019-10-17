import { Action } from '@ngrx/store';
import { EmailPasswordPair, User, NewAccount } from '../../models/user';
import { LoginProvider } from '../services/auth.service';


export enum AuthActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] LoginSuccess',
    LoginFailure = '[Auth] LoginFailure',
    Signup = '[Auth] Signup',
    SignupSuccess = '[Auth] SignupSuccess',
    SignupFailure = '[Auth] SignupFailure',
    Logout = '[Auth] Logout',
    LogoutSuccess = '[Auth] LogoutSuccess',
    LogoutFailure = '[Auth] LogoutFailure',
    LoginWithProvider = '[Auth] LoginWithProvider'
}

export class Login implements Action {
    readonly type: AuthActionTypes.Login

    constructor(public payload: EmailPasswordPair) {}
}

export class LoginSuccess implements Action {
    readonly type: AuthActionTypes.LoginSuccess

    constructor(public payload: User) {}
}

export class LoginFailure implements Action {
    readonly type: AuthActionTypes.LoginFailure

    constructor(public payload: any) {}
}

export class Signup implements Action {
    readonly type: AuthActionTypes.Signup

    constructor(public payload: NewAccount) {}
}

export class SignupSuccess implements Action {
    readonly type: AuthActionTypes.SignupSuccess
}

export class SignupFailure implements Action {
    readonly type: AuthActionTypes.SignupFailure

    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type: AuthActionTypes.Logout
}

export class LogoutSuccess implements Action {
    readonly type: AuthActionTypes.LogoutSuccess
}

export class LogoutFailure implements Action {
    readonly type: AuthActionTypes.LogoutFailure

    constructor(public payload: any) {}
}

export class LoginWithProvider implements Action {
    readonly type: AuthActionTypes.LoginWithProvider

    constructor(public payload: LoginProvider) {}
}

export type AuthActions = Login | LoginSuccess | LoginSuccess | LoginFailure | Signup | SignupSuccess | SignupFailure | Logout | LogoutSuccess | LogoutFailure;
