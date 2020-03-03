/**
* Ionic Full App  (https://store.enappd.com/product/ionic-full-app-ionic-4-full-app)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/firestore/firebase-authentication.service';
import { UtilService } from './services/util/util.service';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { AlertService } from './services/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app-component.scss']
})
export class AppComponent {

  imgStudent;
  nameStudent;
  day;
  month;
  hours;

  constructor(
    private authService: AuthenticationService,
    private util: UtilService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: Location,
    private navController: NavController,
    private menu: MenuController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    localStorage.clear();
    this.authService.logout().then(() => {
    this.util.navigate('login', false);
    this.alertService.presentToast('Cerrando Sesión');
    })
  }

  /* logout() {
     localStorage.clear();
     this.navController.navigateRoot('/login');
   }*/

  isLogin(path) {

    var title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1);
    if (path == title || "/login" == title) {
      return false;
    }
    else if (path == title || "/switch" == title) {
      return false;
    }
    else {
      return true;
    }
  }

  iconStudent() {
    this.imgStudent = localStorage.getItem('img');
    this.nameStudent = localStorage.getItem('name')
    this.day = new Date().getDate();
    this.month = this.obtainMonth((new Date().getMonth()) + 1);
    this.hours = (new Date().getHours() < 10 ? '0' : '') + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()
  }

  getSwitchStudent() {
    this.util.navigate('switch', false);
    //this.navController.navigateRoot('/switch');
  }

  closeMenu() {
    this.alertService.present();
    this.menu.close();
  }

  obtainMonth(number) {
    switch (number) {
      case 1: {
        return 'Enero'
      }
      case 2: {
        return 'Febrero'
      }
      case 3: {
        return 'Marzo'
      }
      case 4: {
        return 'Abril'
      }
      case 5: {
        return 'May'
      }
      case 6: {
        return 'Junio'
      }
      case 7: {
        return 'Julio'
      }
      case 8: {
        return 'Agosto'
      }
      case 9: {
        return 'Septiembre'
      }
      case 10: {
        return 'Octubre'
      }
      case 11: {
        return 'Noviembre'
      }
      case 12: {
        return 'Diciembre'
      }
    }
  }
}


