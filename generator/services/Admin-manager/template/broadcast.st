broadcast() ::= <<
import{ Injectable \} from '@angular/core';
import { Subject, BehaviourSubject \} from 'rxjs;

@Injectable({
    providedIn:'root'
})

export class BroadcastService {
    constructor(){

    }
    public guardarray: any[] = [];
    private currentUserNamestore = new BehaviourSubject<{}>({});
    private currentusername = this.currentUserNamestore.asObservable();

    sendmessage(message:{}){
        this.currentUserNamestore.next(message);
    }
}
>>