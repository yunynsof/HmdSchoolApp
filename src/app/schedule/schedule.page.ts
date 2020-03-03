import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
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
export class SchedulePage implements OnInit {

  lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ';

  schedule = [];

  constructor(
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.schedule.push(
      {
        date: "Hoy 7:30 PM",
        professor: "Ana Joselina Fortin",
        descriptionItem: "Dia de color",
        content: this.lorem
      },
      {
        date: "Hoy 3:20 PM",
        professor: "Karla Noelia Nuñez",
        descriptionItem: "Dia del Indio",
        content: this.lorem
      },
      {
        date: "Hoy 12:12 PM",
        professor: "Veronica Bueso",
        descriptionItem: "Reunion de padres",
        content: this.lorem
      },
      {
        date: "Ayer 5:00 PM",
        professor: "Sandra Yamileth Salgado",
        descriptionItem: "Salida de camping",
        content: this.lorem
      },
      {
        date: "Ayer 07:12 AM",
        professor: "Camila Estrada",
        descriptionItem: "Ausencia de profesora",
        content: this.lorem
      }
    );
  }

  ngOnInit() {
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }
}
