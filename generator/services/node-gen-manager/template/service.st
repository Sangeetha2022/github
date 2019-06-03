service(serviceData) ::= <<
import { Request } from 'express';
import {  $serviceData.toComponentName$ } from '$serviceData.daoPath$';

let gpdao = new  $serviceData.toComponentName$()

export class $serviceData.componentName$ {

    public gpcreate(req: Request, callback: CallableFunction) {
        gpdao.gpcreate(req, (data) => {
            callback(data)
        })
    }
}

>>