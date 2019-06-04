service(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$

export class $object.entityFileName$Service {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $flowObj.methodName$(req: Request, callback){
     $if(flowObj.variable)$const $flowObj.variable$$endif$
     $object.entityFileName$.$flowObj.methodName$($if(flowObj.requestParameter)$$flowObj.requestParameter$,$endif$($flowObj.responseVariable$)=>{
         callback($flowObj.responseVariable$);
         \});
    \}};separator="\n"$$endif$


}
>>