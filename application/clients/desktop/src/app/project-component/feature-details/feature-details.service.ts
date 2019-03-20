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
    return this.api.post(this.restapi.featureflowbaseUrl + Constants.addFeatureFlow, featureFlow);
  }

  deleteFeatureFlow(id): Observable<any> {
    return this.api.delete(this.restapi.featureflowbaseUrl + Constants.deleteFeatureFlowById + id);
  }

  updateFeatureFlow(flow, id): Observable<any> {
    return this.api.put(this.restapi.featureflowbaseUrl + Constants.updateFeatureFlow + id, flow);
  }

  getAllFeatureFlows(): Observable<any> {
    return this.api.get(this.restapi.featureflowbaseUrl + Constants.getAllFeatureFlow);
  }
  getFeatureFlowDetails(id): Observable<any> {
    return this.api.get(this.restapi.featureflowbaseUrl + Constants.featureflowUrl + Constants.getByIdUrl + id + Constants.detailsUrl);
  }
  saveFeatureFlowComponent(flow): Observable<any> {
    return this.api.post(this.restapi.featureflowbaseUrl + Constants.addFlowCompUrl, flow);
  }

  addScreen(screen): Observable<any> {
    return this.api.post(this.restapi.featureflowbaseUrl + Constants.addScreen, screen);
  }

  deleteScreen(id): Observable<any> {
    return this.api.delete(this.restapi.featureflowbaseUrl + Constants.deleteScreen + id);
  }

  updateScreen(screen, id): Observable<any> {
    return this.api.put(this.restapi.featureflowbaseUrl + Constants.updateScreen + id, screen);
  }

  getAllScreen(): Observable<any> {
    return this.api.get(this.restapi.featureflowbaseUrl + Constants.getAllScreen);
  }

  getScreenByFeatureName(name): Observable<any> {
    console.log("name from the service", name);
    return this.api.get(this.restapi.featureflowbaseUrl + Constants.getScreenByFeatureName + name);
  }
}
