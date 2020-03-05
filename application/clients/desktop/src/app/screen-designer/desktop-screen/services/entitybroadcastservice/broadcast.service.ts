import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Brodcastservice {


    constructor() {
    }

    private entitynamestore = new BehaviorSubject<{}>({});

    public entitydetails = this.entitynamestore.asObservable();


    sendmessage(message: {}) {
        this.entitynamestore.next(message);
    }


}
