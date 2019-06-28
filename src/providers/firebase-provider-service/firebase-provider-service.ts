import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable()
export class FirebaseProviderServiceProvider {
  user: Observable<firebase.User>;
  private currentUser: firebase.User;


  constructor(
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus) {

    this.user = this.afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);

  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  add(object, url): Promise<any> {
    return this.db.list(`${url}`).push(object);
  }

  nativeLogin() {
    this.googlePlus.login({
      'webClientId': '590777125148-8nq971slgjn997va7lbmqj4mdrmsvlm9.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(success => {
          console.log("Firebase sucess: " + JSON.stringify(success));
        })
        .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error(err));
  }

  googleLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  register(user): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((newUserCredential) => {
      this.add(user, `/profileUser/${newUserCredential.user.uid}`).then(() => { })
    });
  }

  login(user): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  displayName(): string {
    if (this.currentUser !== null) {
      return this.currentUser.displayName;
    } else {
      return 'deu errado';
    }
  }

  photoURL(): string {
    if (this.currentUser !== null) {
      return this.currentUser.photoURL;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
