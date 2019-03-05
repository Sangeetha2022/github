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

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // updateFlowComponent(flow): Observable<any> {
  //   return this.api.put(this.restapi.mflowbaseUrl + Constants.updateFlowCompUrl, flow);
  // }

  // updateGenFlow(flow): Observable<any> {
  //   return this.api.put(this.restapi.flowbaseUrl + Constants.updateGenFlowsUrl, flow);
  // }

  saveFlowComponent(flow): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.addFlowCompUrl, flow);
  }

  addFlowCompToFlow(id, flow): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.flowUrl + '/' + id + Constants.addFlowCompToFlowUrl, flow);
  }

  updateFlowCompToFlow(id, flow): Observable<any> {
    return this.api.put(this.restapi.flowbaseUrl + Constants.flowCompUrl + id + Constants.updateUrl, flow);
  }

  addDefaultConnector(id, connector): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.flowCompentUrl + '/' + id + Constants.addDConnectorUrl, connector);
  }

  updateDefaultConnector(id, connector): Observable<any> {
    return this.api.put(this.restapi.flowbaseUrl + Constants.flowCompentUrl + id + Constants.updateDConnectorUrl, connector);
  }

  // addDefaultConnector(id, name, conn): Observable<any> {
  //   return this.api.post(this.restapi.flowbaseUrl + Constants.flow + id + '/' + name + Constants.addDConnectorToFlowUrl, conn);
  // }

  // updateDefaultConnector(id, name, conn): Observable<any> {
  //   return this.api.post(this.restapi.flowbaseUrl + Constants.flow + id + '/' + name + Constants.updateDConnectorToFlowUrl, conn);
  // }

  updateMicroFlow(flow): Observable<any> {
    return this.api.put(this.restapi.mflowbaseUrl + Constants.updateMicroFlowUrl, flow);
  }

  saveMicroFlow(proj): Observable<any> {
    return this.api.post(this.restapi.mflowbaseUrl + Constants.addMicroFlowUrl, proj);
  }

  saveConnector(connector): Observable<any> {
    return this.api.post(this.restapi.flowbaseUrl + Constants.addConnector, connector);
  }

  updateConnector(connector): Observable<any> {
    const id = connector._id;
    return this.api.put(this.restapi.flowbaseUrl + Constants.upadateConnector + id, connector);
  }

  deleteConnector(id): Observable<any> {
    return this.api.delete(this.restapi.flowbaseUrl + Constants.deleteConnector + id);
  }

  deleteMicroFlow(id): Observable<any> {
    return this.api.delete(this.restapi.mflowbaseUrl + Constants.deleteMicroFlowUrl + id);
  }

  // getFlowGenComponentByName(name): Observable<any> {
  //   return this.api.get(this.restapi.flowbaseUrl + Constants.getGenFlowsByCompNameUrl + name);
  // }

  // getFlowCompByName(name): Observable<any>{
  //   return this.api.get(this.restapi.mflowbaseUrl + Constants.flowUrl + Constants.getByNameUrl + name + Constants.detailsUrl);
  // }

  getFlowSequence(id): Observable<any> {
    return this.api.get(this.restapi.flowbaseUrl + Constants.flowUrl + Constants.getByIdUrl + id + Constants.detailsUrl);
  }

  getMicroFlowByCompName(name): Observable<any> {
    return this.api.get(this.restapi.mflowbaseUrl + Constants.getMicroFlowsByCompNameUrl + name);
  }

  // getLinkedConnectorByName(name): Observable<any> {
  //   console.log("i am in the name service", name)
  //   return this.api.get(this.restapi.flowbaseUrl + Constants.getLinkedConnectorByName + name);
  // }

  getAllConnector(): Observable<any> {
    return this.api.get(this.restapi.flowbaseUrl + Constants.getAllConnector);
  }

}
