service(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
import { CustomLogger } from '../config/Logger'
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
const $object.entityFileName$ = new $object.entityFileName$Dao();
export class $object.entityFileName$Service {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $flowObj.methodName$(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into $object.entityFileName$Service.ts: $flowObj.methodName$')
     $if(flowObj.variable)$const $flowObj.variable$$endif$
     $object.entityFileName$.$flowObj.methodName$($if(flowObj.requestParameter)$$flowObj.requestParameter$,$endif$($flowObj.responseVariable$)=>{
             new CustomLogger().showLogger('info', 'Exit from $object.entityFileName$Service.ts: $flowObj.methodName$')
         callback($flowObj.responseVariable$);
         \});
    \}};separator="\n"$$endif$


}
>>