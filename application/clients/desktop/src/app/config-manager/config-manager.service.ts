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

  saveConfig(config): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveConfig}`, config);
  }

  deleteConfig(id): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteConfig}/${id}`);
  }

  updateConfig(config): Observable<any> {
    const id = config._id;
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateConfig}/${id}`, config);
  }

  getAllConfig(): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllConfig}`);
  }

  getTechProperties(): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getConfigTechProperties}`);
  }


  getVersion(name): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}`);
  }

  getBuildVersion(name): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectVersion}/${name}`);
  }
}


