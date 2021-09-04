import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../config/Constant';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectComponentService {

  constructor(  
    private api: ApiService,
    private restapi: SharedService,
    private http: HttpClient,) { }

  getFeatureByProjectId(projectId: any, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getFeatureByProjectId}?projectId=${projectId}&log_id=${logId}`);
  }
  saveFeatures(feature: any, logId:any): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveFeature}?log_id=${logId}`, feature);
  }
  getAllEntityByFeatureId(featureId:any, logId:any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllEntityByFeatureId}/${featureId}/entity?log_id=${logId}`);
  }
  getFeatureById(featureId: String, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getFeatureById}?featureId=${featureId}&log_id=${logId}`);
  }
  getProjectFeatureFlows(projectFlowsId:any, logId:any): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.getProjectFeatureFlows}` + `?log_id=${logId}`, projectFlowsId);
  }
  getAllFlows(logId:any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllFlow}?log_id=${logId}`);
  }
  getAllEntityType(logId:any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllEntityTypes}` + `?log_id=${logId}`);
  }
  getEntityByProjectId(projectId: String, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getEntity}?projectId=${projectId}&log_id=${logId}`);
  }
  createEntity(entity: any, logId:any): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveEntity}?log_id=${logId}`, entity);
  }
  updateEntity(entity: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateEntity}?log_id=${logId}`, entity);
  }

  Updatefeaturedetailsentity(featureid: any, entitydetails: any, logId: any): Observable<any> {
    return this.http.put(`${this.restapi.Apigateway}${Constants.featureUpdateEntity}${featureid}?log_id=${logId}`, entitydetails);
  }
  deleteEntityById(entityId: String, logId: any): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteEntityById}` + `/${entityId}` + `?log_id=${logId}`);
  }
  Deletefeaturedetailsentity(featureid: any, entityid: any): Observable<any> {
    return this.http.delete(`${this.restapi.Apigateway}${Constants.featuredeleteEntity}/${featureid}/${entityid}`);
  }
}
