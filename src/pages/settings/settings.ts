import { FirebaseProviderServiceProvider } from './../../providers/firebase-provider-service/firebase-provider-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  nameUser = 'Name test';
  urlAvatar = '../../assets/imgs/user.png'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseProvider: FirebaseProviderServiceProvider) {
  }

  ionViewDidLoad() {
  }

  goTo(namePage: string) {
    this.navCtrl.push(namePage)
  }

  logout() {
    // this.firebaseProvider.logout();
    // this.navCtrl.popAll()
    this.navCtrl.setRoot('WelcomePage');
  }

}
