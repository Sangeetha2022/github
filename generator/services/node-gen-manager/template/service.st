service(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$

export class $object.entityFileName$Service {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $flowObj.methodName$(req: Request, callback: CallableFunction){
    $if(flowObj.variable)$$flowObj.variable:{varObj| let $varObj.variable$}$;$endif$
    $if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | $variableObj.variableName$}$$endif$.$flowObj.methodName$(req,(result)$\t$=>$\t${$\n$callback(result);$\n$\});\}};separator="\n"$$endif$


}
>>