import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { IEntity } from './interface/Entity';

@Injectable({
  providedIn: 'root'
})
export class EntityManagerService {

  private entity: IEntity = <IEntity>{
    name: '',
    description: '',
    field: []
  };

  private entityInfoSource = new BehaviorSubject(this.entity);
  currentEntityInfo = this.entityInfoSource.asObservable();

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

  // data sharing
  setEntity(entity: any) {
    this.entityInfoSource.next(entity);
  }
}
