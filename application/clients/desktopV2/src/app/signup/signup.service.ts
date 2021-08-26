import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import {Constants} from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private restapi: SharedService) { }
  
  signup(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + Constants.signup, user);
  }

  Consent(consent: any): Observable<any> {
    return this.http.put(this.restapi.Apigateway + Constants.Consent, consent);
  }
}
