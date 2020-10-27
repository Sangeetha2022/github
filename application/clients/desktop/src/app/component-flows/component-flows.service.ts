import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class ComponentFlowsService {

  private subject: Subject<any>;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private api: ApiService, private restapi: SharedService) {
  }

  // new apis
  getMicroFlow(ids: any, logId: any): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.getMicroFlow}?log_id=${logId}`, ids);
  }

  updateMicroFlow(flow, logId): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateMicroFlow}?log_id=${logId}`, flow);
  }

  saveMicroFlow(details, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.addMicroFlow}?log_id=${logId}`, details);
  }

}
