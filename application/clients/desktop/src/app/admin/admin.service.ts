import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private api: ApiService, private restapi: SharedService) { }

  Getallusers(): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getUsers}`);
  }

}
