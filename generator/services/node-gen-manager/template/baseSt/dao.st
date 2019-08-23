dao(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
import { CustomLogger } from '../config/Logger'
$if(object.variable.outsideClass)$$endif$

export class $object.entityFileName$Dao {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $flowObj.methodName$($flowObj.parameter$){$\n$new CustomLogger().showLogger('info', 'Enter into $object.entityFileName$Dao.ts: $flowObj.methodName$')$\n$$if(flowObj.variable)$$flowObj.variable$;$endif$$\n$$flowObj.verbs$($if(flowObj.query)$$flowObj.query$$endif$).then((result)$\t$=>$\t${$\n$new CustomLogger().showLogger('info', 'Exit from $object.entityFileName$Dao.ts: $flowObj.methodName$');$\n$callback(result);$\n$\}).catch((error)=>{$\n$callback(error);$\n$\});\}};separator="\n"$$endif$


}
>> 