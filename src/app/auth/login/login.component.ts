import { Component, OnInit } from '@angular/core';
import * as fromAuth from '../reducers';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { EmailPasswordPair } from 'src/app/models/user';
import { Login } from '../actions/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading$: Observable<Boolean>;
  error$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.loading$ = this.store.pipe(select(fromAuth.getLoginPageLoading));
    this.error$ = this.store.pipe(select(fromAuth.getLoginPageError));
  }

  login(value: EmailPasswordPair) {
    console.log(this.email, this.password);
    console.log(value)
    this.store.dispatch(new Login(value));
  }

  ngOnInit() {}

}
