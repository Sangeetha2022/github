import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
import { LoginProviderClass } from 'angular-6-social-login';

@Injectable()
export class FlowManagerService {


  constructor( private api: ApiService, private restapi: SharedService) {
  }

  saveFlow(details, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveFlow}?log_id=${logId}`, details);
  }

  deleteFlow(id, logId): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteFlow}?flowId=${id}&log_id=${logId}`);
  }

  updateFlow(flow, id, logId): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFlow}?log_id=${logId}`, flow);
  }

  getAllFlows(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllFlow}?log_id=${logId}`);
  }
  
  getAllDefaultModifiers(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllDefaultModifier}?log_id=${logId}`);
  }

  getFlowModifiers(projectFlowsId, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.getFlowModifiers}` + `?log_id=${logId}`, projectFlowsId);
  }

}
