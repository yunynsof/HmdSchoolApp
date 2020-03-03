import { Component, Input  } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router,  } from '@angular/router';
const USER_NAME = 'userName';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  generalStudent = {

    user_name: null,
    student: null,
    studentId: null,
    courseSection: null,
    grade: null,
    section: null,
    professor: null,
    professorDesc: null,
    globalAverage: null,
    mailProfessor: null,
    class: []

  }

  selectSegment;
  userDetails;
  globalAverage;

  constructor(
    private appComponent: AppComponent
  ) {

    this.generalStudent.user_name = localStorage.getItem(USER_NAME);
    this.generalStudent.student = localStorage.getItem('name');
    this.generalStudent.studentId = "0801-2018-00015";
    this.generalStudent.courseSection = "1er Grado Sección A";
    this.generalStudent.grade = "Primero";
    this.generalStudent.section = "A";
    this.generalStudent.professor = "Juan Hernandez";
    this.generalStudent.professorDesc = "Catedratico Guia";
    this.generalStudent.globalAverage = 80;
    this.generalStudent.mailProfessor = "prueba@gamil.com";

    this.generalStudent.class[0] = {
      hour: "7:00 am",
      class: "Español"
    };
    this.generalStudent.class[1] = {
      hour: "8:00 am",
      class: "Matematicas"
    };
    this.generalStudent.class[2] = {
      hour: "9:00 am",
      class: "Ciencias Naturales"
    };
    this.generalStudent.class[3] = {
      hour: "10:00 am",
      class: "Ingles"
    };
    this.generalStudent.class[4] = {
      hour: "11:00 am",
      class: "Informatica"
    };

    this.selectSegment = 'principal';
    
  }

  ngOnInit() {
    
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }

}
