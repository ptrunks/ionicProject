import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FirebaseProviderServiceProvider } from '../../providers/firebase-provider-service/firebase-provider-service';
import { TranslateService } from '@ngx-translate/core';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController, 
    public authProvider: FirebaseProviderServiceProvider,  
    public translateService: TranslateService) { }

  loginGoogle() {
    this.authProvider.googleLogin()
      .then(() => {
        this.navCtrl.push(MainPage);
      });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
