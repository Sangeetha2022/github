controller(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$

export class $object.entityFileName$Controller {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $flowObj.methodName$(req: Request, res: Response) {$\n$$object.entityFileName$.$flowObj.methodName$(req, (response) => {
     res.status(200);
     res.json(response);
    \})\}};separator="\n"$$endif$


}
>> 