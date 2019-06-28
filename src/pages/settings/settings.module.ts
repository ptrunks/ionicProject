import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { FirebaseProviderServiceProvider } from '../../providers/firebase-provider-service/firebase-provider-service';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
  providers: [
    FirebaseProviderServiceProvider
  ]
})
export class SettingsPageModule {}
