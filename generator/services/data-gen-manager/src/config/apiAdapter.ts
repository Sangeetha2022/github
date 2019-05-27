import * as request from 'request-promise-native';
import { resolve } from 'url';
import { response } from 'express';

export class ApiAdapter {

    get = (url) => {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                this.sendresponse(resolve, reject, error, response, JSON.parse(body))
            })

        })
    }

    private sendresponse = (resolve, reject, error, response, body) => {
        if (response.statusCode === 200) {
            resolve(body);
        } else if (response.statusCode === 404) {
            reject({
                code: 404,
                message: "api not found"
            });
        } else {
            reject(error);
        }
    }
}
