import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  class: any = [];
  configuration: any = [];

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private alertService: AlertService,
    private authService: AuthService,
  ) {
    this.alertService.present();
    this.getClass()
  }

  ngOnInit() {

  }

  transfomList(list) {

    var timetable;
    let lun, mar, mie, jue, vie;
    for (let i = 0; i < list.length; i++) {

      if (list[i].codeDaySp == 'LUN') {
        lun = list[i].codeDaySp;
      } else
        if (list[i].codeDaySp == 'MAR') {
          mar = list[i].codeDaySp;
        } else
          if (list[i].codeDaySp == 'MIE') {
            mie = list[i].codeDaySp;
          } else
            if (list[i].codeDaySp == 'JUE') {
              jue = list[i].codeDaySp;
            } else
              if (list[i].codeDaySp == 'VIE') {
                vie = list[i].codeDaySp;
              }
    }

    if (lun != null) {
      timetable = lun;
    }
    if (mar != null && timetable == null) {
      timetable = mar;
    } else
      if (mar != null) {
        timetable += ', ' + mar;
      }
    if (mie != null && timetable == null) {
      timetable = mie;
    } else
      if (mie != null) {
        timetable += ', ' + mie;
      }
    if (jue != null && timetable == null) {
      timetable = jue;
    } else
      if (jue != null) {
        timetable += ', ' + jue;
      }
    if (vie != null && timetable == null) {
      timetable = vie;
    } else
      if (vie != null) {
        timetable += ', ' + vie;
      }

    return timetable;
  }

  getClass() {

    this.authService.class()
      .then(data => {
        this.configuration = data;
        this.class = [];

        for (let i = 0; i < this.configuration.length; i++) {

          this.class.push({
            idClass: this.configuration[i].idSubject,
            name: this.configuration[i].subject,
            timetable: this.transfomList(this.configuration[i].schoolSchedules),
            professorName: this.configuration[i].legalNameTeacher,
            img: 'http://18.224.225.240/' + this.configuration[i].photoSubject.substr('http://ec2-18-224-225-240.us-east-2.compute.amazonaws.com/'.length),
            classDetail: this.configuration[i].scores,
            photoProfessor: this.configuration[i].photoTeacher
          })
        }
        setTimeout(() => this.alertService.dismiss(), 2000);
      });
    
  }

  detailPage(data) {

    let navigationExtras: NavigationExtras = {
      state: data
    };
    this.router.navigate(['classdetail'], navigationExtras);
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }

}

