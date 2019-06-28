import { FirebaseProviderServiceProvider } from './../../providers/firebase-provider-service/firebase-provider-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  nameUser = 'Name test';
  profileForm: FormGroup;
  urlAvatar = '../../assets/imgs/user.png'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuild: FormBuilder,
    private firebaseProvider: FirebaseProviderServiceProvider) {
  }

  createForm() {
    this.profileForm = this.formBuild.group({
      name: [''],
      email: [''],
      phone: [''],
      password: ['']
    })
  }

  ionViewWillLoad() {
    this.createForm();
  }

  ionViewDidLoad() {
  }

  get email() {
    return this.profileForm['controls']['email']
  }

  saveUser(form: FormGroup) {

    const user = form['value'];
    this.firebaseProvider.register(user)
      .then(() => console.info('User Cadastrado'))
      .catch(err => console.error('Algo deu errado', err))
  }


}
