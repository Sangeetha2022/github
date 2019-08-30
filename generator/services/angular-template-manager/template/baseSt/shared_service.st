shared_service(object) ::= <<
$if(object)$
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class $object.className$Service {

public apiGateway: String = 'http://'+window.location.hostname+':31234';
public adminManager: String = 'http://'+window.location.hostname+':3010';

}
$endif$
>>