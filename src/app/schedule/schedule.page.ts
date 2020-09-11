import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
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
export class SchedulePage implements OnInit {

  lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ';

  schedule = [];
  dataObtain;
  mydate;
  day;
  month;
  year;
  flag;

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private alertService: AlertService,
    private authService: AuthService
  ) {

    this.obtainSchedule();
  }

  obtainSchedule() {

    this.alertService.present();
    this.day = (new Date().getDate() < 10 ? '0' : '') + new Date().getDate();
    this.month = ((new Date().getMonth() + 1) < 10 ? '0' : '') + (new Date().getMonth() + 1);
    this.year = new Date().getFullYear();
    this.authService.schedule(this.dateSRC()).then(data => {

      this.dataObtain = data;
      if (this.dataObtain != null) {
   
        this.flag = 0;
        this.schedule = [];
        let b = 0;
        for (let i = 0; i < this.dataObtain.length; i++) {

          if (this.dataObtain[i].agendaRecipentsResponses.length > 0) {
            for (let a = 0; a < this.dataObtain[i].agendaRecipentsResponses.length; a++) {

              let hour = this.timeMethod(this.dataObtain[i].agendaRecipentsResponses[a].beginHour[0], this.dataObtain[i].agendaRecipentsResponses[a].beginHour[1]);
              let numberDayMonth = this.dataObtain[i].numberDayMonth;
              this.schedule.push({
                date: this.dataObtain[i].day + ' ' + numberDayMonth + ' de ' + this.dataObtain[i].month + ' ' + hour,
                descriptionItem: this.dataObtain[i].agendaRecipentsResponses[a].subject,
                content: this.dataObtain[i].agendaRecipentsResponses[a].description,
                imgSrc: this.dataObtain[i].agendaRecipentsResponses[a].photoResponsable,
                professor: this.dataObtain[i].agendaRecipentsResponses[a].responsable,
                end: this.timeMethod(this.dataObtain[i].agendaRecipentsResponses[a].endHour[0], this.dataObtain[i].agendaRecipentsResponses[a].endHour[1])
              });
            }
            b++;
          }
        }
        if (b == 0) {
          setTimeout(() => this.errorHomework(), 1000);
        } else setTimeout(() => this.alertService.dismiss(), 1000);
      }else{
      this.errorHomework();
      }
    });
  }

  errorHomework() {
    this.alertService.dismiss();
    this.flag = 1;
    this.alertService.errorSchedule('Verifique otra fecha en la agenda');
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

  ngOnInit() {
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }
}
