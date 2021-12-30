shared_service(object) ::= <<
$if(object)$
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class $object.className$Service {

    public DESKTOP_API = environment.DESKTOP_API;
    public UPLOAD_API = environment.UPLOAD_API;
    public MOBILE_API = environment.MOBILE_API;
}
$endif$
>>