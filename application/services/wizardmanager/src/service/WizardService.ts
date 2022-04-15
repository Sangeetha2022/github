import { Request, Response } from 'express';
import {WizardDao} from '../dao/WizardDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
let Wizard = new WizardDao();

export class WizardService 
{    
    constructor() { }
    
    public  GpDelete(req: Request, callback)
    {
        new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpDelete')
        let  WizardId = req.params.id;
        Wizard.GpDelete(WizardId,(response)=>
        {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpDelete')
             callback(response);
        });
    }
    
    public  GpSearch(req: Request, callback)
    {
        new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpSearch')
        let  WizardData = req.query;
        Wizard.GpSearch(WizardData,(response)=>
        {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpSearch')
             callback(response);
        });
    }
    
    public  GpSearchForUpdate(req: Request, callback)
    {
         new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpSearchForUpdate')
         let  WizardData = req.body;
         Wizard.GpSearchForUpdate(WizardData,(response)=>
         {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpSearchForUpdate')
             callback(response);
         });
    }
    
    public  GpGetNounById(req: Request, callback)
    {
        new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpGetNounById')
        let  WizardId = req.params.id;
        Wizard.GpGetNounById(WizardId,(response)=>
        {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpGetNounById')
             callback(response);
        });
    }
    
    public  GpUpdate(req: Request, callback)
    {
        new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpUpdate')
        let  WizardData = req.body;
        Wizard.GpUpdate(WizardData,(response)=>
        {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpUpdate')
             callback(response);
        });
    }
    
    public  GpGetAllValues(req: Request, callback)
    {
        new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpGetAllValues')     
        Wizard.GpGetAllValues((response)=>
        {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpGetAllValues')
             callback(response);
        });
    }
    
    public  GpCreate(req: Request, callback)
    {
        new CustomLogger().showLogger('info', 'Enter into WizardService.ts: GpCreate')
        let  WizardData = req.body;
        Wizard.GpCreate(WizardData,(response)=>
        {
             new CustomLogger().showLogger('info', 'Exit from WizardService.ts: GpCreate')
             callback(response);
        });
    }
    
    
    
    
}