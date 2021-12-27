import * as request from 'request-promise-native';

export class ApiAdapter {

    post = (url, body) => {
        return new Promise((resolve, reject) => {
            request.post({ url: url, json: body }, (error, response, body) => {
                this.sendResponse(resolve, reject, error, response, body);
            });
        });
    }

    get = (url) => {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                this.sendResponse(resolve, reject, error, response, body);
            });
        });
    }

    put = (url, body) => {
        return new Promise((resolve, reject) => {
            request.put({ url: url, json: body }, (error, response, body) => {
                this.sendResponse(resolve, reject, error, response, body);
            });
        });
    }

    delete = (url) => {
        return new Promise((resolve, reject) => {
            request.delete(url, (error, response, body) => {
                this.sendResponse(resolve, reject, error, response, body);
            });
        });
    }

    private sendResponse = (resolve, reject, error, response, body) => {
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