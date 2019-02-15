import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Subscription } from '../project-details/interface/subscription';




@Injectable({
    providedIn: 'root'
})
export class DataService {

    private subscription: any = <any> {
        name: '',
        label: '',
        appContext: '',
        description: '',
        defaultLanguage: 'en',
        primaryLanguage: '',
        secondaryLanguage: '',
    };

    private projectInfoSource = new BehaviorSubject(this.subscription);
    currentProjectInfo = this.projectInfoSource.asObservable();

    constructor() { }

    changeProjectInfo(details: any) {
        this.projectInfoSource.next(details);
    }

}
