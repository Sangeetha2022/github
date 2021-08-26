connector_admin_component_service(object) ::= <<
import { Injectable } from '@angular/core';
$if(object.importDependency)$$object.importDependency:{name | import { $name.dependencyName$ \} from '$name.dependencyPath$';};separator="\n"$$endif$
$if(object.importComponent)$$object.importComponent:{name | import { $name.classname$ \} from '$name.path$';};separator="\n"$$endif$

@Injectable({
    providedIn: 'root'
})
export class $object.className$Service {
$if(object.serviceVariable)$
$object.serviceVariable:{name |public $name$;};separator="\n"$
$endif$
  constructor(
$if(object.serviceConstructorParams)$$object.serviceConstructorParams:{name | $name$};separator=",\n"$$endif$
  ) { }

$if(object.serviceMethod)$$object.serviceMethod:{name | $name$};separator="\n"$$endif$

}
>>