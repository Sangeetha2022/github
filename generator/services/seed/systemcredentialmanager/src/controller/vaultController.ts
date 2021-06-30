import { Request, Response } from 'express';
import { vaultService } from '../service/vaultService';
import { CustomLogger } from '../config/Logger'
let vault = new vaultService();

export class vaultController {
    
    constructor() { }
    
    public GpSearch(req: Request, res: Response) {
vault.GpSearch(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into vaultController.ts: GpSearch');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from vaultController.ts: GpSearch');
    })}
public GpUpdate(req: Request, res: Response) {
vault.GpUpdate(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into vaultController.ts: GpUpdate');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from vaultController.ts: GpUpdate');
    })}
public GpGetAllValues(req: Request, res: Response) {
vault.GpGetAllValues(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into vaultController.ts: GpGetAllValues');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from vaultController.ts: GpGetAllValues');
    })}
public GpDelete(req: Request, res: Response) {
vault.GpDelete(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into vaultController.ts: GpDelete');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from vaultController.ts: GpDelete');
    })}
public GpCreate(req: Request, res: Response) {
vault.GpCreate(req, (response) => {
                new CustomLogger().showLogger('info', 'Enter into vaultController.ts: GpCreate');
     res.status(200);
     res.json(response);
                new CustomLogger().showLogger('info', 'Exit from vaultController.ts: GpCreate');
    })}


}