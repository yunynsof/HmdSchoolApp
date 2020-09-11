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

       //Remove this method to stop OneSignal Debugging 
    window["plugins"].OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});
    
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
    
    // Set your iOS Settings
    var iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
    
    window["plugins"].OneSignal
      .startInit("YOUR_ONESIGNAL_APP_ID")
      .handleNotificationOpened(notificationOpenedCallback)
      .iOSSettings(iosSettings)
      .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
      .endInit();
    
    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
    });
  });
  }

  /*logout() {
    localStorage.clear();
    this.authService.logout().then(() => {
    this.util.navigate('login', false);
    this.alertService.presentToast('Cerrando Sesión');
    })
  }*/

  logout() {
    localStorage.removeItem('img');
    localStorage.removeItem('name')
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('TOKEN_TYPE')
    //localStorage.removeItem('user')

    localStorage.removeItem('idEduPerCur')
    localStorage.removeItem('idSchoCur');
    localStorage.removeItem('idstudent')
    localStorage.removeItem('userName')

    localStorage.removeItem('debt');
    localStorage.removeItem('idRegister')

    this.navController.navigateRoot('/login');
    this.alertService.presentToast('Cerrando Sesión');
  }

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


