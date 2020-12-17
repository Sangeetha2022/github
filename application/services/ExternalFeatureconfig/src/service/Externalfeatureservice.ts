import { Request, Response, response } from 'express';
import { externalFeatureDao } from '../dao/Externalfeaturedao';
import { FeatureManagerservice } from '../apiservice/featureservice';
import * as Busboy from 'busboy';
import * as yaml from 'yaml';

let externalfeature = new externalFeatureDao();
let featuremanager = new FeatureManagerservice();
let projectId;
let extfeaturedata;
let featureobj = {
    name: '',
    type: '',
    project: '',
    externalfeatureconfig: ''
}

export class externalFeatureService {

    constructor() { }

    public extrfeatureservice(req: Request, callback) {

        console.log('-------queryvalue------', req.query);
        let busboy = new Busboy({ headers: req.headers });
        busboy.on('file', (fieldname, file, filename) => {
            // console.log('-------file data------', file, filename);
            file.on('data', async (data) => {
                extfeaturedata = yaml.parse(data.toString());
                let extrfeature = await this.Saveexternaldata(extfeaturedata);
                console.log('------file-----', extrfeature['featurename']);
                projectId = req.query.projectId;
                console.log('------featureobj-----', featureobj);
                let savefeature = await this.Savefeature(extrfeature, projectId);
            });
            file.on('end', () => {
                console.log('File saved');
                callback('saved to db successfully');
            });
        });
        req.pipe(busboy);
    }

    public Saveexternaldata(value) {
        console.log('------- save data------', value);
        return new Promise((resolve, reject) => {
            externalfeature.extrnFeaturesave(value, (response, error) => {
                if (error) {
                    reject(error);
                }
                resolve(response);
            });
        })
    }

    public Savefeature(extrfeature, projectid) {
        return new Promise((resolve, reject) => {
            featureobj.name = extrfeature['featurename'];
            featureobj.type = 'external';
            featureobj.externalfeatureconfig = extrfeature['_id'];
            featureobj.project = projectid;

            featuremanager.Createfeature(featureobj, (response, error) => {
                if (error) {
                    reject(error);
                }
                resolve(response);
            })
        })
    }

    public extrfeaturebyId(req: Request, callback) {
        let exterfeatureId = req.params.id;
        externalfeature.extrnfeaturegetbyId(exterfeatureId, (response, err) => {
            if(err){
                callback(err);
            }
            callback(response);
        })
    }

}