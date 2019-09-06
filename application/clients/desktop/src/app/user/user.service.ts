import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private apiservice: ApiService, private restapi: SharedService) { }


  Getuser(userid: any): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getuserById}/${userid}`);
  }

  Getroles(): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getAllRoles}`);
  }

  Updateuser(userobject: any): Observable<any> {
    return this.http.put(`${this.restapi.Apigateway}${Constants.updateUsers}`, userobject);
  }
}
