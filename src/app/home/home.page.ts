import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../services/alert/alert.service';
const USER_NAME = 'userName';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  principal;
  generalStudent = {

    user_name: null,
    student: null,
    studentId: null,
    grade: null,
    section: null,
    professor: null,
    professorDesc: null,
    globalAverage: null,
    mailProfessor: null,
    class: []

  }
  dayWeek = new Array("SUN", "MON", "TUE", "WED", "THE", "FRI", "SAT");
  selectSegment;
  userDetails;
  globalAverage;

  constructor(
    private appComponent: AppComponent,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.alertService.dismiss()
    this.alertService.present();
    this.getPrincipal();

  }

  ngOnInit() {

  }

  getPrincipal() {
    this.authService.principal()
      .then(data => {

        this.principal = data
        this.generalStudent.user_name = localStorage.getItem(USER_NAME);
        this.generalStudent.student = this.principal.studentName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        this.generalStudent.studentId = this.principal.identification;
        this.generalStudent.grade = this.principal.grade;
        this.generalStudent.section = this.principal.section;
        this.generalStudent.professor = this.principal.guideTeacherName;
        this.generalStudent.professorDesc = "Catedratico Guia";
        this.generalStudent.globalAverage = this.principal.academicIndex.toFixed(2);
        this.generalStudent.mailProfessor = "prueba@gamil.com";
        localStorage.setItem('debt', this.principal.debt);

        let a = 0;
        for (let i = 0; i < this.principal.schoolSchedules.length; i++) {

          if (this.principal.schoolSchedules[i].codeDayEng == this.dayWeek[new Date().getDay()]) {

            this.submitDays(a);
            a++;
          } else if (this.dayWeek[new Date().getDay()] == 'SAT' ||
            this.dayWeek[new Date().getDay()] == 'SUN') {

            if (this.principal.schoolSchedules[i].codeDayEng == 'MON') {

              this.submitDays(a);
              a++;
            }
          }
        }
        localStorage.setItem('idRegister', this.principal.idRegister)
        this.alertService.dismiss();
        this.selectSegment = 'principal';
      });
  }

  submitDays(i) {

    this.generalStudent.class[i] = {
      hour: this.principal.schoolSchedules[i].start + ' - ' + this.principal.schoolSchedules[i].end,
      class: this.principal.schoolSchedules[i].subjectName
    };

  }

  iconStudent() {
    this.appComponent.iconStudent();
  }
  
}
