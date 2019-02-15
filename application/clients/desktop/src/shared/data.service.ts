import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Subscription } from '../project-details/interface/subscription';
import { IEntity } from '../app/entity-manager/interface/Entity';



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

    private defaultLanguage: String = 'en';

    // project info
    private projectInfoSource = new BehaviorSubject<any>({});
    currentProjectInfo = this.projectInfoSource.asObservable();

    // default language
    private defaultLanguageSource = new BehaviorSubject(this.defaultLanguage);
    currentDefaultLanguage = this.defaultLanguageSource.asObservable();

    // all entity details
    private allEntitySource = new BehaviorSubject<IEntity[]>([]);
    currentAllEntityInfo = this.allEntitySource.asObservable();

    constructor() { }

    // set default language
    setDefaultLanguage(language: String) {
        this.defaultLanguageSource.next(language);
    }

    // set project details
    setProjectInfo(details: any) {
        this.projectInfoSource.next(details);
    }

    // set entity details
    setAllEntity(entities: IEntity[]) {
        this.allEntitySource.next(entities);
    }

}
