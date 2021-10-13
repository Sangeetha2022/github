import { Request, Response, NextFunction } from 'express';
import { AwsConfig } from '../config/awssecret'
import * as  fs from 'fs';
import AWS = require('aws-sdk');

export class Cdnservice {

    private awsCreds(callback) {
        let gConfig = new AwsConfig();
        gConfig.awsConfig(function (response) {
            callback(response);
        });
    }
    test = {
        accessKeyId: '',
        secretAccessKey: '',
        region: ''
    }

    private s3 = new AWS.S3(this.test);


    // file1 = '/Users/10decoders/Documents/wcmxgep/application/client/desktop/wcmxgep/dist/wcmxgep/main.js';
    // file2 = '/Users/10decoders/Documents/wcmxgep/application/client/desktop/wcmxgep/dist/wcmxgep/main.js.map';
    // file3 = '/Users/10decoders/Documents/wcmxgep/application/client/desktop/wcmxgep/dist/wcmxgep/runtime.js';
    // file4 = '/Users/10decoders/Documents/wcmxgep/application/client/desktop/wcmxgep/dist/wcmxgep/runtime.js.map';

    file1 = '/cdnmanager/code/dist/wcmxgep/main.js';
    file2 = '/cdnmanager/code/dist/wcmxgep/main.js.map';
    file3 = '/cdnmanager/code/dist/wcmxgep/runtime.js';
    file4 = '/cdnmanager/code/dist/wcmxgep/runtime.js.map';
    files = [this.file1, this.file2, this.file3, this.file4]
    testnew = [];

    uploadChunks = (files, callback) => {
        var request = require('request');
        request('http://wcmxgep-webcontent.wcmxgep.svc.cluster.local:3013/generate/wcm', (error, response, body) => {
            const BASE_URL = '/cdnmanager/code/dist/wcmxgep/'
            console.log("<--------Calling extractor")
            if (!error && response.statusCode == 201) {
                request('http://wcmxgep-webcontent.wcmxgep.svc.cluster.local:3013/get/wordpresspages', (error, response, body) => {
                    if (!error) {
                        var results = JSON.parse(response.body);
                        this.testnew = results;
                        for (let i in results) {
                            var chunkmapfile = `${BASE_URL}${this.testnew[i]}-${this.testnew[i]}-module.js.map`;
                            var chunkfile = `${BASE_URL}${this.testnew[i]}-${this.testnew[i]}-module.js`;
                            this.files.push(chunkmapfile);
                            this.files.push(chunkfile);
                        }
                        setTimeout(() => {
                            if (this.files.length > 0) {
                                Promise.all(this.files.map(file => this.fileUpload(file))).then(results => {
                                    callback(results);
                                });
                            }
                        }, 15000);
                        console.log(body);
                    }
                })    // callback(results);
            }
        })
    };

    fileUpload = file => {
        let filename = file.split('/').pop()
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err: any, data: any) => {
                let creds = {};
                let bucketname;
                if (!err) {
                    this.awsCreds((response) => {
                        creds = response;
                        this.test.secretAccessKey = creds['secretkey'];
                        this.test.accessKeyId = creds['accesskey'];
                        this.test.region = creds['region'];
                        bucketname = creds['bucketname'];

                        const params = {
                            Bucket: bucketname,
                            Key: filename,
                            Body: data,
                            ACL: 'public-read',
                            ContentType: 'application/javascript'
                        };

                        this.s3.upload(params, (err, data) => {
                            if (err) {
                                console.log('There was an error uploading your file: ', err);
                            } else {
                                console.log('Chunks uploaded successfully into s3', data)
                                resolve(data.Location);
                            }
                        });
                    });
                }

            })
        });
    }
}
