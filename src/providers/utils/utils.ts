import { Injectable } from '@angular/core';

import { AlertController, AlertOptions } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  constructor(
    private alertCtrl: AlertController
  ) {
  }

  showAlert(options: AlertOptions) {
    
  }

}
