import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigManagerService {

  constructor(private api: ApiService, private restapi: SharedService) { }

  saveConfig(config, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveConfig}?log_id=${logId}`, config);
  }

  deleteConfig(id, logId): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteConfig}/${id}?log_id=${logId}`);
  }

  updateConfig(config, logId): Observable<any> {
    const id = config._id;
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateConfig}/${id}?log_id=${logId}`, config);
  }

  getAllConfig(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllConfig}?log_id=${logId}`);
  }

  getTechProperties(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getConfigTechProperties}?log_id=${logId}`);
  }


  getVersion(name, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}?log_id=${logId}`);
  }

  getBuildVersion(name, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}?logId=${logId}`);
  }

  getBuildDate(name): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}`);
  }
}


