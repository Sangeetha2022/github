import { Request, response, Response } from 'express'
import { QuickConnectorsDao } from '../daos/quickConnectorsDao';
import { GepFileManagerService } from '../apiservices/GepFileManagerService';
import { EntityManagerService } from '../apiservices/EntityManagerService';
import {FeatureManagerService} from '../apiservices/FeatureManagerService'
const newman = require('newman');
import { ApiAdaptar } from '../config/ApiAdaptar';
import * as asyncLoop from 'node-async-loop';

const quickConnectorsDao = new QuickConnectorsDao();
const gepFileManagerService = new GepFileManagerService();
const entityManagerService = new EntityManagerService();
const featureManagerService = new FeatureManagerService();
const samplePayload = {
    "is_default": false,
    "updated_at": "2021-06-01T06:20:31.631Z",
    "_id": "cc85a650-c2a7-11eb-a9ac-818c0f746b19",
    "name": "test",
    "description": "",
    "entity_type": "primary",
    "project_id": "2e228150-8b06-11eb-817b-fb0dd244c845",
    "feature_id": "020a10b0-bca2-11eb-bdef-c5660a06b287",
    "created_by": "",
    "last_modified_by": "",
    "created_at": "2021-06-01T07:05:51.157Z",
    "field": [
        {
            "name": "name",
            "type_name": "Text",
            "data_type": null,
            "description": "Description",
            "is_entity_type": false,
            "is_list_type": false,
            "list_type": null,
            "list_value": null,
            "entity_id": null
        },
        {
            "name": "value",
            "type_name": "Text",
            "data_type": null,
            "description": "Description",
            "is_entitytype": false,
            "is_listtype": false,
            "list_type": null,
            "list_value": null,
            "entity_id": null,

        }
    ],
    "__v": 0
}
const myConnectors = {
    info: {
        _postman_id: "63eb3474-7277-45d0-bf4a-5099d4f34241",
        name: "connectors",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [
        {
            name: "https://api.stlouisfed.org/fred/category/tags?category_id=125&api_key=cffd2d5d3da880816eda661dd52f96f1&file_type=json",
            request: {
                method: "GET",
                header: [],
                url: {
                    raw: "https://api.stlouisfed.org/fred/category/tags?category_id=125&api_key=cffd2d5d3da880816eda661dd52f96f1&file_type=json",
                    protocol: "https",
                    host: [
                        "api",
                        "stlouisfed",
                        "org"
                    ],
                    path: [
                        "fred",
                        "category",
                        "tags"
                    ],
                    query: [
                        {
                            key: "category_id",
                            value: "125"
                        },
                        {
                            key: "api_key",
                            value: "cffd2d5d3da880816eda661dd52f96f1"
                        },
                        {
                            key: "file_type",
                            value: "json"
                        }
                    ]
                }
            },
            response: []
        }
    ],
    "protocolProfileBehavior": {}
};


export class QuickConnectorsService {
    public async saveConnectors(req: Request, callback: CallableFunction) {
        let newmanResponse: any = await this.getNewmanResponse(req);
        asyncLoop(newmanResponse.run.executions, async (exec, next) => {
            let existEntity: any = await this.getDynamicEntity(req);
            let jsonData = JSON.parse(existEntity);
            const requestName = exec.item.name
            const response = JSON.parse(exec.response.stream);
            const payload: any = { name: '', field: [] };
            const refPayload: any = { name: '', field: [] };
            payload.name = req.body.original_file_data.info.name;
            const responseKeys: string[] = Object.keys(response);
            payload.is_default = false;
            payload.updated_at = new Date();
            payload.description = req.body.original_file_data.info.name;
            payload.entity_type = 'primary';
            payload.project_id = req.body.project_id;
            payload.feature_id = req.body.feature_id;
            payload.created_by = '';
            payload.last_modified_by = '';
            payload.created_at = new Date();
            asyncLoop(responseKeys, async (key, next1) => {
                // responseKeys.forEach(async key => {
                if (Array.isArray(response[key])) {
                    const keys = [];
                    await response[key].forEach(nestedObject => {
                        Object.keys(nestedObject).forEach(nestedKey => {
                            keys.push(nestedKey);
                        });
                    });
                    if (keys.length > 0) {
                        const fieldArray = [];
                        const uniqueKeys = [...new Set(keys)];
                        refPayload.name = key;
                        refPayload.is_default = false;
                        refPayload.updated_at = new Date();
                        refPayload.description = key;
                        refPayload.entity_type = 'secondary';
                        refPayload.project_id = req.body.project_id;
                        refPayload.feature_id = req.body.feature_id;
                        refPayload.created_by = '';
                        refPayload.last_modified_by = '';
                        refPayload.created_at = new Date();
                        uniqueKeys.forEach(uniqueKey => {
                            fieldArray.push({
                                name: uniqueKey,
                                type_name: 'Text',
                                data_type: String,
                                description: uniqueKey,
                                is_entity_type: false,
                                is_list_type: false,
                                list_type: null,
                                list_value: null,
                                entity_id: null
                            });
                        });
                        refPayload.field = fieldArray;
                        let entity: any = await this.createDynamicEntity(req, refPayload);
                        console.log('entity secondary ==============>>>', entity);
                        if(entity.body) {
                            payload.field.push(
                                {
                                    name: key,
                                    type_name: 'List',
                                    data_type: Array,
                                    description: key,
                                    is_entity_type: false,
                                    is_list_type: false,
                                    list_type: null,
                                    list_value: null,
                                    entity_id: entity.body._id
                                }
                            )
                            let updatefeatureEntities = await this.featureUpdateEntity(req, entity.body);
                            console.log('updatefeatureEntities for secondary==========>>>', updatefeatureEntities)
                        } else {
                            next1();
                        }
                        next1();
                    }
                } else {
                    payload.field.push(
                        {
                            name: key,
                            type_name: 'Text',
                            data_type: String,
                            description: key,
                            is_entity_type: false,
                            is_list_type: false,
                            list_type: null,
                            list_value: null,
                            entity_id: null,
                        }
                    )
                    next1();
                }
            }, async (error) => {
                if (error) {
                    console.log('error -----', error);
                } else {
                    const existEntityArray = jsonData.body.filter((x) => x.entity_type === 'primary');
                    if (existEntityArray.length == 0) {
                        let entity: any = await this.createDynamicEntity(req, payload);
                        console.log('entity primary =============+>>>', entity)
                        let updatefeatureEntities = await this.featureUpdateEntity(req, entity.body);
                        console.log('updatefeatureEntities for primary ==========>>>', updatefeatureEntities)
                        next();
                    } else {
                        next();
                    }
                }
            });

        }, (err) => {
            if (err) {
                console.log('error ----------', err);
            } else {
                let data = req.body;
                quickConnectorsDao.saveConnectors(data, (response) => {
                    callback(response)
                })
            }
            
        })
    }

    public featureUpdateEntity(req, entityObject) {
        return new Promise((resolve, reject) => {
            let entitydetails = [
                {
                    'entities':
                    {
                        'entityType': entityObject.entity_type,
                        'entityId': entityObject._id
                    },
                    'name': entityObject.name,
                    'description': entityObject.description,
                    'updated_date': Date.now()
                }
            ];
            console.log('entity details ===========>>>>', entitydetails);
            featureManagerService.featureUpdateEntity(req, entitydetails, (response) => {
                resolve(response);
            })
        })
    }

    public getNewmanResponse(req) {
        return new Promise((resolve, reject) => {
            newman.run({
                collection: JSON.parse(JSON.stringify(req.body.original_file_data)),
                reporters: 'cli'
            }, function (err, summary) {
                if (err) resolve(err)
                resolve(summary);
            })
        })
    }

    public updateEntity(req, payload) {
        return new Promise((resolve, reject) => {
            entityManagerService.updateEntity(req, payload, (response) => {
                resolve(JSON.parse(JSON.stringify(response)));
            })
        })
    }

    public createDynamicEntity(req, payload) {
        return new Promise((resolve, reject) => {
            entityManagerService.createEntity(req, payload, (response) => {
                resolve(response);
            })
        })
    }

    public getDynamicEntity(req) {
        return new Promise((resolve, reject) => {
            entityManagerService.getEntity(req, (response) => {
                resolve(response);
            })
        })
    }

    public getFileByIds(fileIds) {
        return new Promise((resolve, reject) => {
            gepFileManagerService.getFileDataByIds(fileIds, (response) => {
                resolve(response);
            })
        })
    }

    public getConnectorById(req: Request, callback: CallableFunction) {
        let id = req.params.id;
        quickConnectorsDao.getConnectorById(id, (response) => {
            callback(response);
        })

    }
    public getConnectorsByIds(req: Request, callback: CallableFunction) {
        let id = req.body;
        quickConnectorsDao.getConnectorsByIds(id, (response) => {
            callback(response);
        })

    }

    public getConnectorByEntity(req: Request, callback: CallableFunction) {
        let entityId = req.params.entityid;
        quickConnectorsDao.getConnectorByEntity(entityId, (response) => {
            callback(response);
        })

    }

    public deleteConnectorById(req: Request, callback: CallableFunction) {
        let id = req.params.id;
        quickConnectorsDao.deleteConnectorById(id, (response) => {
            callback(response);
        })

    }


    public deleteConnectorByEntityId(req: Request, callback: CallableFunction) {
        let entityId = req.params.entityid;
        quickConnectorsDao.deleteConnectorByEntityId(entityId, (response) => {
            callback(response);
        })

    }

    public updateQuickConnectorsById(req: Request, callback: CallableFunction) {
        let updateConnectors = req.body;
        quickConnectorsDao.updateQuickConnectorsById(updateConnectors, (response) => {
            callback(response)

        })
    }

    public getConnectors(callback: CallableFunction) {
        quickConnectorsDao.getConnectors((response) => {
            callback(response)
        })

    }

}