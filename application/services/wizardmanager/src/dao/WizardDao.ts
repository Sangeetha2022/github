import * as mongoose from 'mongoose';
import WizardModel from '../models/Wizard';
import { CustomLogger } from '../config/Logger'


export class WizardDao {
    private Wizard = WizardModel;
    constructor() { }
    
    public async GpDelete(WizardId, callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpDelete');

    

    
    
    
    this.Wizard.findByIdAndRemove(WizardId).then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpDelete');

        callback(result);
}).catch((error)=>{
callback(error);
});}
public async GpSearch(WizardData, callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpSearch');

    let andkey ;let and_obj = {} ;let orkey ;let or_obj = {} ;;

    
    
    Object.entries(WizardData).forEach(
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
    this.Wizard.find({$and: [
                            {
                                $or: [
                                   or_obj
                                ]
                            },
                            and_obj
                        ]}).then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpSearch');

        callback(result);
}).catch((error)=>{
callback(error);
});}
public async GpSearchForUpdate(WizardData, callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpSearchForUpdate');

    

    
    
    
    this.Wizard.findOneAndUpdate({ _id: WizardData._id }, WizardData, { new: true }).then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpSearchForUpdate');

        callback(result);
}).catch((error)=>{
callback(error);
});}
public async GpGetNounById(WizardId, callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpGetNounById');

    

    
    
    
    this.Wizard.findById(WizardId).then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpGetNounById');

        callback(result);
}).catch((error)=>{
callback(error);
});}
public async GpUpdate(WizardData, callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpUpdate');

    

    
    
    
    this.Wizard.findOneAndUpdate({ _id: WizardData._id }, WizardData, { new: true }).then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpUpdate');

        callback(result);
}).catch((error)=>{
callback(error);
});}
public async GpGetAllValues(callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpGetAllValues');

    

    
    
    
    this.Wizard.find().then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpGetAllValues');

        callback(result);
}).catch((error)=>{
callback(error);
});}
public async GpCreate(WizardData, callback){
    
    new CustomLogger().showLogger('info', 'Enter into WizardDao.ts: GpCreate');

    let temp = new WizardModel(WizardData);

    
    
    
    temp.save().then((result)	=>	{

        new CustomLogger().showLogger('info', 'Exit from WizardDao.ts: GpCreate');

        callback(result);
}).catch((error)=>{
callback(error);
});}


}