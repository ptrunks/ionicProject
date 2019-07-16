webpackJsonp([7],{

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListMasterPageModule", function() { return ListMasterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map__ = __webpack_require__(672);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ListMasterPageModule = /** @class */ (function () {
    function ListMasterPageModule() {
    }
    ListMasterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__map__["a" /* MapPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__map__["a" /* MapPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__map__["a" /* MapPage */]
            ]
        })
    ], ListMasterPageModule);
    return ListMasterPageModule;
}());

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_firebase_provider_service_firebase_provider_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_location_location__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_autocomplete_autocomplete__ = __webpack_require__(359);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, items, modalCtrl, translateService, authProvider, locationProvider, zone) {
        this.navCtrl = navCtrl;
        this.items = items;
        this.modalCtrl = modalCtrl;
        this.translateService = translateService;
        this.authProvider = authProvider;
        this.locationProvider = locationProvider;
        this.zone = zone;
        this.showMap = false;
        this.currentItems = this.items.query();
        this.address = {
            place: ''
        };
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.getMyLocation();
    };
    MapPage.prototype.getLocations = function () {
        return [
            ['Ecodigital - Descarte Já ', -8.065399, -34.890843, 1],
            ['Vincents Reciclagem Ltda', -8.071543, -34.910586, 2],
            ['RECICLETOOL', -8.060173, -34.920741, 3],
            ['CERCAP - Centro Brasileiro de Reciclagem e Capacitação Profissional', -8.051482, -34.902369, 4]
        ];
    };
    MapPage.prototype.getMyLocation = function () {
        var _this = this;
        this.locationProvider.getLocation()
            .then(function (data) {
            if (data) {
                _this.initMap(data['latitude'], data['longitude']);
                _this.showMap = true;
            }
        }).catch(function (err) {
            _this.initMap(-8.0605512, -34.872537);
            _this.showMap = true;
            console.error(err);
        });
    };
    MapPage.prototype.showAddressModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__components_autocomplete_autocomplete__["a" /* AutocompleteComponent */]);
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.address.place = data;
        });
        modal.present();
    };
    MapPage.prototype.initMap = function (latitude, longitude) {
        var locations = this.getLocations();
        var myLocation = { lat: latitude, lng: longitude };
        console.info('My location', myLocation);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: myLocation,
            myLocationButton: true,
            mapToolbar: false,
            indoorPicker: false,
            compass: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
        var infowindow = new google.maps.InfoWindow;
        var marker, i;
        // map.addListener('click', e => this.getPositionClick(e.latLng, map))
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                animation: 'DROP'
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                };
            })(marker, i));
        }
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"C:\projeto\ionicProject\src\pages\map\map.html"*/'\n\n<ion-content>\n\n  <!-- <ion-input class="search" (click)="showAddressModal()" [(ngModel)]="address.place" type="text" placeholder="Digite um endereço"></ion-input> -->\n\n\n\n  <div [hidden]="!showMap" class="map" #map id="map"></div>\n\n  <div [hidden]="showMap">\n\n    <label>Carregando Map...</label>\n\n  </div>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\projeto\ionicProject\src\pages\map\map.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers__["b" /* Items */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_firebase_provider_service_firebase_provider_service__["a" /* FirebaseProviderServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_location_location__["a" /* LocationProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=7.js.map