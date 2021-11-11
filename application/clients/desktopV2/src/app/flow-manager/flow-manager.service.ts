import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
@Injectable({
  providedIn: 'root'
})
export class FlowManagerService {

  constructor( private api: ApiService, private restapi: SharedService) { }
  getFlowModifiers(projectFlowsId:string, logId:string): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.getFlowModifiers}` + `?log_id=${logId}`, projectFlowsId);
  }
}
