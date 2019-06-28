import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class LocationProvider {

  constructor(readonly geolocation: Geolocation) {

  }

  async getLocation() {
    try{
      const response = await this.geolocation.getCurrentPosition({ timeout: 4000 });
      const coordinates = {
        latitude: response['coords']['latitude'],
        longitude: response['coords']['longitude']
      };
      return coordinates;
    } catch (err) {

      const coordinates = {
        latitude: -8.0605512,
        longitude: -34.872537
      };
      console.error(err, 'ao tentar pegar localizacao')
      return coordinates;
    }
  }

}
