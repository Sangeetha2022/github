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

  saveConfig(config): Observable<any> {
    return this.api.post(this.restapi.configUrl + Constants.addGenFlowsUrl, config);
  }

  deleteConfig(id): Observable<any> {
    console.log("i am the id",id)
    return this.api.delete(this.restapi.configUrl + Constants.deleteGenFlowsUrl + id);
  }

  updateConfig(config): Observable<any> {
    let id = config._id;
    return this.api.put(this.restapi.configUrl + Constants.updateGenFlowsUrl + id, config);
  }

  getAllConfig(): Observable<any> {
    return this.api.get(this.restapi.configUrl + Constants.getAllGenFlowsUrl);
  }
}
