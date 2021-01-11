import { Request, Response, NextFunction } from "express";
// import * as request from 'request';
import * as asyncLoop from 'node-async-loop';
import * as mongoose from 'mongoose';
import { Resourceschema } from '../model/resource';
const request = require('request');
const resourcemodel = mongoose.model('resource', Resourceschema);
import { SharedService } from '../config/Sharedservice';
const logger = require('../config/Logger');


let listofresources = [];

export class CamundaService {

    private resourcevalue: any;

    constructor() { }

    public camundarequest(req: Request, callback): void {
        // logger.info('Camundaservice.ts : camundarequest');
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
        // logger.info('Camundaservice.ts : camundaauthorization');
        console.log('----------resource-----', this.resourcevalue);
        let body = {
            "variables": {
                "resources": { "value": `${this.resourcevalue}`, "type": "String" },
                "resourcetype": { "value": "Screen", "type": "String" }
            }
        }
        var posturl = `${SharedService.camundaURL}/engine-rest/engine/default/decision-definition/key/Accesslevel/evaluate`;

        return new Promise(resolve => {
            request.post({ url: posturl, json: body }, function (error, response, body) {
                console.log('------error---------', error);
                let responsebody = JSON.stringify(body);
                let finaldata = JSON.parse(responsebody);
                let responsevalue = finaldata[0];
                for (let key in responsevalue) {
                    if (responsevalue.hasOwnProperty(key)) {
                        responsevalue[key].value = responsevalue[key].value.replace(/=/g, ":");
                        responsevalue[key].value = responsevalue[key].value.replace(/(\w+:)|(\w+ :)/g, function (s) {
                            return '"' + s.substring(0, s.length - 1) + '":';
                        });
                        responsevalue[key].value = responsevalue[key].value.replace(/true/g, `"true"`);
                        responsevalue[key].value = responsevalue[key].value.replace(/false/g, `"false"`);
                    }
                }
                console.log("replace value--------", responsevalue);
                const finalvalue = JSON.stringify(responsevalue);
                resolve(JSON.parse(finalvalue));
            });
        })


    }
}
