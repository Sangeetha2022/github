import * as mongoose from 'mongoose';
import vaultModel from '../models/vault';
import { CustomLogger } from '../config/Logger'


export class vaultDao {
    private vault = vaultModel;
    constructor() { }
public GpSearch(vaultData, callback){
new CustomLogger().showLogger('info', 'Enter into vaultDao.ts: GpSearch')
let andkey ;let and_obj = {} ;let orkey ;let or_obj = {} ;;Object.entries(vaultData).forEach(
                        ([key,value]) => {
                            if(value !== ''){
                                andkey = key;
                                and_obj[andkey] = value;
                            }
                            else{
                                orkey = key;
                                or_obj[orkey] = { $ne: '' }
                            }
                        }
                    );;
;
this.vault.find({$and: [
                        {
                            $or: [
                               or_obj
                            ]
                        },
                        and_obj
                    ]}).then((result)	=>	{
new CustomLogger().showLogger('info', 'Exit from vaultDao.ts: GpSearch');
callback(result);
}).catch((error)=>{
callback(error);
});}
public GpUpdate(vaultData, callback){
new CustomLogger().showLogger('info', 'Enter into vaultDao.ts: GpUpdate')

this.vault.findOneAndUpdate({ _id: vaultData._id }, vaultData, { new: true }).then((result)	=>	{
new CustomLogger().showLogger('info', 'Exit from vaultDao.ts: GpUpdate');
callback(result);
}).catch((error)=>{
callback(error);
});}
public GpGetAllValues(callback){
new CustomLogger().showLogger('info', 'Enter into vaultDao.ts: GpGetAllValues')

this.vault.find().then((result)	=>	{
new CustomLogger().showLogger('info', 'Exit from vaultDao.ts: GpGetAllValues');
callback(result);
}).catch((error)=>{
callback(error);
});}
public GpDelete(vaultId, callback){
new CustomLogger().showLogger('info', 'Enter into vaultDao.ts: GpDelete')

this.vault.findByIdAndRemove(vaultId).then((result)	=>	{
new CustomLogger().showLogger('info', 'Exit from vaultDao.ts: GpDelete');
callback(result);
}).catch((error)=>{
callback(error);
});}
public GpCreate(vaultData, callback){
new CustomLogger().showLogger('info', 'Enter into vaultDao.ts: GpCreate')
let temp = new vaultModel(vaultData);
;
temp.save().then((result)	=>	{
new CustomLogger().showLogger('info', 'Exit from vaultDao.ts: GpCreate');
callback(result);
}).catch((error)=>{
callback(error);
});}


}