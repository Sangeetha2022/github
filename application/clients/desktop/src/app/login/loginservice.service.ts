import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private apiservice: ApiService, private restapi: SharedService) { }


  Getlogin(loginchallenge: any): Observable<any> {
    return this.apiservice.get(this.restapi.loginUrl + '/login?' + loginchallenge);
  }

  Login(user: any): Observable<any> {
    return this.apiservice.post(this.restapi.loginUrl + '/login', user);
  }
}
