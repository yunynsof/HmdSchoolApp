import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from '../services/alert/alert.service';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HomeworkPage implements OnInit {

  dayQuantity;
  day;
  weekfirst;
  weekLast;
  month;
  monthTittle;
  year;
  dateConsult;
  dataObtain;
  mydate;
  tittle;
  homework = [];

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.obtainHomework();
  }

  ngOnInit() {

  }

  obtainHomework() {

    this.alertService.present();
    this.day = (new Date().getDate() < 10 ? '0' : '') + new Date().getDate();
    this.month = ((new Date().getMonth() + 1) < 10 ? '0' : '') + (new Date().getMonth() + 1);
    this.year = new Date().getFullYear();
    this.dateConsult = this.year + "" + this.month + "" + this.day;
    this.authService.homework(this.dateSRC()).then(data => {

      this.dataObtain = data;
      this.weekfirst = null;
      this.weekLast = null;
      this.monthTittle = null;
      if (this.dataObtain != null) {

        this.weekfirst = this.dataObtain[0].presentationDate[2];
        this.weekLast = this.dataObtain[(this.dataObtain.length - 1)].presentationDate[2];
        this.monthTittle = this.appComponent.obtainMonth((new Date().getMonth() + 1));
        this.tittle = 'Semana ' + this.weekfirst + ' al ' + this.weekLast + ' de ' + this.monthTittle;
        this.homework = [];
        for (let i = 0; i < this.dataObtain.length; i++) {

          this.homework.push({
            date: this.dataObtain[i].day + ' ' + this.dataObtain[i].presentationDate[2] + ' ' + this.appComponent.obtainMonth(this.dataObtain[i].presentationDate[1]) + ' ' + 'del' + ' ' + this.dataObtain[i].presentationDate[0],
            assignment: this.dataObtain[i].homeWorks,
            imgSrc: './assets/icon/' + this.dataObtain[i].day.toLowerCase() + '.png'
          });

          this.dayQuantity = "Asignaciones: ";
        }
        setTimeout(() => this.alertService.dismiss(), 1000);

      } else {

        this.homework = [];
        setTimeout(() => this.errorHomework(), 1000);

      }
    });
  }

  errorHomework() {
    this.alertService.dismiss();
    this.alertService.errorHomework('Verifique otra fecha en el calendario');
  }

  dateSRC() {

    let dateSrc;
    if (this.mydate != null || this.mydate != undefined) {
      dateSrc = this.mydate._i.year + '' + ((this.mydate._i.month + 1) < 10 ? '0' : '') + (this.mydate._i.month + 1) + '' + (this.mydate._i.date < 10 ? '0' : '') + this.mydate._i.date;
      return dateSrc;
    } else {
      this.tittle = 'Semana ' + this.day + ' de ' + this.appComponent.obtainMonth((new Date().getMonth() + 1));
      dateSrc = this.year + '' + this.month + '' + this.day;
      return dateSrc;
    }
  }

  detailPage(data) {

    let navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.router.navigate(['homeworkdaydetail'], navigationExtras);
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }
}
