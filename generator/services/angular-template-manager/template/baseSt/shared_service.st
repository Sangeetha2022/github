shared_service(object) ::= <<
$if(object)$
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class $object.className$Service {

    public DESKTOP_API = 'http://'+window.location.hostname+':8000/desktop';
    public MOBILE_API = '/api/mobile';
}
$endif$
>>