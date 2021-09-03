import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import {Constants} from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private restapi: SharedService) { }

  Login(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway +  Constants.Login, user);
  }
  Logout(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + Constants.Logout, user);
  }
}
