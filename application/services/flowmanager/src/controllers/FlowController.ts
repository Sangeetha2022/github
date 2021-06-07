import { Request, Response, NextFunction } from 'express';
import { FlowService } from '../services/FlowService';
const newman = require('newman');
import { ApiAdaptar } from '../config/apiAdaptar';
import * as asyncLoop from 'node-async-loop';


let flowService = new FlowService();
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
export class FlowController {
    public async saveConnectors(req: Request, res: Response) {
        newman.run({
            collection: JSON.parse(JSON.stringify(myConnectors)),
            reporters: 'cli'
        }, function (err, summary) {
            if (err) { throw err; }
            summary.run.executions.forEach(exec => {
                const requestName = exec.item.name
                console.log('Request name:', exec.item.name);
                const response = JSON.parse(exec.response.stream);
                console.log('Response:', JSON.parse(exec.response.stream));
                const payload = { name: '', field: []};
                const refPayload: any = { name: '', field: []};
                payload.name = myConnectors.info.name;
                const responseKeys: string[] = Object.keys(response);
                console.log('KEYS--->>>', responseKeys);
                asyncLoop(responseKeys, async (key, next) => {
                // responseKeys.forEach(async key => {
                    console.log(Array.isArray(response[key]));
                    if(Array.isArray(response[key])) {
                        const keys = [];
                        console.log('ARRAY KEYS---->>>', Object.keys(response[key][0]));
                        response[key].forEach(nestedObject => {
                            console.log('NESTED--->>>', nestedObject);
                            Object.keys(nestedObject).forEach(nestedKey => {
                                keys.push(nestedKey);
                            }); 
                        });
                        if (keys.length > 0) {
                            const fieldArray = [];
                            const uniqueKeys = [ ...new Set(keys) ];
                            console.log('UNIQUE KEYS--->>>', uniqueKeys);
                            console.log('response[key]---->>>', key);
                            refPayload.name = key;
                            refPayload.is_default = false;
                            refPayload.updated_at = new Date();
                            refPayload.description = key;
                            refPayload.entity_type = 'secondary';
                            refPayload.project_id = '2e228150-8b06-11eb-817b-fb0dd244c845';
                            refPayload.feature_id = '020a10b0-bca2-11eb-bdef-c5660a06b287';
                            refPayload.created_by = '';
                            refPayload.last_modified_by = '';
                            refPayload.created_at = new Date();
                            uniqueKeys.forEach(uniqueKey => {
                                fieldArray.push({
                                    name: uniqueKey,
                                    type_name: 'Text',
                                    data_type: null,
                                    description: uniqueKey,
                                    is_entity_type: false,
                                    is_list_type: false,
                                    list_type: null,
                                    list_value: null,
                                    entity_id: null
                                });
                            });
                            refPayload.field = fieldArray;
                            console.log('REF PAYLOAD---->>>', refPayload);
                            let entity = await Promise.resolve(new ApiAdaptar().post(`http://localhost:3005/entity/save`+ `?log_id=${req.query.log_id}`, refPayload));
                            console.log('ENTITY--->>>>>', entity);
                            next();
                        }
                    }
                });
                // });
            });
        });
    }

    public saveFlow(req: Request, res: Response) {
        flowService.saveFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public updateFlow(req: Request, res: Response) {
        flowService.updateFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getAllFlow(req: Request, res: Response) {
        flowService.getAllFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFlowById(req: Request, res: Response) {
        flowService.getFlowById(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFeatureFlows(req: Request, res: Response) {
        flowService.getFeatureFlows(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFeatureFlowsByLanguage(req: Request, res: Response) {
        flowService.getFeatureFlowsByLanguage(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    // public getBackendFlow(req: Request, res: Response) {
    //     flowService.getBackendFlow(req, (response) => {
    //         res.status(200); // status for the response
    //         res.json(response);
    //     })
    // }

    public getFlowByProjectId(req: Request, res: Response) {
        flowService.getFlowByProjectId(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public deleteFlow(req: Request, res: Response) {
        flowService.deleteFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    // public saveFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.saveFlow(req, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public getAllFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.getAllFlow(req, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public getFlowByID(req: Request, res: Response, next: NextFunction) {
    //     flowService.getFlowByID(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public getFlowByname(req: Request, res: Response, next: NextFunction) {
    //     flowService.getFlowByname(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public deleteFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.deleteFlow(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public updateFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.updateFlow(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // getFlowDetails = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.getFlowDetails(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // updateFlowComponent = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.updateFlowComponent(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // updateLinkedConnector = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.updateLinkedConnector(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // addFlowComponent = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.addFlowComponent(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // addLinkedConnector = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.addLinkedConnector(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

}