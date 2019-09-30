shared_service(object) ::= <<
$if(object)$
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class $object.className$Service {

    public DESKTOP_API = '/api/desktop';
    public MOBILE_API = '/api/mobile';
}
$endif$
>>