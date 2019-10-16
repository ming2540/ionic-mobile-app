import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NewAccount, EmailPasswordPair } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  create(user: NewAccount): Promise<firebase.User> {
    return this.afauth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(result => result.user.updateProfile({
        displayName: user.name,
        photoURL: null,
      }).then(() => result.user)); 
  }

  login(user: EmailPasswordPair): Promise<firebase.User> {
    return this.afauth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => result.user);
  }

  logout(): Promise<any> {
    return this.afauth.auth.signOut();
  }

}
