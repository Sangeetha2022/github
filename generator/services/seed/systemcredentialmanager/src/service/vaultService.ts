import { Request, Response } from 'express';
import {vaultDao} from '../dao/vaultDao';
import { CustomLogger } from '../config/Logger'
let vault = new vaultDao();

export class vaultService {
    
    constructor() { }
    
    public GpSearch(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into vaultService.ts: GpSearch')
     const  vaultData = req.query;
     vault.GpSearch(vaultData,(response)=>{
             new CustomLogger().showLogger('info', 'Exit from vaultService.ts: GpSearch')
         callback(response);
         });
    }
public GpUpdate(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into vaultService.ts: GpUpdate')
     const  vaultData = req.body;
     vault.GpUpdate(vaultData,(response)=>{
             new CustomLogger().showLogger('info', 'Exit from vaultService.ts: GpUpdate')
         callback(response);
         });
    }
public GpGetAllValues(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into vaultService.ts: GpGetAllValues')
     
     vault.GpGetAllValues((response)=>{
             new CustomLogger().showLogger('info', 'Exit from vaultService.ts: GpGetAllValues')
         callback(response);
         });
    }
public GpDelete(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into vaultService.ts: GpDelete')
     const  vaultId = req.params.id;
     vault.GpDelete(vaultId,(response)=>{
             new CustomLogger().showLogger('info', 'Exit from vaultService.ts: GpDelete')
         callback(response);
         });
    }
public GpCreate(req: Request, callback){
    new CustomLogger().showLogger('info', 'Enter into vaultService.ts: GpCreate')
     const  vaultData = req.body;
     vault.GpCreate(vaultData,(response)=>{
             new CustomLogger().showLogger('info', 'Exit from vaultService.ts: GpCreate')
         callback(response);
         });
    }


}