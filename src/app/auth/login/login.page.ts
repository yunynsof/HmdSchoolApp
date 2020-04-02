import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/alert/alert.service';

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
  ) {
     this.username = localStorage.getItem('user');
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

}
