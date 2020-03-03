/**
* Ionic Full App  (https://store.enappd.com/product/ionic-full-app-ionic-4-full-app)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationService } from './services/firestore/firebase-authentication.service';
import { UserDataService } from './services/data-services/user-data.service';

import { FirestoreService } from './services/firestore/firestore.service';
import { FAQDataService } from './services/data-services/faq-data.service';
import { StorageService } from './services/firestore/filestorage.service';
import { WordpressService } from './services/wordpress/wordpress.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Card5Page } from './pages/card/card5/card5.page';
import { ViewVideoPage } from './pages/video-playlists/view-video/view-video.page';
import { Device } from '@ionic-native/device/ngx';
import { AgmDirectionModule } from 'agm-direction';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilService } from './services/util/util.service';
import { CardServicesService } from './services/card/card-services.service';
import { GridServiceService } from './services/grid/grid-service.service';
import { DriverStatusService } from './services/taxi/driver-status.service';
import { DataService } from './services/tinder/data.service';
import { DataTablesModule } from 'angular-datatables';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicSwingModule } from './components/ionic-swing/ionic-swing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, Card5Page, ViewVideoPage],
  entryComponents: [Card5Page, ViewVideoPage],
  imports: [BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP_Xy-1QSclKYAvxSmAZO2BuFAWWAlOZQ',
      libraries: ['places']
    }),
    AgmDirectionModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    IonicSwingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMapsAPIWrapper,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    MatDatepickerModule,
    UserDataService,
    FAQDataService,
    GoogleMapsAPIWrapper,
    AuthenticationService,
    FirestoreService,
    StorageService,
    Device,
    WordpressService,
    { provide: FirestoreSettingsToken, useValue: {} },
    UtilService,
    CardServicesService,
    GridServiceService,
    DriverStatusService,
    DataService,
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
