import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
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
export class HomeworkPage implements OnInit {

  monday = {};
  tuesday = {};
  wednesday = {};
  thursday = {};
  friday = {};
  dayQuantity;
  
  constructor(
    private router: Router,
    private appComponent:AppComponent
  ) {

    this.monday = {
      date: "Lunes 2 abril del 2019",

      assignment: [
        {
          class: "Español",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        }
      ]
    };
    this.tuesday = {
      date: "Martes 3 abril del 2019",

      assignment: [
        {
          class: "Ciencias Naturales",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Civica",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        }
      ]
    };
    this.wednesday = {
      date: "Miercoles 4 abril del 2019",

      assignment: [
        {
          class: "Español",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        }
      ]
    };
    this.thursday = {
      date: "Jueves 5 abril del 2019",

      assignment: [
        {
          class: "Español",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        }
      ]
    };
    this.friday = {
      date: "Viernes 6 abril del 2019",

      assignment: [
        {
          class: "Ingles",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Español",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Ingles",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Español",
          date: "15 de mayo del 2020",
          detail: "Leer libro de lectura",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        },
        {
          class: "Matematicas",
          date: "15 de mayo del 2020",
          detail: "Realizar guia 2",
          description: "Realizar lo acordado en clase para esta asignacion, revisar apunte de la semana 2"
        }
      ]
    };

    this.dayQuantity = "Asignaciones: ";

  }

  ngOnInit() {

  }

  detailPage(data) {

    let navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.router.navigate(['homeworkdaydetail'], navigationExtras);
  }

  iconStudent(){
    this.appComponent.iconStudent();
  }
}
