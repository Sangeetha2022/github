import { Request, Response } from 'express';
import FeatureDetailsModel from '../models/featuredetails.model';
import FeatureFlowsModel from '../models/featureflows.model';
import FeatureEntityModel from '../models/featureentity.model';
import FeatureFlowCompsModel from '../models/featureflowcomp.model';
var multer = require('multer');
var yaml = require('js-yaml');
var fs = require('fs');
var BACKEDDIR = './src/assests/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, BACKEDDIR + 'featurefiles')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var backendupload = multer({ storage: storage }).any();

export class FeatureDetailsDao {

    private Feature = FeatureDetailsModel;
    private FeatureFlows = FeatureFlowsModel;
    private FeatureEntityFlows = FeatureEntityModel;
    private FeatureFlowComps = FeatureFlowCompsModel;
    flows: any = [];

    // uploadeFeaturefile = async (req: Request, callback: CallableFunction) => {
    //     await backendupload(req, callback, async (err) => {
    //         if (err) {
    //             return callback("an Error occured", err)
    //         }
    //         var dataToSave = {
    //             name: req.body.name,
    //             description: req.body.description,
    //             api_mang_file: null,
    //             backed_mang_file: null,
    //             front_mang_file: null
    //         }
    //         if (req['files'].length !== 0) {
    //             req['files'].map((file, i) => {
    //                 if (file.fieldname === "front_mang_file") {
    //                     dataToSave.front_mang_file = file.path
    //                 }
    //                 if (file.fieldname === "backed_mang_file") {
    //                     dataToSave.backed_mang_file = file.path
    //                 }
    //                 if (file.fieldname === "api_mang_file") {
    //                     dataToSave.api_mang_file = file.path
    //                 }

    //             })
    //         }
    //         console.log('Data to save', dataToSave);
    //         const createdFlowComp = new this.Feature(dataToSave);
    //         await createdFlowComp.save((err, feature) => {
    //             if (err) {
    //                 callback(err);
    //             } else {
    //                 if (req['files'].length !== 0) {
    //                     this.parseAndSaveFeatureDetails(feature, req['files'], callback)
    //                 } else if (req['files'].length === 0) {
    //                     callback(feature);
    //                 }
    //             }
    //         });
    //     });
    // }

    uploadeFeaturefile = async (req: Request, callback: CallableFunction) => {
        console.log("request---->davo----->", req.body)
        await backendupload(req, callback, async (err) => {
            if (err) {
                return callback("an Error occured", err)
            }
            var dataToSave = {
                name: req.body.name,
                description: req.body.description,
                api_mang_file: null,
                backed_mang_file: null,
                front_mang_file: null
            }
            if (req['files'] !== null && req['files'] !== undefined) {
                req['files'].map((file, i) => {
                    if (file.fieldname === "front_mang_file") {
                        dataToSave.front_mang_file = file.path
                    }
                    if (file.fieldname === "backed_mang_file") {
                        dataToSave.backed_mang_file = file.path
                    }
                    if (file.fieldname === "api_mang_file") {
                        dataToSave.api_mang_file = file.path
                    }

                })
            }
            const createdFlowComp = new this.Feature(dataToSave);
            await createdFlowComp.save((err, feature) => {
                if (err) {
                    callback(err);
                } else {
                    if (req['files'] !== null && req['files'] !== undefined) {
                        this.parseAndSaveFeatureDetails(feature, req['files'], callback)
                    } else {
                        callback(feature);
                    }
                }
            });
        });
    }

    private parseAndSaveFeatureDetails = (feature, files, callback) => {
        files.map((file, i) => {
            if (file.fieldname === "front_mang_file") {
                var doc = yaml.safeLoadAll(fs.readFileSync(file.destination + '/' + file.filename, 'utf8'))
                this.saveFeatureFlows(doc, feature._id, callback);
            }
        })
    }

    private saveFeatureFlows = (doc, feature_id, callback) => {
        Object.keys(doc[0]).map(async (data, index) => {
            if (data !== "dns" && data !== "db") {
                await Object.keys(doc[0][data]).map(async (data1, i) => {
                    if (data1 !== "schema" && data1 !== "handler") {
                        let dataToSave = {
                            action_on_data: data1,
                            create_with_default_activity: 1,
                            description: doc[0][data][data1]["description"],
                            label: data1,
                            name: doc[0][data][data1]["flow"],
                            screenName: doc[0][data][data1]["screen"],
                            type: "basic",
                            feature_id: feature_id
                        }
                        const createdFlowComp = new this.FeatureFlows(dataToSave);
                        await createdFlowComp.save(async (err, fdata) => {
                            if (fdata) {
                                this.flows = fdata
                                console.log("Adsadad", this.flows);
                                await this.saveFeatureFlowComps(doc[0][data][data1], fdata._id, feature_id);
                            }
                        });
                    }
                })
                await this.saveFeatureEntity(data, doc[0][data]["schema"], feature_id, callback);
            }
        })
    }

    private saveFeatureFlowComps = async (flowData, flowid, feature_id) => {
        console.log(" = = = == floe daraa ayccj0oc0 /.   > >>>  ", feature_id);
        let flowComp = []
        if (flowData.controller) {
            flowComp.push({
                "name": "GpExpressController",
                "label": "node controller",
                "type": "server",
                "sequence_id": 1,
                "dev_language": "Node.js",
                "dev_framework": "Express",
                "description": "controller for a NodeJs server application",
                "connector": true
            })
        }
        if (flowData.service) {
            flowComp.push({
                "name": "GpExpressService",
                "label": "node service",
                "type": "server",
                "sequence_id": 2,
                "dev_language": "Node.js",
                "dev_framework": "Express",
                "description": "service component for a NodeJS based application",
                "connector": true
            })
        }
        if (flowData.dao) {
            flowComp.push({
                "name": "GpExpressDao",
                "label": "node dao",
                "type": "server",
                "sequence_id": 3,
                "dev_language": "Node.js",
                "dev_framework": "Express",
                "description": "dao component for a NodeJs based application",
                "connector": true
            })
        }
        if (flowData.screen) {
            flowComp.push({
                "name": "GpAngularComponent",
                "label": "angular 7 component",
                "type": "client",
                "sequence_id": 1,
                "dev_language": "java_script",
                "dev_framework": "Angular",
                "description": "component for Angular desktop",
                "connector": true
            })
            flowComp.push({
                "name": "GpAngularService",
                "label": "angular 7 service",
                "type": "client",
                "sequence_id": 2,
                "dev_language": "java_script",
                "dev_framework": "Angular",
                "description": "service for Angular desktop",
                "connector": true
            })
        }
        let dataToSave = {
            flow: flowid,
            feature_id: feature_id,
            flow_comp_seq: flowComp
        }
        const createdFlowComp = new this.FeatureFlowComps(dataToSave);
        await createdFlowComp.save();
    }

    public getAllFeatureDetails = async (req: Request, callback: CallableFunction) => {
        await this.Feature.find({}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });

    }

    public getFeatureDetailsByFeatureid = async (req: Request, callback: CallableFunction) => {
        console.log('req.params.id', req.params.id);
        await this.FeatureFlowComps.find({ feature_id: req.params.id }).populate({ path: 'flow', model: this.FeatureFlows }).exec((err, flowDetails) => {
            if (err) {
                callback(err);
            } else {

                callback(flowDetails);
            }

        })
    }


    public getAllFeatureByFeatureid = async (req: Request, callback: CallableFunction) => {
        console.log('req.params.id', req.params.id);
        await this.Feature.find({ _id: req.params.id }, (err, flowDetails) => {
            if (err) {
                callback(err);
            } else {

                callback(flowDetails);
            }

        })
    }

    public getFeatureEntityByFeatureid = async (req: Request, callback: CallableFunction) => {
        await this.FeatureEntityFlows.find({ feature_id: req.params.id }, (err, flowDetails) => {
            if (err) {
                callback(err);
            } else {

                callback(flowDetails);
            }

        });
    }

    public getFeatureDetailsById = async (req: Request, callback: CallableFunction) => {
        console.log("adadfaf", req.params)
        await this.Feature.findById(req.params.id, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });

    }

    private saveFeatureEntity = async (schemaname, schema, feature_id, callback) => {
        let dataToSave = {
            name: schemaname,
            created_by: "",
            feature_id: feature_id,
            field: []
        }
        Object.keys(schema).map(async (data, index) => {
            let dataToPush = {
                name: data,
                data_type: schema[data].type,
                type_name: schema[data].type_name,
                description: schema[data].description,
            }
            dataToSave.field.push(dataToPush)
        })
        const createdFlowComp = new this.FeatureEntityFlows(dataToSave);
        await createdFlowComp.save();
        return callback({
            status: "Features Upload Completed"
        });
    }
}