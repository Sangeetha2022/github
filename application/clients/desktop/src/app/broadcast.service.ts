import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Brodcastservice {


    constructor() {
    }

    public gaurdarray: any[] = [];
    private currentUserNamestore = new BehaviorSubject<{}>({});

    public currentusername = this.currentUserNamestore.asObservable();

    // Send feature id to EntityModelComponent
    private featureId = new BehaviorSubject<String>('default featureId');
    public currentFeatureId = this.featureId.asObservable();

    sendmessage(message: {}) {
        this.currentUserNamestore.next(message);
    }
    changeFeatureId(featureId: String) {
        this.featureId.next(featureId);
    }

}

@Injectable({
    providedIn: 'root'
})

export class Dataservice {

    constructor() {

    }
    private datasource = new BehaviorSubject<{}>({});

    public data = this.datasource.asObservable();

    updateDataselection(data: any) {
        this.datasource.next(data);
      }

}
