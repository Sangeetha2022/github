service(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$

export class $object.entityFileName$Service {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $if(flowObj.modifiersObject.modifiers)$async$endif$ $flowObj.methodName$(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into $object.entityFileName$Service.ts: $flowObj.methodName$')
     $if(flowObj.variable)$let $flowObj.variable$$endif$$if(flowObj.modifiersObject.modifiers)$
     $flowObj.modifiersObject.variable_object:{variableObject |
        $variableObject$
     };separator="\n"$
     $flowObj.modifiersObject.jwt_token_variable$
     $flowObj.modifiersObject.encoded_varibale$
     $flowObj.modifiersObject.modifiers:{modifier |
        $if(modifier.modifier_variable)$$modifier.modifier_variable$$endif$
     };separator="\n"$$endif$
     $object.entityFileName$.$flowObj.methodName$($if(flowObj.requestParameter)$$flowObj.requestParameter$,$endif$($flowObj.responseVariable$)=>{
             new CustomLogger().showLogger('info', 'Exit from $object.entityFileName$Service.ts: $flowObj.methodName$')
         callback($flowObj.responseVariable$);
         \});
    \}$if(flowObj.modifiersObject.modifiers)$
    $flowObj.modifiersObject.jwt_verify$
    $endif$
    };separator="\n"$$endif$
    
    

}
>>