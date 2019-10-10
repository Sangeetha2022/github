import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import {Constants} from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private restapi: SharedService) { }

  signup(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + Constants.signup, user);
  }

  googlelogin(googleresponse: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + Constants.googlelogin, googleresponse);
  }
  Login(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway +  Constants.Login, user);
  }

  Logout(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + Constants.Logout, user);
  }

  Consent(consent: any): Observable<any> {
    return this.http.put(this.restapi.Apigateway + Constants.Consent, consent);
  }

  fbLogIn(fbUser: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + Constants.fbLogIn, fbUser);
  }

}
