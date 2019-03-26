import { Request, Response } from 'express';
import { FeatureDetailsDao } from '../daos/fetauredetails.dao';

let featureDetailsDao = new FeatureDetailsDao()

export class FeatureDetailsService {

    uploadeFeaturefile = async(req: Request, callback:CallableFunction) => {
            console.log("=req.body = path>> ", req.body )
            console.log("=req.file = path>> ", req['file'] )
        featureDetailsDao.uploadeFeaturefile(req, (feature) => {
            callback(feature)
        })
    }

}