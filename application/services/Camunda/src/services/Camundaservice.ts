import { Request, Response, NextFunction } from "express";
// import * as request from 'request';
const request = require('request');

export class CamundaService {

    public camundarequest(req: Request, callback): void {
        var body = req.body;
        console.log('---------->>>>', body);
        // var geturl = 'http://3.92.72.204:32676/engine-rest/engine/default/decision-definition/count';
        var posturl = 'http://3.92.72.204:32676/engine-rest/engine/default/decision-definition/key/Accesslevel/evaluate'


        request.post({ url: posturl, json: body }, function (error, response, body) {
            var responsebody = body;
            callback({ 'body': responsebody });
        });

    }

}