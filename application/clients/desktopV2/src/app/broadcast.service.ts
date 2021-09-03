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
    private featureId = new BehaviorSubject<String>('default featureId');
    
    sendmessage(message: {}) {
        this.currentUserNamestore.next(message);
    }
    changeFeatureId(featureId: String) {
        this.featureId.next(featureId);
    }

}

