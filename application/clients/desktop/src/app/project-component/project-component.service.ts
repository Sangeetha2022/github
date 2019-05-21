import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { IEntity } from './interface/Entity';
import { Constants } from '../config/Constant';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectComponentService {

  private entity: IEntity = <IEntity>{
    name: '',
    description: '',
    entity_type: '',
    project_id: '',
    feature_id: '',
    created_by: '',
    last_modified_by: '',
    updated_at: new Date(),
    field: []
  };

  entityInfoSource = null;


  constructor(
    private api: ApiService,
    private restapi: SharedService,
    private http: HttpClient,
    private handler: HttpBackend,
  ) { }

  // new apis for features
  saveFeatures(feature: any): Observable<any> {
    return this.api.post(`${this.restapi.featureUrl}${Constants.saveFeature}`, feature);
  }
  updateFeature(feature: any): Observable<any> {
    return this.api.put(`${this.restapi.featureUrl}${Constants.updateFeature}`, feature);
  }
  getAllFeature(): Observable<any> {
    return this.api.get(`${this.restapi.featureUrl}${Constants.getAllFeature}`);
  }
  getFeatureById(featureId: String): Observable<any> {
    return this.api.get(`${this.restapi.featureUrl}${Constants.getFeatureById}?featureId=${featureId}`);
  }
  getFeatureByProjectId(projectId: any): Observable<any> {
    return this.api.get(`${this.restapi.featureUrl}${Constants.getFeatureByProjectId}?projectId=${projectId}`);
  }
  deleteFeature(featureId: any): Observable<any> {
    return this.api.delete(`${this.restapi.featureUrl}${Constants.saveFeature}?featureId=${featureId}`);
  }


  getAllFlows(): Observable<any> {
    return this.api.get(`${this.restapi.flowbaseUrl}${Constants.getAllFlow}`);
  }

  // old
  createEntity(entity: any): Observable<any> {
    return this.api.post(this.restapi.entityUrl + '/entity/save', entity);
  }
  updateEntity(entity: any): Observable<any> {
    return this.api.put(this.restapi.entityUrl + '/entity/update', entity);
  }

  saveFeatureEntity(featureEntity: any): Observable<any> {
    return this.api.post(this.restapi.featureUrl + Constants.saveFeatureEntity, featureEntity);
  }
  deleteEntity(entityId: String): Observable<any> {
    return this.api.delete(this.restapi.entityUrl + `/entity/delete/${entityId}`);
  }
  getByIdEntity(entityId: any): Observable<any> {
    return this.api.get(this.restapi.entityUrl + `/entity/get/${entityId}`);
  }
  getEntityByProjectId(projectId: String): Observable<any> {
    return this.api.get(this.restapi.entityUrl + `/entity/get?projectId=${projectId}`);
  }
  getAllEntity(): Observable<any> {
    return this.api.get(this.restapi.entityUrl + '/entity/getall');
  }

  getEntityByFeatureAndprojectId(projectId, featureId): Observable<any> {
    return this.api.get(this.restapi.entityUrl + Constants.getEntityByFeatureAndprojectId + projectId + '/' + featureId);
  }

  updateEntityField(entity: any): Observable<any> {
    return this.api.put(this.restapi.entityUrl + '/entity/field/update', entity);
  }

  getAllEntityType(): Observable<any> {
    return this.api.get(this.restapi.entityUrl + '/entity_type/get');
  }

  // data sharing
  setEntity(entity: any) {
    this.entityInfoSource.next(entity);
  }

  // Feature
  addFeature(feature) {
    return this.api.post(this.restapi.featureUrl + Constants.feature + Constants.saveUrl, feature);

  }

  addFeatureFlow(featureFlow) {
    return this.api.post(this.restapi.featureUrl + Constants.addFeatureFlow, featureFlow);
  }

  addFeatureDetails(feature) {
    return this.api.post(this.restapi.featureUrl + Constants.addFeatureDetails, feature);

  }

  addFeatureDetailsWithFile(feature) {
    this.http = new HttpClient(this.handler);
    return this.http.post(`${this.restapi.featureUrl}${Constants.addFeatureDetails}`, feature);
  }

  // getAllFeature() {
  //   return this.api.get(this.restapi.featureUrl + Constants.feature + Constants.getAllUrl);
  // }
  getAllFeatureByProjectId(id) {
    return this.api.get(this.restapi.featureUrl + Constants.feature + Constants.getFeatureByProjectId + id);
  }

  getAllFeatureDetails() {
    return this.api.get(this.restapi.featureUrl + Constants.getAllFeatureDetails);
  }

  getFeatureDetailsById(id) {
    return this.api.get(this.restapi.featureUrl + Constants.feature + Constants.detailsUrl + Constants.getByIdUrl + id);
  }


  // getFeatureById(id) {
  //   return this.api.get(this.restapi.featureUrl + Constants.feature + Constants.getByIdUrl + id);
  // }

  // deleteFeature(id) {
  //   return this.api.delete(this.restapi.featureUrl + Constants.feature + Constants.deleteUrl + id);
  // }

  // updateFeature(feature) {
  //   const featureId = feature.id;
  //   return this.api.put(this.restapi.featureUrl + Constants.feature + Constants.updateUrl + featureId, feature);
  // }

  uploadeFeaturefile(file) {
    // const formData: FormData = new FormData();
    // formData.append('fileKey', file, file.name);
    return this.api.post(this.restapi.featureUrl + Constants.feature + Constants.detailsUrl + Constants.addFilesUrl, file);
  }

  // Default Entity

  // addDefaultEntity(defaultEntity) {
  //   console.log("hello udhaya u r waiting", defaultEntity)
  //   return this.api.post(this.restapi.entityUrl + Constants.addDefaultEntity, defaultEntity);

  // }

  // getDefaultEntityByProjectId(id) {
  //   return this.api.get(this.restapi.entityUrl + Constants.getDefaultEntityByProjectId + id)

  // }

}
