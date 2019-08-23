controller(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
import { CustomLogger } from '../config/Logger'
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$

export class $object.entityFileName$Controller {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    constructor() { }
    
$if(object.flowAction)$$object.flowAction:{flowObj | public $flowObj.methodName$(req: Request, res: Response) {$\n$$object.entityFileName$.$flowObj.methodName$(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into $object.entityFileName$Controller.ts: $flowObj.methodName$');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from $object.entityFileName$Controller.ts: $flowObj.methodName$');
    \})\}};separator="\n"$$endif$


}
>> 