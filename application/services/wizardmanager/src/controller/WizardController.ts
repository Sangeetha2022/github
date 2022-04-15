import { Request, Response } from 'express';
import { WizardService } from '../service/WizardService';
import { CustomLogger } from '../config/Logger'
let Wizard = new WizardService();

export class WizardController {
    
    constructor() { }
    
    public GpDelete(req: Request, res: Response) {
Wizard.GpDelete(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpDelete');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpDelete');
    })}
public GpSearch(req: Request, res: Response) {
Wizard.GpSearch(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpSearch');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpSearch');
    })}
public GpSearchForUpdate(req: Request, res: Response) {
Wizard.GpSearchForUpdate(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpSearchForUpdate');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpSearchForUpdate');
    })}
public GpGetNounById(req: Request, res: Response) {
Wizard.GpGetNounById(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpGetNounById');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpGetNounById');
    })}
public GpUpdate(req: Request, res: Response) {
Wizard.GpUpdate(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpUpdate');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpUpdate');
    })}
public GpGetAllValues(req: Request, res: Response) {
Wizard.GpGetAllValues(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpGetAllValues');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpGetAllValues');
    })}
public GpCreate(req: Request, res: Response) {
Wizard.GpCreate(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into WizardController.ts: GpCreate');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from WizardController.ts: GpCreate');
    })}


}