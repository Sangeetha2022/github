import { camundaService } from '../config/camundaService';
import { Request, Response, NextFunction } from "express";
// import * as request from 'request';
import * as asyncLoop from 'node-async-loop';
import * as mongoose from 'mongoose';
import { Resourceschema } from '../model/resource';
import * as request from 'request';

const resourcemodel = mongoose.model('resource', Resourceschema);

let listofresources = [];

export class CamundaService {

    private resourcevalue: any;

    constructor() { }

    public camundarequest(req: Request, callback): void {

        resourcemodel.find().then((result) => {
            asyncLoop(result, (resource, next) => {
                if (resource.resources === 'Landing') {
                    console.log('------ifcondition-loop-----', resource.resources);
                    this.resourcevalue = resource.resources;
                }
                listofresources.push(resource.resources);
                next();
            }, async (err) => {
                if (err) {
                    console.log('----------erro----', err);
                }
                else {
                    let camundaresponse = await this.camundaauthorization();
                    callback(camundaresponse);
                }
            })
        }).catch((error) => {
            console.log('------Error--------', error);
        })

    }

    public camundaauthorization() {
        console.log('----------resource-----', this.resourcevalue);
        var body = {
            "variables": {
                "resources": { "value": `${this.resourcevalue}`, "type": "String" },
                "resourcetype": { "value": "Screen", "type": "String" }
            }
        }

        const postUrl = `${camundaService.camundaUrl}/engine-rest/engine/default/decision-definition/key/Accesslevel/evaluate`;

        return new Promise(resolve => {
            request.post({ url: postUrl, json: body }, function (error, response, body) {
                console.log('------error---------', error);
                console.log('------responsebody---------', body);
                var responsebody = JSON.stringify(body);
                var finaldata = JSON.parse(responsebody);
                var responsevalue = finaldata[0];
                const test = responsevalue;
                const test2 = JSON.stringify(test);
                // const test3 = JSON.parse(test2);
                // // var data = test3.replace(/(\r\n|\n|\r|\s|n)/gm, '');
                // // console.log('-------->>>>', data);
                resolve(JSON.parse(test2));
            });
        })


    }
}