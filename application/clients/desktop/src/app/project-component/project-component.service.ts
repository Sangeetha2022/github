import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../config/Constant';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectComponentService {

  constructor(
    private api: ApiService,
    private restapi: SharedService,
    private http: HttpClient,
  ) { }



  // new service for feature details
  getAllFeatureDetailsByFeatureId(id, logId): Observable<any> {
    return this.api.get(this.restapi.Apigateway + Constants.getAllFeatureDetailsByFeatureId + id + `?log_id=${logId}`);
  }
  getAllFeatureByFeatureid(id): Observable<any> {
    return this.api.get(this.restapi.Apigateway + `${Constants.getAllFeatureByFeatureid}/${id}`);
  }

  // codegenerate Api
  codeGenerate(projectId: any, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.projectGeneration}/${projectId}${Constants.GET}` + `?log_id=${logId}`);
  }

  // new apis for features
  saveFeatures(feature: any, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveFeature}?log_id=${logId}`, feature);
  }
  updateFeature(feature: any, logId): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFeature}?log_id=${logId}`, feature);
  }
  getAllFeature(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllFeature}?log_id=${logId}`);
  }
  getFeatureById(featureId: String, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getFeatureById}?featureId=${featureId}&log_id=${logId}`);
  }
  getFeatureByProjectId(projectId: any, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getFeatureByProjectId}?projectId=${projectId}&log_id=${logId}`);
  }
  deleteFeature(featureId: any, logId): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.saveFeature}?featureId=${featureId}&log_id=${logId}`);
  }
  updateFeatureEntity(featureId: any, details, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFeatureEntity}?featureId=${featureId}&log_id=${logId}`, details);
  }
  getAllFlows(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllFlow}?log_id=${logId}`);
  }
  //getAllEntityByFeatureId
  getAllEntityByFeatureId(featureId, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllEntityByFeatureId}/${featureId}/entity?log_id=${logId}`);
  }

  getEntityByFeatureId(featureId, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getEntityByFeatureId}?featureId=${featureId}&log_id=${logId}`);
  }

  createEntity(entity: any, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveEntity}?log_id=${logId}`, entity);
  }
  updateEntity(entity: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateEntity}?log_id=${logId}`, entity);
  }

  deleteEntity(entityId: String, logId: any): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteEntity}` + `/${entityId}` + `?log_id=${logId}`);
  }
  getByIdEntity(entityId: any, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getEntity}/${entityId}?log_id=${logId}`);
  }
  getEntityByProjectId(projectId: String, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getEntity}?projectId=${projectId}&log_id=${logId}`);
  }
  getAllEntity(logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.allEntity}` + `?log_id=${logId}`);
  }

  Updatefeaturedetailsentity(featureid: any, entitydetails: any, logId: any): Observable<any> {
    return this.http.put(`${this.restapi.Apigateway}${Constants.featureUpdateEntity}${featureid}?log_id=${logId}`, entitydetails);
  }

  Deletefeaturedetailsentity(featureid: any, entityid: any): Observable<any> {
    return this.http.delete(`${this.restapi.Apigateway}${Constants.featuredeleteEntity}/${featureid}/${entityid}`);
  }

  getGlobalEntityByProjectId(projectId, logId): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getEntity}?projectId=${projectId}&log_id=${logId}`);
  }


  updateEntityField(entity: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateEntityFields}` + `?log_id=${logId}`, entity);
  }

  getAllEntityType(logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllEntityTypes}` + `?log_id=${logId}`);
  }


  quickConnectors(data, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.quickConnectors}` + `?log_id=${logId}`, data);
  }

  getallProjectFlow(logId): Observable<any>  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getallProjectFlow}` + `?log_id=${logId}`);
  }

  saveManyProjectFlow(data, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveManyProjectFlow}` + `?log_id=${logId}`, data);
  }

  getProjectFeatureFlows(projectFlowsId, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.getProjectFeatureFlows}` + `?log_id=${logId}`, projectFlowsId);
  }

  updateProjectFlowComponents(projectFlowId, componentList, logId): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateProjectFlowComponent}?projectFlowId=${projectFlowId}`
    + `?log_id=${logId}`, componentList);
  }


  deleteProjectFlow(projectFlowId: String,logId: any): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteProjectFlow}?projectFlowId=${projectFlowId}&log_id=${logId}`);
  }



  updateFlowCompConnectorById(data: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFlowCompConnectorById}` + `?log_id=${logId}`, data);
  }

  quickTestcustomConnectors(data: any, logId: any): Observable<any> {
    console.log('data --service->>', data);
    return this.api.post(`${this.restapi.Apigateway}${Constants.quickTestcustomConnectors}` + `?log_id=${logId}`, data);
  }
  getConnectorById(connectorId: String, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getConnectorById}/${connectorId}` + `?log_id=${logId}`);

  }
  // delete microservie apis


  deleteFlowById(FlowId: String, logId): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteFlowById}/${FlowId}` + `?log_id=${logId}`);
  }

  deleteEntityById(entityId: String, logId: any): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteEntityById}` + `/${entityId}` + `?log_id=${logId}`);
  }

  updateQuickConnectorsById(updateFlow: any, logId): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateQuickConnectorsById}/${updateFlow._id}`
    + `?log_id=${logId}`, updateFlow);
  }

  getModifyConnectors(logId) {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getConnectors}` + `?log_id=${logId}`);

  }

  exportSharedServiceYaml(projectId, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.sharedApplication}${projectId}` + `?log_id=${logId}`);
  }

  // updateQuickConnectorsById(updateFlow:any): Observable<any> {
  //   return this.api.post(`http://localhost:3013/updateConnectors`, updateFlow);
  // }

}
