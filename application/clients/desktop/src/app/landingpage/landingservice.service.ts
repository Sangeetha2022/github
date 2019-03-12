import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient, private api: ApiService, private restapi: SharedService) { }


  landingpage(body): Observable<any> {
    return this.api.post(this.restapi.loginUrl + '/authorize', body);
  }
}
