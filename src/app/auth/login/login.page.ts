import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/alert/alert.service';

const USER_NAME = 'userName';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertService: AlertService,
  ) {

  }

  ngOnInit() {
  }

  login(form) {
    this.alertService.present();
    localStorage.setItem(USER_NAME, form.value.username);
    this.authService.login(form.value).subscribe(
      data => {
        this.alertService.presentToast('Bienvenido ' + localStorage.getItem(USER_NAME) + ' a la aplicacion HMDSchool');
      },
      error => {
        console.log(error);
        this.alertService.dismiss();
        this.alertService.errorLogin(error);
      },
      () => {
        this.navController.navigateRoot('/switch');

      }
    );

  }

}
