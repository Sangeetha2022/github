import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class FlowManagerService {

  private subject: Subject<any>;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private api: ApiService, private restapi: SharedService) {
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  saveFlow(proj): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.addFlowUrl, proj);
  }

  deleteFlow(id): Observable<any> {
    return this.api.delete(this.restapi.flowbaseUrl + Constants.deleteFlowUrl + id);
  }
  
  updateFlow(flow, id): Observable<any> {
    return this.api.put(this.restapi.flowbaseUrl + Constants.updateFlowUrl + id, flow);
  }

  getAllFlows(): Observable<any> { 
    return this.api.get(this.restapi.flowbaseUrl + Constants.getAllFlowsUrl);
  }

}