import * as request from "request-promise-native";

export class ApiAdaptar {

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
                if (body !== undefined) {
                    this.sendResponse(resolve, reject, error, response, JSON.parse(body));
                } else if (body === undefined) {
                    this.sendResponse(resolve, reject, error, response, null);
                }
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
        if (body !== null) {
            if (response.statusCode === 200) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: " request has succeeded"
                });
            } else if (response.statusCode === 201) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: "request has succeeded and a new resource has been created"
                });
            } else if (response.statusCode === 202) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: "request has been received but not yet acted upon"
                });
            } else if (response.statusCode === 203) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: "non authoritative info"
                });
            } else if (response.statusCode === 204) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: "no conent"
                });
            } else if (response.statusCode === 205) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: "reset content"
                });
            } else if (response.statusCode === 206) {
                resolve({
                    body,
                    code: response.statusCode,
                    message: "partial content"
                });
            } else if (response.statusCode === 400) {
                reject({
                    code: response.statusCode,
                    message: "bad request"
                });
            } else if (response.statusCode === 401) {
                reject({
                    code: response.statusCode,
                    message: "unauthorized"
                });
            } else if (response.statusCode === 402) {
                reject({
                    code: response.statusCode,
                    message: "Payment Required"
                });
            } else if (response.statusCode === 403) {
                reject({
                    code: response.statusCode,
                    message: "forbidden"
                });
            } else if (response.statusCode === 404) {
                reject({
                    code: response.statusCode,
                    message: "not found"
                });
            } else if (response.statusCode === 405) {
                reject({
                    code: response.statusCode,
                    message: "method not allowed"
                });
            } else if (response.statusCode === 406) {
                reject({
                    code: response.statusCode,
                    message: "not acceptable"
                });
            } else if (response.statusCode === 407) {
                reject({
                    code: response.statusCode,
                    message: "proxy authentication required"
                });
            } else if (response.statusCode === 408) {
                reject({
                    code: response.statusCode,
                    message: "request timeout"
                });
            } else if (response.statusCode === 500) {
                reject({
                    code: response.statusCode,
                    message: "internal server error"
                });
            } else if (response.statusCode === 501) {
                reject({
                    code: response.statusCode,
                    message: "request method is not supported by the server and cannot be handled"
                });
            } else if (response.statusCode === 502) {
                reject({
                    code: response.statusCode,
                    message: "bad request"
                });
            } else if (response.statusCode === 503) {
                reject({
                    code: response.statusCode,
                    message: "service available"
                });
            } else if (response.statusCode === 504) {
                reject({
                    code: response.statusCode,
                    message: "gateway timeout"
                });
            } else if (response.statusCode === 505) {
                reject({
                    code: response.statusCode,
                    message: "HTTP version used in the request is not supported by the server"
                });
            } else {
                reject(error);
            }
        } else {
            if (error.port !== undefined && error.port !== null) {
                if (error.port === 3001) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "flowmanager"

                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3002) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "microflowmanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3003) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "projectmanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3004) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "screenmanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3005) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "entitymanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3006) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "featuremanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3007) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "securitymanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3008) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "Camunda"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3009) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "Auth-Proxy"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3010) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "adminmanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3011) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "menubuildermanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 3012) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "templatemanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5000) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "generation-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5001) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "configurationmanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5002) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "sourcecontrolmanager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5003) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "screen-gen-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5004) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "infrastructure-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5005) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "deployment-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5006) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "build-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5007) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "cluster-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5008) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "code-gen-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5009) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "backend-gen-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5010) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "datastore-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5011) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "mongo-gen-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5012) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "node-gen-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5014) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "angular-gen-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                } else if (error.port === 5015) {
                    let errormsg = {
                        error: "Microservice Down",
                        port: error.port,
                        microservice: "landingpage-manager"
                    };
                    console.error(errormsg), reject(errormsg);
                }
            }
        }
    }

}
