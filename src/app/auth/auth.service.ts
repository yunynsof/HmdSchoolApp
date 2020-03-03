import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_SERVER: string = 'http://18.224.225.240/hmd-schoolar-oit-backend';
  authSubject = new BehaviorSubject(false);
  token: any;

  constructor(
    private httpClient: HttpClient,
  ) { }


  login(user: User): Observable<AuthResponse> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(user.username + ':' + user.password)
    })

    const data = new FormData();
    data.append("grant_type", 'password');
    data.append("username", 'carlos.sanchez@gmail.com');
    data.append("password", 'Pa$$w0rd');

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

  contact() {
    const headers = new HttpHeaders({
      'Authorization':  localStorage.getItem('TOKEN_TYPE')+' '+localStorage.getItem('ACCESS_TOKEN'),
    });

    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/api/catalog/schools/v1/get/1`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  isLoggedIn() {
    return this.authSubject.asObservable();
  }
  isAuthenticated() {
    return this.authSubject.value;
  }

  isAuth() {
    return localStorage.getItem(TOKEN_KEY);
  }

}

