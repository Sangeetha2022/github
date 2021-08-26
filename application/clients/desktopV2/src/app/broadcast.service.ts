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
    
    sendmessage(message: {}) {
        this.currentUserNamestore.next(message);
    }

}

