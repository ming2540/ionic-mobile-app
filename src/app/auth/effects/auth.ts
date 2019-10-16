import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthActionTypes, Login, LoginSuccess, LoginFailure, Signup, SignupSuccess, LogoutSuccess, SignupFailure, LogoutFailure } from '../actions/auth';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EmailPasswordPair, NewAccount } from '../../models/user';
import { from, of } from 'rxjs';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,
                private authService: AuthService,
                private router: Router) {}

    @Effect()
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        map((action: Login) => action.payload),
        mergeMap((pair: EmailPasswordPair) => 
            from(this.authService.login(pair))
            .pipe(
                mergeMap(user => of<Action>(new LoginSuccess(user))),
                catchError(error => of(new LoginFailure(error)))
            )
        )
    );

    @Effect()
    signup$ = this.actions$.pipe(
        ofType(AuthActionTypes.Signup),
        map((action: Signup) => action.payload),
        mergeMap((user: NewAccount) => 
            from(this.authService.create(user))
                .pipe(
                    mergeMap(createdUser => of<Action>(new SignupSuccess(), new LoginSuccess(createdUser))),
                    catchError(error => of(new SignupFailure(error)))
                )
        )
    );

    @Effect()
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LogoutSuccess),
        tap(() => this.router.navigate(['./']))
    );

    @Effect()
    logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        mergeMap(() => 
            from(this.authService.logout())
                .pipe(
                    map(user => new LogoutSuccess()),
                    catchError(error => of(new LogoutFailure(error)))
                )
        )
    )
}