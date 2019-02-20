import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigManagerService {

  constructor(private http: HttpClient, private router: Router, private api: ApiService, private restapi: SharedService) { }

  saveFlow(proj): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.saveUrl, proj);
  }

  deleteFlow(id): Observable<any> {
    return this.api.delete(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.deleteUrl + id);
  }

  updateFlow(flow, id): Observable<any> {
    return this.api.put(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.updateUrl + id, flow);
  }

  getAllGen(): Observable<any> {
    return this.api.get(this.restapi.configUrl + Constants.getAllGenFlowsUrl);
  }
}
