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
    return this.api.post(this.restapi.configUrl + Constants.addGenFlowsUrl, config);
  }

  deleteConfig(id): Observable<any> {
    return this.api.delete(this.restapi.configUrl + Constants.deleteGenFlowsUrl + id);
  }

  updateConfig(config): Observable<any> {
    const id = config._id;
    return this.api.put(this.restapi.configUrl + Constants.updateGenFlowsUrl + id, config);
  }

  getAllConfig(): Observable<any> {
    return this.api.get(this.restapi.configUrl + Constants.getAllGenFlowsUrl);
  }

  getTechProperties(): Observable<any> {
    return this.api.get(this.restapi.configUrl + Constants.getTechProperties);
  }
}
