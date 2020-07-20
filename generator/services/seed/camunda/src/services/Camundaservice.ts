import { Request, Response, NextFunction } from "express";
// import * as request from 'request';
import * as asyncLoop from 'node-async-loop';
import * as mongoose from 'mongoose';
import { Resourceschema } from '../model/resource';
import { CustomLogger } from '../config/Logger'
import { camundaService } from '../config/camundaService';
import { Camundadao } from '../dao/Camundadao';
import { DmnWorkerFile } from '../worker/DMNWorker';


import * as path from 'path';
import * as fs from 'fs';

let listofresources = [];
let camundadao = new Camundadao();
const request = require('request');
const resourcemodel = mongoose.model('resource', Resourceschema);

export class CamundaService {

    private resourcevalue: any;
    private dmnworker = new DmnWorkerFile();

    constructor() { }

    public camundarequest(req: Request, callback): void {
        new CustomLogger().showLogger('info', 'Enter into Camundaservice.ts: camundarequest');
        resourcemodel.find().then((result) => {
            asyncLoop(result, (resource, next) => {
                if (resource.resources === 'home') {
                    this.resourcevalue = resource.resources;
                }
                listofresources.push(resource.resources);
                next();
            }, async (err) => {
                if (err) {
                    return err;
                }
                else {
                    let camundaresponse = await this.camundaauthorization();
                    new CustomLogger().showLogger('info', 'Exit from Camundaservice.ts: camundarequest');
                    callback(camundaresponse);
                }
            })
        }).catch((error) => {
            return error;
        })

    }


    public postscreensservice(screencontent, callback){
        camundadao.postscreens(screencontent,(response)=>{
            callback(response);
        })
    }

    public getallscreensservice(req:Request,callback){
        camundadao.getallscreen(response=>{
            callback(response);
        });
    }


    public camundaauthorization() {
        new CustomLogger().showLogger('info', 'Enter into Camundaservice.ts: camundaauthorization');
        var body = {
            "variables": {
                "resources": { "value": `${this.resourcevalue}`, "type": "String" },
                "resourcetype": { "value": "Screen", "type": "String" }
            }
        }
        const postUrl = `${camundaService.camundaUrl}/engine-rest/engine/default/decision-definition/key/Accesslevel/evaluate`;
        new CustomLogger().showLogger('info', 'Exit from Camundaservice.ts: camundaauthorization');

        return new Promise(resolve => {
            request.post({ url: postUrl, json: body }, function (error, response, body) {
                var responsebody = JSON.stringify(body);
                var finaldata = JSON.parse(responsebody);
                var responsevalue = finaldata[0];
                const test = responsevalue;
                const test2 = JSON.stringify(test);
                // const test3 = JSON.parse(test2);
                // // var data = test3.replace(/(\r\n|\n|\r|\s|n)/gm, '');
                console.log('-------->>>>', body);
                resolve(JSON.parse(test2));
            });
        })
    }

    generateDMN(pageTitles, callback) {
        console.log('REQ=====>>>>>', pageTitles);
        this.dmnworker.dmnTable(pageTitles, async (response) => {
            let dmnresponse = await this.postDMNtoCamunda();
            callback(dmnresponse);
        })
    }

    postDMNtoCamunda() {
        const DmnPath = path.resolve(__dirname, '../../Gep_authorize2.dmn');
        const postUrl = `${camundaService.camundaUrl}/engine-rest/deployment/create`;
        console.log('---------DMNpath======>>>>', DmnPath);
        const options = {
            url: postUrl,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                "data": fs.createReadStream(DmnPath),
                "deployment-name": "Gepauthorize",
                "enable-duplicate-filtering": "true",
                "deploy-changed-only": "true",
            }
        }
        request.post(options, ((err, response, body) => {
            console.log('error --->>>', err);
            // console.log('bodyy -------->>>>', body);
            // console.log('i am response -->>', response);
            return body;
        }))

    }
}