shared_service(object) ::= <<
$if(object)$
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class $object.className$Service {

public $object.variableName$: String = '$object.protocol$://$object.link$:$object.port$';

}
$endif$
>>