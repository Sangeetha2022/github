import { Request, Response } from 'express';
import FeatureDetailsModel from '../models/fetauredetails.model';
import FeatureFlowsModel from '../models/fetaureflows.model';
import FeatureEntityModel from '../models/fetaureentity.model';
import FeatureFlowCompsModel from '../models/fetaureflowcomp.model';
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

    uploadeFeaturefile = async (req: Request, callback: CallableFunction) => {
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
            req['files'].map((file, i) => {
                if (file.fieldname === "front_mang_file") {
                    dataToSave.api_mang_file = file.path
                }
                if (file.fieldname === "backed_mang_file") {
                    dataToSave.backed_mang_file = file.path
                }
                if (file.fieldname === "api_mang_file") {
                    dataToSave.api_mang_file = file.path
                }
            })
            const createdFlowComp = new this.Feature(dataToSave);
            await createdFlowComp.save((err, feature) => {
                if (err) {
                    callback(err);
                } else {
                    this.parseAndSaveFeatureDetails(feature, req['files'], callback)
                }
            });
        });
    }

    private parseAndSaveFeatureDetails = (feature, files, callback) => {
        files.map((file, i) => {
            if (file.fieldname === "backed_mang_file") {
                var doc = yaml.safeLoadAll(fs.readFileSync(file.destination + '/' + file.filename, 'utf8'))
                this.saveFeatureFlows(doc, callback);
            }
        })
    }

    private saveFeatureFlows = (doc, callback) => {
        let flow_id = null
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
                            type: "basic"
                        }
                        const createdFlowComp = new this.FeatureFlows(dataToSave);
                        await createdFlowComp.save(async (err, fdata) => {
                            if (fdata) {
                                flow_id = fdata._id;
                                await this.saveFeatureFlowComps(doc[0][data][data1], fdata._id);
                            }
                        });
                    }
                })
                await this.saveFeatureEntity(data, doc[0][data]["schema"], flow_id, callback);
            }
        })
    }

    private saveFeatureFlowComps = async (flowData, flowid) => {
        console.log(" = = = == floe daraa ayccj0oc0 /.   > >>>  ", flowData, flowid);
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
            flow_comp_seq: flowComp
        }
        const createdFlowComp = new this.FeatureFlowComps(dataToSave);
        await createdFlowComp.save();
    }

    private saveFeatureEntity = async (schemaname, schema, flow_id, callback) => {
        let dataToSave = {
            name: schemaname,
            description: schemaname,
            flow_id: flow_id,
            created_by: "rahul",
            field: []
        }
        Object.keys(schema).map(async (data, index) => {
            let dataToPush = {
                name: data,
                data_type: schema[data].type,
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