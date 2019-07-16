import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private restapi: SharedService) { }

  Getallusers(): Observable<any> {
    return this.http.get(this.restapi.Adminmanager + '/admin/getusers');
  }
}
