import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.page.html',
  styleUrls: ['./switch.page.scss'],
})
export class SwitchPage implements OnInit {

  images = [
    'Christopher Alvarez ',
    'Emily Torres'
  ];
  lengthBig;
  lengthSmall;
  items: any[] = [];
  userDetails;
  studentId;

  constructor(
    private navController: NavController,
    private alertService: AlertService
  ) {

    this.lengthBig = this.lengthStudentBig(this.images.length);
    this.lengthSmall = this.lengthStudentSmall(this.images.length);
    this.userDetails = { profileUrl: localStorage.getItem('img') };

    for (let i = 0; i < this.images.length; i++) {

      this.items.push({
        user: 'user' + i,
        img: './assets/icon/user' + (i+1) + '.png',
        name: this.images[i],
        title: this.images[i].toUpperCase(),
        studentId: "0801-2018-00015"
      });

    }
    this.alertService.dismiss();
  }

  ngOnInit() {
  }

  selectStudent(data) {

    localStorage.setItem('user', data.user);
    localStorage.setItem('img', data.img);
    localStorage.setItem('name', data.name);
    this.navController.navigateRoot('/home');
  }

  logout() {
    localStorage.clear();
    this.navController.navigateRoot('/login');
  }

  lengthStudentBig(data) {
    if (data >= 3) {
      return true;
    } else return false
  }
  lengthStudentSmall(data) {
    if (data < 3) {
      return true;
    } else return false
  }
}
