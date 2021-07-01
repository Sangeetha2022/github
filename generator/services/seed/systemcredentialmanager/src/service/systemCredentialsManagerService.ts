import { Request, Response } from 'express';
import { systemCredentialsManagerDao } from '../dao/systemCredentialsManagerDBDao';
import { CustomLogger } from '../config/Logger'
let systemCredentialsManager = new systemCredentialsManagerDao();

export class systemCredentialsManagerService {

    constructor() { }

    public GpSearch(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpSearch')
        const systemCredentialsManagerData = req.query;
        systemCredentialsManager.GpSearch(systemCredentialsManagerData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpSearch')
            callback(response);
        });
    }

    public GpUpdate(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpUpdate')
        const systemCredentialsManagerData = req.body;
        systemCredentialsManager.GpUpdate(systemCredentialsManagerData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpUpdate')
            callback(response);
        });
    }

    public GpGetAllValues(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpGetAllValues')
        systemCredentialsManager.GpGetAllValues((response) => {
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpGetAllValues')
            callback(response);
        });
    }
    public GpDelete(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpDelete')
        const systemCredentialsManagerId = req.params.id;
        systemCredentialsManager.GpDelete(systemCredentialsManagerId, (response) => {
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpDelete')
            callback(response);
        });
    }
    public GpCreate(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpCreate')
        const systemCredentialsManagerData = req.body;
        systemCredentialsManager.GpCreate(systemCredentialsManagerData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpCreate')
            callback(response);
        });
    }


}