import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { IEntity } from './interface/Entity';
import {Constants} from '../config/Constant'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityManagerService {

  private entity: IEntity = <IEntity>{
    name: '',
    description: '',
    project_id: '',
    created_by: '',
    last_modified_by: '',
    updated_at: new Date(),
    field: []
  };

  entityInfoSource = null;


  constructor(
    private api: ApiService, private restapi: SharedService
  ) { }

  createEntity(entity: any): Observable<any> {
    return this.api.post(this.restapi.entityUrl + '/entity/save', entity);
  }
  updateEntity(entity: any): Observable<any> {
    return this.api.put(this.restapi.entityUrl + '/entity/update', entity);
  }
  deleteEntity(entityId: String): Observable<any> {
    return this.api.delete(this.restapi.entityUrl + `/entity/delete/${entityId}`);
  }
  getByIdEntity(entityId: any): Observable<any> {
    return this.api.get(this.restapi.entityUrl + `/entity/get/${entityId}`);
  }
  getAllEntity(): Observable<any> {
    return this.api.get(this.restapi.entityUrl + '/entity/getall');
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


  //Feature
  addFeature(feature){
    return this.api.post(this.restapi.featureUrl + Constants.feature + Constants.saveUrl,feature);

  }

  getAllFeature(){
    return this.api.get(this.restapi.featureUrl + Constants.feature + Constants.getAllUrl)
  }

  deleteFeature(id){
    return this.api.delete(this.restapi.featureUrl + Constants.feature + Constants.deleteUrl + id)
  }

  updateFeature(feature){
    let id = feature.id
    return this.api.put(this.restapi.featureUrl + Constants.feature + Constants.updateUrl + id,feature)
  }

  //Default Entity

  addDefaultEntity(defaultEntity){
    console.log("hello udhaya u r waiting",defaultEntity)
    return this.api.post(this.restapi.entityUrl + Constants.addDefaultEntity,defaultEntity);

  }

  getDefaultEntityByProjectId(id){
    return this.api.get(this.restapi.entityUrl + Constants.getDefaultEntityByProjectId + id)

  }

}
