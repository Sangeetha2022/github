import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class FlowManagerService {


  constructor( private api: ApiService, private restapi: SharedService) {
  }

  saveFlow(proj): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.saveUrl, proj);
  }

  deleteFlow(id): Observable<any> {
    return this.api.delete(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.deleteUrl + id);
  }

  updateFlow(flow, id): Observable<any> {
    return this.api.put(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.updateUrl + id, flow);
  }

  getAllFlows(): Observable<any> {
    return this.api.get(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.getAllUrl);
  }

}
