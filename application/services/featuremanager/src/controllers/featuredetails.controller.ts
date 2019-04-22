import { Request, Response } from 'express';
import { FeatureDetailsService } from '../services/featuredetails.service';

let featureDetailsService = new FeatureDetailsService()

export class FeatureDetailsController {

    uploadeFeaturefile = async(req: Request, res: Response) => {
        featureDetailsService.uploadeFeaturefile(req, (user) => {
            console.log('response of uploda featrurea are --- ');
            res.status(200);
            res.json(user);
        })
    }

    public getAllFeatureDetails = async(req: Request, res: Response) => {
        featureDetailsService.getAllFeatureDetails(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public getFeatureDetailsById = async(req: Request, res: Response) => {
        featureDetailsService.getFeatureDetailsById(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public getFeatureEntityByFeatureid = async(req: Request, res: Response) => {
        featureDetailsService.getFeatureEntityByFeatureid(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public getFeatureDetailsByFeatureid = async(req: Request, res: Response) => {
        console.log("ADadadaasadsad",req)
        featureDetailsService.getFeatureDetailsByFeatureid(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }
}