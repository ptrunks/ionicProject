import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseProviderServiceProvider } from '../../providers/firebase-provider-service/firebase-provider-service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  items: Observable<any[]> | any;

  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };



  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public db: AngularFireDatabase,
    public authProvider: FirebaseProviderServiceProvider) {
    db.list('test').valueChanges()
      .subscribe(elements => {
        this.items = elements
      });
  }



  doSignup() {
    this.authProvider.register(this.account).then(() => {
      this.navCtrl.push(MainPage);
    });
  }
}
