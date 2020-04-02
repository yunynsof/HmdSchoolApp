import { Component, OnInit } from '@angular/core';
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
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
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
export class CalendarPage implements OnInit {

  calendar = [];
  dataObtain;
  mydate;
  day;
  month;
  year;

  constructor(
    private appComponent: AppComponent,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.obtainCalendar();
  }

  ngOnInit() {
  }

  obtainCalendar() {

    this.alertService.present();
    this.day = (new Date().getDate() < 10 ? '0' : '') + new Date().getDate();
    this.month = ((new Date().getMonth() + 1) < 10 ? '0' : '') + (new Date().getMonth() + 1);
    this.year = new Date().getFullYear();
    this.authService.calendar(this.dateSRC()).then(data => {

      this.dataObtain = data;
      if (this.dataObtain != null) {

        this.calendar = [];
        let b = 0;
        for (let i = 0; i < this.dataObtain.length; i++) {

          if (this.dataObtain[i].events.length > 0) {
            for (let a = 0; a < this.dataObtain[i].events.length; a++) {

              this.calendar.push({
                date: this.dataObtain[i].numberDayMonth,
                month: this.dataObtain[i].month,
                hour: this.timeMethod(this.dataObtain[i].events[a].begin[0], this.dataObtain[i].events[a].begin[1]),
                title: this.dataObtain[i].events[a].event,
                content: this.dataObtain[i].events[a].description,
                imgSrc: this.dataObtain[i].events[a].photoResponsable,
                responsable: this.dataObtain[i].events[a].responsable,
                end: this.timeMethod(this.dataObtain[i].events[a].end[0], this.dataObtain[i].events[a].end[1])
              });
            }
            b++;
          }
        }
        if (b == 0) {
          setTimeout(() => this.errorHomework(), 1000);
        } else setTimeout(() => this.alertService.dismiss(), 1000);
      }
    });
  }

  errorHomework() {
    this.alertService.dismiss();
    this.alertService.errorCalendar('Verifique otra fecha en el calendario');
  }

  dateSRC() {

    let dateSrc;
    if (this.mydate != null || this.mydate != undefined) {
      dateSrc = this.mydate._i.year + '' + ((this.mydate._i.month + 1) < 10 ? '0' : '') + (this.mydate._i.month + 1) + '' + (this.mydate._i.date < 10 ? '0' : '') + this.mydate._i.date;
      return dateSrc;
    } else {
      dateSrc = this.year + '' + this.month + '' + this.day;
      return dateSrc;
    }
  }

  timeMethod(hour, minutes) {
    if (hour < 12) {
      return hour + ':' + (minutes < 10 ? '0' : '') + (minutes) + ' am'
    } else return hour + ':' + (minutes < 10 ? '0' : '') + (minutes) + ' pm'
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }

}
