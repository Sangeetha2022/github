route(object) ::=  <<
import { Request, Response, NextFunction } from "express";
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
$if(object.variable.outsideClass)$$object.variable.outsideClass:{variableObj | let $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$

export class Routes {
    $if(object.variable.insideClass)$$object.variable.insideClass:{variableObj | private $variableObj.variableName$ = $variableObj.parentName$;};separator="\n"$$endif$
    
    public routes(app): void {
          app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        $if(object.flowAction)$$object.flowAction:{flowObj | app.route('$flowObj.routeUrl$').$flowObj.apiAction$(this.$flowObj.variableName$.$flowObj.methodName$);};separator="\n"$$endif$
     }

}
>> 