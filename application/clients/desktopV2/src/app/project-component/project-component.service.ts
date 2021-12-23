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
  updateFeature(feature: any, logId:any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFeature}?log_id=${logId}`, feature);
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
  getallProjectFlow(logId:any): Observable<any>  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getallProjectFlow}` + `?log_id=${logId}`);
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
  deleteEntity(entityId: String, logId: any): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteEntity}` + `/${entityId}` + `?log_id=${logId}`);
  }
  updateEntity(entity: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateEntity}?log_id=${logId}`, entity);
  }
  updateEntityField(entity: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateEntityFields}` + `?log_id=${logId}`, entity);
  }
  getByIdEntity(entityId: any, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getEntity}/${entityId}?log_id=${logId}`);
  }
  getGlobalEntityByProjectId(projectId:any, logId:any): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getEntity}?projectId=${projectId}&log_id=${logId}`);
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

  saveManyProjectFlow(data:any, logId:any): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveManyProjectFlow}` + `?log_id=${logId}`, data);
  }
  deleteFlowById(FlowId: String, logId:any): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteFlowById}/${FlowId}` + `?log_id=${logId}`);
  }
  exportSharedServiceYaml(projectId:any, logId:any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.sharedApplication}${projectId}` + `?log_id=${logId}`);
  }
    // codegenerate Api
    codeGenerate(projectId: any, logId:any): Observable<any> {
      return this.api.get(`${this.restapi.Apigateway}${Constants.projectGeneration}/${projectId}${Constants.GET}` + `?log_id=${logId}`);
    }
}
