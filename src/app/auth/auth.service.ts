import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertService } from '../services/alert/alert.service';

const TOKEN_KEY = 'ACCESS_TOKEN';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_SERVER: string = 'http://18.224.225.240/hmd-schoolar-oit-backend';
  authSubject = new BehaviorSubject(false);
  token: any;

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) { }


  login(user: User): Observable<AuthResponse> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('hmdconsultingacademics' + ':' + 'hmdconsultingacademics')
    })

    const data = new FormData();
    data.append("grant_type", 'password');
    data.append("username", user.username);
    data.append("password", user.password);

    return this.httpClient.post(`${this.URL_SERVER}/oauth/token`, data, { headers: headers }).pipe(
      tap(async (res: AuthResponse) => {

        if (res) {

          localStorage.setItem('ACCESS_TOKEN', res.access_token);
          localStorage.setItem('TOKEN_TYPE', res.token_type);
          this.authSubject.next(true);
        }
      })

    );
  }

  configuration() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/api/conf/configuration/v1/get/2`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  contact() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/api/catalog/schools/v1/get/1`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  principal() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    let principal = {
      idEducationalPeriod: localStorage.getItem('idEduPerCur'),
      idStudent: localStorage.getItem('idstudent')
    };

    return new Promise(resolve => {
      this.httpClient.post(`${this.URL_SERVER}/api/register/principal/v1/get`, principal, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }

  tutors(data) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    let tutor = {
      email: data
    };

    return new Promise(resolve => {
      this.httpClient.post(`${this.URL_SERVER}/api/register/tutors/v1/get/email`, tutor, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }

  class() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    let clas = {
      idRegister: localStorage.getItem('idRegister')
    };

    return new Promise(resolve => {
      this.httpClient.post(`${this.URL_SERVER}/api/register/report_card_subjecs/v1/get/register`, clas, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }

  homework(date) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    let homework = {
      idRegister: localStorage.getItem('idRegister'),
      date: date
    };

    return new Promise(resolve => {
      this.httpClient.post(`${this.URL_SERVER}/api/planning/homework_day/v1/get`, homework, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }

  calendar(date) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    let calendar = {
      idRegister: localStorage.getItem('idRegister'),
      date: date
    };

    return new Promise(resolve => {
      this.httpClient.post(`${this.URL_SERVER}/api/calendar/general_calendar/v1/get`, calendar, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }

  schedule(date) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    let schedule = {
      idRegister: localStorage.getItem('idRegister'),
      date: date
    };

    return new Promise(resolve => {
      this.httpClient.post(`${this.URL_SERVER}/api/planning/general_agenda/v1/get`, schedule, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }

  support() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('TOKEN_TYPE') + ' ' + localStorage.getItem('ACCESS_TOKEN'),
    });

    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/api/conf/general_questions/v1/get/APP_MOV_PF`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        this.alertService.dismiss();
        this.alertService.errorConnection(err);
      });
    });
  }


  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  isAuthenticated() {
    let debt = localStorage.getItem('debt');
    if (debt == 'false') {

      if (this.isAuth() && !this.isTokenExpired()) {
        return true;
      } else { return false; }
    } else {

      if (debt == 'true') {
        this.alertService.errorAlert('Tiene saldo pendiente, favor cancelar deuda para seguir con los beneficios de HmdSchool')
      }
      return false;
    }
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = localStorage.getItem(TOKEN_KEY);
    if (!token) return true;

    const date = helper.getTokenExpirationDate(token);

    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  isAuth() {
    return localStorage.getItem(TOKEN_KEY);
  }

}

