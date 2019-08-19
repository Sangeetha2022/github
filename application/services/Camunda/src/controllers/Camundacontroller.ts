import { CamundaService } from '../services/Camundaservice';
import { Request, Response } from 'express';
const logger = require('../config/Logger');

let camunda = new CamundaService;

export class CamundaController {

    public camundacontroller (req: Request, res: Response){
        // logger.info('Camundacontroller.ts : camundacontroller');
        camunda.camundarequest(req,(response) => {
            res.status(200);
            res.json(response)    
        })
    }
}