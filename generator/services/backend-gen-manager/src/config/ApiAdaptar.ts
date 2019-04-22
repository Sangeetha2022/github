import * as request from 'request-promise-native';

export class ApiAdaptar {

    post = (url, body) => {
        return new Promise((resolve, reject) => {
            request.post({ url: url, json: body }, (error, response, body) => {
                // console.log(" - - -  - - - - - > > > > ", this)
                this.sendResponse(resolve, reject, error, response, body);
            });
        });
    }

    get = (url) => {
        return new Promise((resolve, reject) => {
                console.log(" - -- > > ", url)
            request.get(url, (error, response, body) => {
                // console.log(" - -- > > ", body)
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
            // console.log('delete url are --------  ', url);
            request.delete(url, (error, response, body) => {
                this.sendResponse(resolve, reject, error, response, body);
            });
        });
    }

    private sendResponse = (resolve, reject, error, response, body) => {
        // console.log('response ------------  ', response, '  - ------ -  ', body);
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
