import { Request, Response } from 'express';
import { FeatureDetailsDao } from '../daos/featuredetails.dao';

let featureDetailsDao = new FeatureDetailsDao()

export class FeatureDetailsService {

    uploadeFeaturefile = async (req: Request, callback: CallableFunction) => {
        console.log("=req.body = path>> ", req.body)
        console.log("=req.file = path>> ", req['file'])
        featureDetailsDao.uploadeFeaturefile(req, (feature) => {
            callback(feature)
        })
    }

    public getAllFeatureDetails = async (req: Request, callback: CallableFunction) => {
        featureDetailsDao.getAllFeatureDetails(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureDetailsById = async (req: Request, callback: CallableFunction) => {
        featureDetailsDao.getFeatureDetailsById(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureEntityByFeatureid = async (req: Request, callback: CallableFunction) => {
        featureDetailsDao.getFeatureEntityByFeatureid(req, (feature) => {
            callback(feature)
        })
    }

    
    public getFeatureDetailsByFeatureid = async (req: Request, callback: CallableFunction) => {
        console.log("ADadadaasadsad",req)
        featureDetailsDao.getFeatureDetailsByFeatureid(req, (feature) => {
            callback(feature)
        })
    }

    
}