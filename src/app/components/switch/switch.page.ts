import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.page.html',
  styleUrls: ['./switch.page.scss'],
})
export class SwitchPage implements OnInit {

  tutors: any;
  students = [];
  lengthBig;
  lengthSmall;
  items: any[] = [];
  userDetails;
  studentId;
  principal;

  constructor(
    private navController: NavController,
    private alertService: AlertService,
    private authService: AuthService,
    private util: UtilService,
  ) {
    this.getStudent();
  }

  ngOnInit() {

  }

  selectStudent(data) {

    localStorage.setItem('idstudent', data.idstudent)
    localStorage.setItem('img', data.img);
    localStorage.setItem('name', data.name);
    this.getDebt();
  }


  getStudent() {

    this.authService.tutors(localStorage.getItem('user'))
      .then(data => {
        this.tutors = data;
        this.students = this.tutors.students;

        localStorage.setItem('userName', this.tutors.legalName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()));
        this.lengthBig = this.lengthStudentBig(this.students.length);
        this.lengthSmall = this.lengthStudentSmall(this.students.length);
        this.userDetails = { profileUrl: localStorage.getItem('img') };

        for (let i = 0; i < this.students.length; i++) {

          this.items.push({
            img: './assets/icon/user' + (2) + '.png',
            name: this.students[i].legalName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
            studentId: this.students[i].identification,
            idstudent: this.students[i].id
          });

        }
        setTimeout(() =>this.alertService.dismiss(),1000);
      });
  }

  getDebt() {
    this.alertService.presentDebt();
    this.authService.principal()
      .then(data => {

        this.principal = data
        localStorage.setItem('debt', this.principal.debt);
        setTimeout(() => this.comprobationDebt(), 3000);
      });
  }

  comprobationDebt() {
    this.navController.navigateRoot('/home');
    //this.alertService.dismiss()
  }

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
