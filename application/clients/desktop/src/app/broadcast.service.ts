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


    sendmessage(message: {}) {
        this.currentUserNamestore.next(message);
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
