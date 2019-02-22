import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Subscription } from '../project-details/interface/subscription';
import { IEntity } from '../app/entity-manager/interface/Entity';
import {IDeafaultEntity} from '../app/projects/interface/user'



@Injectable({
    providedIn: 'root'
})
export class DataService {

    // private subscription: any = <any>{
    //     name: '',
    //     label: '',
    //     appContext: '',
    //     description: '',
    //     defaultLanguage: 'en',
    //     primaryLanguage: '',
    //     secondaryLanguage: '',
    // };

    private entity: IEntity = <IEntity>{
        name: '',
        description: '',
        project_id: '',
        created_by: '',
        last_modified_by: '',
        updated_at: new Date(),
        field: []
    };


    private defaultLanguage: String = 'en';

    // project info
    private projectInfoSource = new BehaviorSubject<any>({});
    currentProjectInfo = this.projectInfoSource.asObservable();

    //user info
    private defaultEntityInfoSource = new BehaviorSubject<any>({});
    currentDeafultEntityInfoSource = this.defaultEntityInfoSource.asObservable();

    // default language
    private defaultLanguageSource = new BehaviorSubject(this.defaultLanguage);
    currentDefaultLanguage = this.defaultLanguageSource.asObservable();

    // all entity details
    private allEntitySource = new BehaviorSubject<IEntity[]>([]);
    currentAllEntityInfo = this.allEntitySource.asObservable();

    // selected entity details
    private entityInfoSource = new BehaviorSubject<IEntity>(this.entity);
    currentSelectedEntityInfo = this.entityInfoSource.asObservable();

    constructor() { }

    // set default language
    setDefaultLanguage(language: String) {
        this.defaultLanguageSource.next(language);
    }

    // set project details
    setProjectInfo(details: any) {
        this.projectInfoSource.next(details);
    }

     // set selected entity
  setEntity(entity: any) {
    this.entityInfoSource.next(entity);
  }

    // set all entity details
    setAllEntity(entities: IEntity[]) {
        this.allEntitySource.next(entities);
    }

    setDefaultEntityInfo(defaultEntity: IDeafaultEntity[]) {
        console.log("defaultEntity",defaultEntity)
        this.defaultEntityInfoSource.next(defaultEntity);
    }

}
