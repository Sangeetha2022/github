import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class FlowManagerService {


  constructor( private api: ApiService, private restapi: SharedService) {
  }

  saveFlow(details): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveFlow}`, details);
  }

  deleteFlow(id): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteFlow}?flowId=${id}`);
  }

  updateFlow(flow, id): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFlow}`, flow);
  }

  getAllFlows(): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllFlow}`);
  }

}
