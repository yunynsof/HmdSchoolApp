import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/alert/alert.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';


const USER = 'user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  configuration;
  tutors;
  username;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertService: AlertService,
    private uniqueDeviceID: UniqueDeviceID,
    private device: Device
  ) {
    this.username = localStorage.getItem('user');

this.alertService.errorSupport('Device Model is: ' + this.device.model+
'\n Device UUID is: ' + this.device.uuid+
'\n Device serial is: ' + this.device.serial+
'\n Device platform is: ' + this.device.platform+
'\n Device version is: ' + this.device.version+
'\n Device manufacturer is: ' + this.device.manufacturer);
    console.log('Device Model is: ' + this.device.model+
    '\n Device UUID is: ' + this.device.uuid+
    '\n Device serial is: ' + this.device.serial+
    '\n Device platform is: ' + this.device.platform+
    '\n Device version is: ' + this.device.version+
    '\n Device manufacturer is: ' + this.device.manufacturer);
    this.uniqueDeviceID.get()
  .then((uuid: any) => 
  this.alertService.errorSupport("uuid: "+uuid))
  .catch((error: any) => console.log(error));


  }

  ngOnInit() {

  }

  login(form) {
    this.alertService.present();
    localStorage.setItem(USER, form.value.username);
    this.authService.login(form.value).subscribe(
      data => {

      },
      error => {
        console.log(error);
        this.alertService.dismiss();
        this.alertService.errorLogin(error);
      },
      () => {
        this.getStudent();
      }
    );

  }

  getConfiguration() {

    this.authService.configuration()
      .then(data => {
        this.configuration = data;
        localStorage.setItem('idEduPerCur', this.configuration.idEducationalPeriodCurrent);
        localStorage.setItem('idSchoCur', this.configuration.idSchoolCurrent);

        let username = localStorage.getItem('userName');
        setTimeout(() => this.alertService.presentToast('Bienvenido ' + username + ' a la aplicacion HMDSchool'), 1000);
        this.navController.navigateRoot('/switch');
      });

  }

  getStudent() {

    this.authService.tutors(localStorage.getItem('user'))
      .then(data => {
        this.tutors = data;
        localStorage.setItem('userName', this.tutors.legalName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()));
        this.getConfiguration();
      });
  }

  restorePass() {
    this.alertService.present();
    if (this.username == null || this.username == '') {
      this.alertService.alert('Campo correo vacio');
      this.alertService.dismiss();
    } else {

      this.authService.restorePassword(this.username)
        .then(data => {
          if (data == null) {
            this.alertService.alert('Correo no valido');
            this.alertService.dismiss();
          } else if (data == 200) {
            this.alertService.alertSuccess('Exitoso');
            this.alertService.dismiss();
          }
        });
    }
  }

}
