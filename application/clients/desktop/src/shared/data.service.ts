import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Subscription } from '../project-details/interface/subscription';
import { IEntity } from '../app/project-component/interface/Entity';
import { IDeafaultEntity } from '../app/projects/interface/user';
import { IFlow } from 'src/app/flow-manager/interface/flow';
import { IGenerateFlow } from 'src/app/flow-manager/interface/generationFlow';



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

    private Id: any;


    private defaultLanguage: String = 'en';

    // project info
    private projectInfoSource = new BehaviorSubject<any>({});
    currentProjectInfo = this.projectInfoSource.asObservable();

    // flow info
    private flowIdInfoSource = new BehaviorSubject<any>({});
    currentFlowIdInfoSource = this.flowIdInfoSource.asObservable();

    private featureFlowIdInfoSource = new BehaviorSubject<any>({});
    currentFeatureFlowIdInfoSource = this.featureFlowIdInfoSource.asObservable();

    // default language
    private defaultLanguageSource = new BehaviorSubject(this.defaultLanguage);
    currentDefaultLanguage = this.defaultLanguageSource.asObservable();

    // all entity details
    private allEntitySource = new BehaviorSubject<IEntity[]>([]);
    currentAllEntityInfo = this.allEntitySource.asObservable();

    // selected entity details
    private entityInfoSource = new BehaviorSubject<IEntity>(this.entity);
    currentSelectedEntityInfo = this.entityInfoSource.asObservable();

    // screen agGrid Field binding info
    private agGridInfoSource = new BehaviorSubject<any[]>([]);
    currentAgGridInfoSource = this.agGridInfoSource.asObservable();

    // screen agGrid Entity info
    private agGridEntitySource = new BehaviorSubject<any>('');
    currentAgGridEntitySource = this.agGridEntitySource.asObservable();

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

    // screen agGrid Field binding info
    setAgGridValue(agGrid: any[]) {
        this.agGridInfoSource.next(agGrid);
    }

    //  screen agGrid Entity info
    setAgGridEntity(agGrid: any) {
        this.agGridEntitySource.next(agGrid);
    }


    setFlowIdInfo(flow: IFlow) {
        this.flowIdInfoSource.next(flow);
    }


    setFeatureFlowIdInfo(flow: IGenerateFlow) {
        console.log('feature flow', flow);
        this.featureFlowIdInfoSource.next(flow);
    }
}
