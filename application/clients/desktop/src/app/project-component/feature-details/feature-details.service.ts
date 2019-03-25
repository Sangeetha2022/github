import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../config/api.service';
import { SharedService } from '../../../shared/shared.service';
import { Constants } from '../../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class FeatureDetailsService {

  constructor(
    private api: ApiService, private restapi: SharedService
  ) { }

  saveFeatureFlow(featureFlow): Observable<any> {
    return this.api.post(this.restapi.featureUrl + Constants.addFeatureFlow, featureFlow);
  }

  deleteFeatureFlow(id): Observable<any> {
    return this.api.delete(this.restapi.featureUrl + Constants.deleteFeatureFlowById + id);
  }

  updateFeatureFlow(flow, id): Observable<any> {
    return this.api.put(this.restapi.featureUrl + Constants.updateFeatureFlow + id, flow);
  }

  getAllFeatureFlows(): Observable<any> {
    return this.api.get(this.restapi.featureUrl + Constants.getAllFeatureFlow);
  }
  getFeatureFlowDetails(id): Observable<any> {
    return this.api.get(this.restapi.featureUrl + Constants.getFeatureFlowByFlowId + id);
  }
  saveFeatureFlowComponent(flow): Observable<any> {
    return this.api.post(this.restapi.featureUrl + Constants.addFlowCompUrl, flow);
  }

  addScreen(screen): Observable<any> {
    return this.api.post(this.restapi.featureflowbaseUrl + Constants.addScreen, screen);
  }

  deleteScreen(id): Observable<any> {
    return this.api.delete(this.restapi.featureUrl + Constants.deleteScreen + id);
  }

  updateScreen(screen, id): Observable<any> {
    return this.api.put(this.restapi.featureUrl + Constants.updateScreen + id, screen);
  }

  getAllScreen(): Observable<any> {
    return this.api.get(this.restapi.featureflowbaseUrl + Constants.getAllScreen);
  }

  getAllEntity(): Observable<any> {
    return this.api.get(this.restapi.featureUrl + Constants.getAllEntity);
  }


  getEntityByFeatureId(id): Observable<any> {
    return this.api.get(this.restapi.featureUrl + Constants.getEntityByFeatureId + id);
  }

  getScreenByFeatureName(name): Observable<any> {
    return this.api.get(this.restapi.featureUrl + Constants.getScreenByFeatureName + name);
  }
}
