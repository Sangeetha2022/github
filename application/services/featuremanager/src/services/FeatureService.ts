import { Request } from 'express';
import { FeatureDao } from '../daos/FeatureDao';



export class FeatureService{

    private featureDao = new FeatureDao();

    public saveFeature (req: Request, callback:CallableFunction) {      
        const featureData = req.body;          
        this.featureDao.saveFeatures(featureData, (feature) => {
            callback(feature)
        })
    }

    public updateFeature (req: Request, callback:CallableFunction) {  
        const featureId = req.body._id;
        const featureData = req.body;         
        this.featureDao.updateFeatures(featureId, featureData, (feature) => {
            callback(feature)
        })
    }

    public getAllFeature (req: Request, callback:CallableFunction) {           
        this.featureDao.getAllFeature((feature) => {
            callback(feature)
        })
    }

    public getFeatureById (req: Request, callback:CallableFunction) {
        const featureId = req.params.id;           
        this.featureDao.getFeatureById(featureId, (feature) => {
            callback(feature)
        })
    }

    public getFeatureByProjectId (req: Request, callback:CallableFunction) {  
        const projectId = req.query.projectId;         
        this.featureDao.getFeatureByProjectId(projectId, (feature) => {
            callback(feature)
        })
    }
    
    public deleteFeature (req: Request, callback:CallableFunction) {
        const featureId = req.params.id;    
        this.featureDao.deleteFeatures(featureId, (feature) => {
            callback(feature)
        })
    }

}