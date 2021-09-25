import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
import { ApiService } from '../config/api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigManagerService {

  constructor(private api: ApiService, private restapi: SharedService) { }
  getVersion(name:string, logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}?log_id=${logId}`);
  }

  getBuildVersion(name:string, logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}?logId=${logId}`);
  }

  getBuildDate(name:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}`);
  }

  getTechProperties(logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getConfigTechProperties}?log_id=${logId}`);
  }
}
