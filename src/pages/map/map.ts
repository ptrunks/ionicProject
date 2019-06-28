import { Component, NgZone } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController, AlertOptions } from 'ionic-angular';
import { FirebaseProviderServiceProvider } from '../../providers/firebase-provider-service/firebase-provider-service';
import { TranslateService } from '@ngx-translate/core';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { WelcomePage } from '../welcome/welcome';
import { LocationProvider } from '../../providers/location/location';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete';
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {


  map: any;
  currentItems: Item[];
  showMap = false;
  address;

  constructor(
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public authProvider: FirebaseProviderServiceProvider,
    private locationProvider: LocationProvider,
    private zone: NgZone) {
    this.currentItems = this.items.query();
    this.address = {
      place: ''
    };
  }

  ionViewDidLoad() {
    this.getMyLocation();
  }

  getLocations() {
    return [
      ['Ecodigital - Descarte Já ', -8.065399, -34.890843, 1],
      ['Vincents Reciclagem Ltda', -8.071543, -34.910586, 2],
      ['RECICLETOOL', -8.060173, -34.920741, 3],
      ['CERCAP - Centro Brasileiro de Reciclagem e Capacitação Profissional', -8.051482, -34.902369, 4]
    ]
  }

  getMyLocation() {
   this.locationProvider.getLocation()
     .then(data => {
       if(data){
         this.initMap(data['latitude'],data['longitude'])
         this.showMap = true
       }
    }).catch(err => {
      this.initMap(-8.0605512,-34.872537)
      this.showMap = true;
      console.error(err)
    })
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompleteComponent);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }

  initMap(latitude: Number, longitude: Number) {
    const locations = this.getLocations();
    const myLocation = {lat: latitude, lng: longitude}
    

    console.info('My location', myLocation)

    
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myLocation,
      myLocationButton: true,
      mapToolbar: false,  
      indoorPicker: false,
      compass: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    let infowindow = new google.maps.InfoWindow;

    let marker, i;

    // map.addListener('click', e => this.getPositionClick(e.latLng, map))

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        animation: 'DROP'
      });

      google.maps.event.addListener(marker, 'click', ((marker, i) => {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  // showAlert(pos, map) {

  //   const inputs: AlertInputOptions[]= [{
  //     type: 'text',
  //     name: 'Nome do ponto de coleta',
  //   }]

  //   const buttons: AlertButton[] = [
  //     {
  //       text: 'Salvar',
  //       handler: () => this.saveColletPoint(pos, map)
  //     },
  //     {
  //       text: 'Cancel'
  //     }
  //   ]

  //   const options: AlertOptions = {
  //     title: 'Ponto de Coleta',
  //     subTitle: 'Deseja salvar este ponto de coleta?',
  //     inputs: inputs,
  //     buttons: buttons
  //   }

  //   const alert = this.alertCtrl.create(options)
  //   alert.present();
    
  // }

  // saveColletPoint(pos, map) {
    
  //   this.setNewMarker(pos, map)
  // }

  // setNewMarker(position, map) {
  //   new google.maps.Marker({
  //     position,
  //     map,
  //     animation: 'DROP'
  //   })

  //   map.panTo(position);
  // }

  // getPositionClick(e, map) {

  //   const pos = {lat: e.lat(), lng: e.lng()}

  //   this.showAlert(pos, map);
  // }
}

