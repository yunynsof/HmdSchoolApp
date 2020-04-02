import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from '../services/alert/alert.service';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, MenuController, AlertController, NavParams } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DriverStatusService } from '../services/taxi/driver-status.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  categories: any = [];
  nameCollege;
  description;
  address;
  telephone;
  email;
  hour;
  web;
  facebook;
  youtube;
  instagram;
  twitter;

  public zoom: number = 14;
  public lat: number = 14.089654;
  public lng: number = -87.2223747;
  public markerUrl = '../../../assets/map/markerPin.png';
  public driveStatus: boolean = false;
  public origin: any;
  public destination: any;
  public userCard: boolean = false;
  public renderOpts = {
    suppressMarkers: true,
  };
  public directionOptions = {
    origin: {
      icon: '../../../assets/map/Google-Car.png',
    },
    destination: {
      icon: '../../../assets/map/distinationsMaker.png',
      opacity: 0.8,
    },
  };


  public styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ]

  constructor(
    private appComponent: AppComponent,
    private authService: AuthService,
    private router: Router, public modalController: ModalController,
    private geolocation: Geolocation, private menuCtrl: MenuController,
    public alertController: AlertController,
    private activeRouter: ActivatedRoute,
    private alertService: AlertService,
    public driverService: DriverStatusService
  ) {

    this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit,vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique.";
    
    this.driveStatus = driverService.driverStatus;
    this.userCard = driverService.userCard;
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.alertService.present();
    this.getContact();
  }

  getContact() {
    this.authService.contact()
      .then(data => {
        this.categories = data;
        this.nameCollege = this.categories.name;
        this.address = this.categories.address;
        this.telephone = this.categories.phone1+' '+this.categories.phone2;
        this.lat = this.categories.lat;
        this.lng = this.categories.lon;
        this.email = this.categories.email;
        this.hour = this.categories.officeHours;
        this.web = this.categories.web;
        this.facebook = this.categories.facebook;
        this.instagram = this.categories.instagram;
        this.youtube = this.categories.youtube;
        this.twitter = this.categories.twitter;
        setTimeout(() => this.alertService.dismiss(), 1000);
      });
   
  }

  ionViewDidEnter() {

    this.activeRouter.params.subscribe((data) => {
      if (data) {
        this.userCard = data.userCard ? data.userCard : this.driverService.userCard;
      }
    })
  }

  mapReady(a, event) {
    if (event) {
      console.log('event if')
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event, '$event.coords.lat', $event.coords.lat, '$event.coords.lng', $event.coords.lng);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  getDirection() {
    console.log('directions');
    this.origin = { lat: 26.857114, lng: 75.8127086 }
    this.destination = { lat: 0.5 + 26.857114, lng: 0.5 + 75.8127086 }
    console.log('origin', this.origin, this.destination)
  }

  requestAccept() {
    this.router.navigate(['customer-detail']);
  }

  async requestIgnore() {
    this.router.navigate(['customerRequest']);
  }

  public getcurrentLocations() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp', resp)
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('data', data);
    });
  }


  iconStudent() {
    this.appComponent.iconStudent();
  }

}
