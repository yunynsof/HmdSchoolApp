import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS}  from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

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
    {provide: MAT_DATE_LOCALE, useValue: 'es'},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CalendarPage implements OnInit {

  lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ';
  
  calendar = [];

  constructor(
    private appComponent:AppComponent
  ) {

    this.calendar.push(
      {
        date: 19,
        month: "FEB",
        hour: "9:00 am",
        title: "Examen Primer Parcial",
        content: this.lorem,
        college: "Juan Pablo"
      },
      {
        date: 10,
        month: "MAY",
        hour: "9:00 am",
        title: "Examen Segundo Parcial",
        content: this.lorem,
        college: "Juan Pablo"
      },
      {
        date: 8,
        month: "AGO",
        hour: "9:00 am",
        title: "Examen Tercer Parcial",
        content: this.lorem,
        college: "Juan Pablo"
      },
      {
        date: 15,
        month: "NOV",
        hour: "9:00 am",
        title: "Examen Cuarto Parcial",
        content: this.lorem,
        college: "Juan Pablo"
      },
      {
        date: 25,
        month: "NOV",
        hour: "9:00 am",
        title: "Examen Reposicion",
        content: this.lorem,
        college: "Juan Pablo"
      },
      {
        date: 5,
        month: "DIC",
        hour: "9:00 am",
        title: "Examen Recuperacion",
        content: this.lorem,
        college: "Juan Pablo"
      }
    );

  }

  ngOnInit() {
  }

  iconStudent(){
    this.appComponent.iconStudent();
  }

}
