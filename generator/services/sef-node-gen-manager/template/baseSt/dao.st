dao(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
import { CustomLogger } from '../config/Logger'
import { SystemEntryService } from '../config/SystemEntryService';
import fetch from 'node-fetch';
const faker = require('faker');
$if(object.variable.outsideClass)$$endif$

export class $object.entityFileName$Dao {
    $if(object.variable.insideClass)$
    $object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    $if(object.flowAction)$
    $object.flowAction:{flowObj | public $flowObj.methodName$($flowObj.parameter$){
    $\n$new CustomLogger().showLogger('info', 'Enter into $object.entityFileName$Dao.ts: $flowObj.methodName$')$\n$
    $if(flowObj.variable)$$flowObj.variable$;$if(flowObj.objectiteration)$$flowObj.objectiteration$;$endif$$\n$;$endif$
    $\n$$if(flowObj.verbs)$$flowObj.verbs$$if(flowObj.query)$$flowObj.query$$endif$.then(res => res.json().then(data$\t$=>$\t$({ data $\n$\}))).then(obj=> callback(obj.data));$endif$\}};separator="\n"$$endif$

    
}
>> 