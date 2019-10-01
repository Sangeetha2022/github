import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { GenerateHtmlWorker } from '../worker/generateHtmlWorker';

let generateHtmlWorker = new GenerateHtmlWorker();
export class AngularService {
    constructor() {
    }
    async createAngularProject(req: Request, callback: CallableFunction) {

        // console.log('create angular project value are ----- ', util.inspect(req.body, { showHidden: true, depth: null }));
        const details = req.body;
        // const details = {
        //     "featureName": "ticket",
        //     "projectGenerationPath": "/home/dhina/Music/generatedCode/newproject1234/application/client/desktop/newproject1234",
        //     "templateLocation": {
        //         "frontendTemplate": "../../template",
        //         "backendTemplate": "../../template",
        //         "mongoTemplate": "../../template",
        //         "authTemplatePath": "/home/dhina/Videos/StahlsJenkins/GrapesJS/ang7Grapesjs/Dan/branch/features_refactor/geppettotest/generator/services/seed",
        //         "authorizationTempPath": "../../template",
        //         "adminManagerTemplatePath": "/home/dhina/Videos/StahlsJenkins/GrapesJS/ang7Grapesjs/Dan/branch/features_refactor/geppettotest/generator/services/seed"
        //     },
        //     "projectName": "newproject1234",
        //     "primaryLanguage": "English",
        //     "secondaryLanguage": "Tamil",
        //     "clientLanguage": {
        //         "updated_at": null,
        //         "_id": "f39db822-d476-11e9-a205-ed164e455e8e",
        //         "name": "java_script",
        //         "label": "Javascript",
        //         "description": null,
        //         "value": null,
        //         "type": "GpClientLanguage",
        //         "sub_type": null,
        //         "created_at": "2019-09-11T09:31:36.994Z"
        //     },
        //     "clientFramework": {
        //         "updated_at": null,
        //         "_id": "f3949061-d476-11e9-a205-ed164e455e8e",
        //         "name": "angular7",
        //         "label": "Angular 7",
        //         "description": null,
        //         "value": null,
        //         "type": "GpClientDevFramework",
        //         "sub_type": null,
        //         "created_at": "2019-09-11T09:31:36.934Z"
        //     },
        //     "entities": [
        //         {
        //             "is_default": false,
        //             "updated_at": "2019-09-23T11:16:57.197Z",
        //             "_id": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //             "name": "ticket",
        //             "description": "ticket details",
        //             "entity_type": "primary",
        //             "project_id": "9fdc5800-ddf3-11e9-a76a-3bf50492c934",
        //             "feature_id": "a6f53530-ddf3-11e9-a313-47949bf80c3d",
        //             "created_by": "",
        //             "last_modified_by": "",
        //             "field": [
        //                 {
        //                     "name": "name",
        //                     "type_name": "Text",
        //                     "data_type": "String",
        //                     "description": "Description",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": null,
        //                     "list_value": null,
        //                     "updated_at": null,
        //                     "entity_id": null,
        //                     "_id": "c74bb611-ddf3-11e9-9a19-ef5df179aecc"
        //                 },
        //                 {
        //                     "name": "ticketno",
        //                     "type_name": "Text",
        //                     "data_type": "String",
        //                     "description": "Description",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": null,
        //                     "list_value": null,
        //                     "updated_at": null,
        //                     "entity_id": null,
        //                     "_id": "c74bb610-ddf3-11e9-9a19-ef5df179aecc"
        //                 },
        //                 {
        //                     "name": "message",
        //                     "type_name": "Text",
        //                     "data_type": "String",
        //                     "description": "Description",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": null,
        //                     "list_value": null,
        //                     "updated_at": null,
        //                     "entity_id": null,
        //                     "_id": "c74b8f00-ddf3-11e9-9a19-ef5df179aecc"
        //                 },
        //                 {
        //                     "name": "catagoryparent",
        //                     "type_name": "Text",
        //                     "data_type": "String",
        //                     "description": "Description",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": null,
        //                     "list_value": null,
        //                     "updated_at": null,
        //                     "entity_id": null,
        //                     "_id": "25df0640-df58-11e9-a3b8-575ba9b6f945",
        //                 }
        //             ],
        //             "created_at": "2019-09-23T11:17:07.344Z"
        //         },
        //         {
        //             "is_default": false,
        //             "updated_at": "2019-09-23T11:16:57.197Z",
        //             "_id": "b5a631b0-ddf3-11e9-9a19-ef5df179aecc",
        //             "name": "categories",
        //             "description": "categories details",
        //             "entity_type": "secondary",
        //             "project_id": "9fdc5800-ddf3-11e9-a76a-3bf50492c934",
        //             "feature_id": "a6f53530-ddf3-11e9-a313-47949bf80c3d",
        //             "created_by": "",
        //             "last_modified_by": "",
        //             "field": [
        //                 {
        //                     "name": "id",
        //                     "type_name": "text",
        //                     "data_type": "number",
        //                     "description": "",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": "",
        //                     "list_value": "",
        //                     "updated_at": null,
        //                     "entity_id": "",
        //                     "_id": "d64de201-d920-11e9-8365-fd1b003f5ad2"
        //                 },
        //                 {
        //                     "name": "name",
        //                     "type_name": "Text",
        //                     "data_type": "String",
        //                     "description": "Description",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": null,
        //                     "list_value": null,
        //                     "updated_at": null,
        //                     "created_at": "2019-09-23T11:19:34.938Z",
        //                     "entity_id": null,
        //                     "_id": "05ba87a1-ddf4-11e9-9a19-ef5df179aecc"
        //                 },
        //                 {
        //                     "name": "parent_id",
        //                     "type_name": "Text",
        //                     "data_type": "String",
        //                     "description": "Description",
        //                     "is_default": false,
        //                     "is_entity_type": false,
        //                     "is_list_type": false,
        //                     "list_type": null,
        //                     "list_value": null,
        //                     "updated_at": null,
        //                     "created_at": "2019-09-23T11:19:34.938Z",
        //                     "entity_id": null,
        //                     "_id": "05ba87a0-ddf4-11e9-9a19-ef5df179aecc"
        //                 }
        //             ],
        //             "created_at": "2019-09-23T11:17:20.587Z"
        //         }
        //     ],
        //     "nodeResponse": {
        //         "entitySchemaName": "ticketSchema",
        //         "entityModelName": "ticketModel",
        //         "entityFileName": "ticket",
        //         "featureName": "ticket",
        //         "nodePortNumber": 8000,
        //         "isCustomCode": true,
        //         "import": {
        //             "dependencies": [
        //                 {
        //                     "name": "{ ticketController }",
        //                     "path": "../controller/ticketController"
        //                 }
        //             ]
        //         },
        //         "variable": {
        //             "insideClass": [
        //                 {
        //                     "variableName": "ticket: ticketController",
        //                     "parentName": "new ticketController()"
        //                 }
        //             ],
        //             "outsideClass": []
        //         },
        //         "flowAction": [
        //             {
        //                 "routeUrl": "/ticket/save",
        //                 "apiAction": "post",
        //                 "methodName": "GpCreate",
        //                 "variableName": "ticket"
        //             },
        //             {
        //                 "routeUrl": "/ticket/get",
        //                 "apiAction": "get",
        //                 "methodName": "GpGetAllValues",
        //                 "variableName": "ticket"
        //             }
        //         ]
        //     },
        //     "cssGuidelines": [
        //         {
        //             "tagName": "form",
        //             "className": "form"
        //         },
        //         {
        //             "tagName": "input",
        //             "className": "form-control"
        //         },
        //         {
        //             "tagName": "select",
        //             "className": "form-control"
        //         },
        //         {
        //             "tagName": "textarea",
        //             "className": "form-control"
        //         },
        //         {
        //             "tagName": "button",
        //             "className": "btn btn-primary"
        //         }
        //     ],
        //     "desktop": [
        //         {
        //             "_id": "59d68320-ddf4-11e9-b146-4bf37777f130",
        //             "grid_fields": {
        //                 "default_field": [
        //                     {
        //                         "headerName": "A",
        //                         "field": "a",
        //                         "sortable": true,
        //                         "colId": "col1_id"
        //                     },
        //                     {
        //                         "headerName": "B",
        //                         "field": "b",
        //                         "sortable": true,
        //                         "colId": "col2_id"
        //                     }
        //                 ],
        //                 "htmlId": "i77tu",
        //                 "componentId": "c3135",
        //                 "custom_field": [
        //                     {
        //                         "columnid": "col1_id",
        //                         "columnname": "Name",
        //                         "entity": "categories",
        //                         "entityfield": "name"
        //                     },
        //                     {
        //                         "columnid": "col2_id",
        //                         "columnname": "Parent Id",
        //                         "entity": "categories",
        //                         "entityfield": "parent_id"
        //                     }
        //                 ]
        //             },
        //             "gjs-assets": [
        //                 "[]"
        //             ],
        //             "gjs-styles": [
        //                 "[{\"selectors\":[{\"name\":\"i77tu\",\"label\":\"i77tu\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"padding-top\":\"10px\",\"padding-right\":\"2px\",\"padding-left\":\"2px\",\"padding-bottom\":\"10px\"}},{\"selectors\":[{\"name\":\"myGrid\",\"label\":\"myGrid\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"width\":\"100%\",\"height\":\"100%\"}},{\"selectors\":[{\"name\":\"wrapper\",\"label\":\"wrapper\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"wrapper\":1}]"
        //             ],
        //             "gjs-components": [
        //                 "[{\"type\":\"grid-type\",\"name\":\"grid_i77tu\",\"content\":\"\",\"attributes\":{\"id\":\"i77tu\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"grid_i77tu\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"select\",\"label\":\"columns\",\"name\":\"columns\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"col2_id\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"col1_id\",\"name\":\"Name\"},{\"value\":\"col2_id\",\"name\":\"Parent Id\"}]},{\"type\":\"text\",\"label\":\"colName\",\"name\":\"colname\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"Parent Id\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"select\",\"label\":\"entity\",\"name\":\"entity\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"name\":\"none\",\"value\":\"none\"},{\"name\":\"ticket\",\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"},{\"name\":\"categories\",\"value\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\"}]},{\"type\":\"fieldGridButton\",\"label\":\"bind\",\"name\":\"fieldButton\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"verb\",\"name\":\"verbs\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"key\":\"click\",\"value\":\"onClick\"},{\"key\":\"focus\",\"value\":\"onFocus\"},{\"key\":\"blur\",\"value\":\"onBlur\"}]},{\"type\":\"routeButton\",\"label\":\"Route\",\"name\":\"routeButton\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"addButton\",\"label\":\"Add\",\"name\":\"addButton\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"removeButton\",\"label\":\"Remove\",\"name\":\"removeButton\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"status\":\"hovered\",\"content\":\"\",\"classes\":[{\"name\":\"ag-theme-balham\",\"label\":\"ag-theme-balham\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"id\":\"myGrid\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"scriptUpdated\":1,\"open\":0,\"colname\":\"Parent Id\",\"columns\":\"col2_id\",\"entity\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\"}]"
        //             ],
        //             "component-lifecycle": [
        //                 {
        //                     "flowId": "d7d28400-ddf3-11e9-9c3a-d11060cd5f6a",
        //                     "flowName": "GpGetAllValues",
        //                     "verb": "onload"
        //                 }
        //             ],
        //             "special-events": [],
        //             "is_grid_present": true,
        //             "project": "9fdc5800-ddf3-11e9-a76a-3bf50492c934",
        //             "feature": "a6f53530-ddf3-11e9-a313-47949bf80c3d",
        //             "screenType": "desktop",
        //             "isTemplate": false,
        //             "stylesheets": [],
        //             "scripts": [],
        //             "css-guidelines": [],
        //             "gjs-css": "* { box-sizing: border-box; } body {margin: 0;}#i77tu{padding-top:10px;padding-right:2px;padding-left:2px;padding-bottom:10px;}#myGrid{width:100%;height:100%;}",
        //             "gjs-html": "<body><div id=\"i77tu\"><div id=\"myGrid\" class=\"ag-theme-balham\"></div></div></body><script>var items = document.querySelectorAll('#i77tu');\n        for (var i = 0, len = items.length; i < len; i++) {\n          (function(){var _this = this;\n                        var gridOptions = JSON.parse('{\"htmlId\":\"\",\"componentId\":\"\",\"custom_field\":[],\"default_field\":[]}');\n                        var initAgGrid = function () {\n                            var columnDefs = [];\n                            var rowData = [];\n                            if (gridOptions &&\n                                gridOptions.custom_field &&\n                                gridOptions.custom_field.length > 0) {\n                                columnDefs = [];\n                                for (var _i = 0, _a = gridOptions.custom_field; _i < _a.length; _i++) {\n                                    var key = _a[_i];\n                                    for (var i = 0; i < 30; i++) {\n                                        var newObject = gridOptions.custom_field.reduce(function (o, objectKey) {\n                                            var _a;\n                                            return Object.assign(o, (_a = {}, _a[objectKey.columnname] = \"\" + objectKey.columnname + Math.floor(Math.random() * 10000), _a));\n                                        }, {});\n                                        rowData.push(newObject);\n                                    }\n                                    var temp = {\n                                        headerName: '',\n                                        field: '',\n                                        sortable: true,\n                                        colId: ''\n                                    };\n                                    temp.headerName = key.columnname;\n                                    temp.field = key.columnname;\n                                    temp.colId = key.columnid;\n                                    columnDefs.push(temp);\n                                }\n                            }\n                            else {\n                                columnDefs = [\n                                    {\n                                        headerName: 'A',\n                                        field: 'a',\n                                        sortable: true,\n                                        colId: 'col1_id'\n                                    },\n                                    {\n                                        headerName: 'B',\n                                        field: 'b',\n                                        sortable: true,\n                                        colId: 'col2_id'\n                                    },\n                                    {\n                                        headerName: 'C',\n                                        field: 'c',\n                                        sortable: true,\n                                        colId: 'col3_id'\n                                    },\n                                    {\n                                        headerName: 'D',\n                                        field: 'd',\n                                        sortable: true,\n                                        colId: 'col4_id'\n                                    },\n                                    {\n                                        headerName: 'E',\n                                        field: 'e',\n                                        sortable: true,\n                                        colId: 'col5_id'\n                                    }\n                                ];\n                                rowData = createRowData();\n                            }\n                            function createRowData() {\n                                var tempData = [];\n                                for (var i = 0; i < 100; i++) {\n                                    // create sample row item\n                                    var rowItem = {\n                                        // is is simple\n                                        a: 'aa' + Math.floor(Math.random() * 10000),\n                                        b: 'bb' + Math.floor(Math.random() * 10000),\n                                        c: 'cc' + Math.floor(Math.random() * 10000),\n                                        d: 'dd' + Math.floor(Math.random() * 10000),\n                                        e: 'ee' + Math.floor(Math.random() * 10000)\n                                    };\n                                    tempData.push(rowItem);\n                                }\n                                return tempData;\n                            }\n                            _this.gridOptions = {\n                                defaultColDef: {\n                                    editable: true\n                                },\n                                columnDefs: columnDefs,\n                                rowData: rowData,\n                                components: {\n                                    boldRenderer: function (params) {\n                                        return '<b>' + params.value.name + '</b>';\n                                    }\n                                },\n                                onGridReady: function (params) {\n                                    params.api.sizeColumnsToFit();\n                                    window.addEventListener('resize', function () {\n                                        setTimeout(function () {\n                                            params.api.sizeColumnsToFit();\n                                        });\n                                    });\n                                },\n                                paginationAutoPageSize: true,\n                                pagination: true,\n                            };\n                            var gridDiv = document.querySelector('#myGrid');\n                            // tslint:disable-next-line:no-unused-expression\n                            new agGrid.Grid(gridDiv, _this.gridOptions);\n                            _this.gridOptions.cacheQuickFilter = false;\n                            _this.gridOptions.api.sizeColumnsToFit();\n                        };\n                        var exists = false;\n                        var url = 'https://unpkg.com/ag-grid-community@20.0.0/dist/ag-grid-community.min.js';\n                        var scripts = document.getElementsByTagName('script');\n                        for (var i = scripts.length; i--;) {\n                            if (scripts[i].src === url) {\n                                exists = true;\n                            }\n                        }\n                        if (exists) {\n                            initAgGrid();\n                        }\n                        else {\n                            var script = document.createElement('script');\n                            script.onload = initAgGrid;\n                            script.src = url;\n                            document.body.appendChild(script);\n                        }}.bind(items[i]))();\n        }</script>",
        //             "flows_info": [
        //                 {
        //                     "htmlId": "",
        //                     "componentId": "",
        //                     "elementName": "",
        //                     "verb": "",
        //                     "flowName": "GpGetAllValues",
        //                     "flow": "d7d28400-ddf3-11e9-9c3a-d11060cd5f6a"
        //                 }
        //             ],
        //             "route_info": [],
        //             "screenName": "popup",
        //             "entity_info": [],
        //         },
        //         {
        //             "_id": "ef143b30-ddf4-11e9-b146-4bf37777f130",
        //             "grid_fields": {
        //                 "default_field": [],
        //                 "htmlId": "",
        //                 "componentId": "",
        //                 "custom_field": []
        //             },
        //             "gjs-assets": [
        //                 "[]"
        //             ],
        //             "gjs-styles": [
        //                 "[{\"selectors\":[],\"selectorsAdd\":\"*\",\"style\":{\"box-sizing\":\"border-box\"}},{\"selectors\":[],\"selectorsAdd\":\"body\",\"style\":{\"margin\":\"0\"}},{\"selectors\":[],\"selectorsAdd\":\"*\",\"style\":{\"box-sizing\":\"border-box\"}},{\"selectors\":[],\"selectorsAdd\":\"body\",\"style\":{\"margin\":\"0\"}},{\"selectors\":[],\"selectorsAdd\":\"*\",\"style\":{\"box-sizing\":\"border-box\"}},{\"selectors\":[],\"selectorsAdd\":\"body\",\"style\":{\"margin\":\"0\"}},{\"selectors\":[],\"selectorsAdd\":\"*\",\"style\":{\"box-sizing\":\"border-box\"}},{\"selectors\":[],\"selectorsAdd\":\"body\",\"style\":{\"margin\":\"0\"}},{\"selectors\":[],\"selectorsAdd\":\"*\",\"style\":{\"box-sizing\":\"border-box\"}},{\"selectors\":[],\"selectorsAdd\":\"body\",\"style\":{\"margin\":\"0\"}},{\"selectors\":[{\"name\":\"iokxi\",\"label\":\"iokxi\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"padding\":\"50px 0\"}},{\"selectors\":[{\"name\":\"i1ire\",\"label\":\"i1ire\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"width\":\"40%\",\"padding\":\"25px 0\",\"margin\":\"0 auto\",\"max-width\":\"1200px\"}},{\"selectors\":[{\"name\":\"i4fw8\",\"label\":\"i4fw8\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"display\":\"none\"}},{\"selectors\":[{\"name\":\"iwa4n\",\"label\":\"iwa4n\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"display\":\"none\"}},{\"selectors\":[{\"name\":\"form-group\",\"label\":\"form-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"padding\":\"10px 10px 10px 10px\"}},{\"selectors\":[{\"name\":\"ipdbj\",\"label\":\"ipdbj\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"padding-top\":\"10px\",\"padding-right\":\"2px\",\"padding-left\":\"2px\",\"padding-bottom\":\"10px\"}},{\"selectors\":[{\"name\":\"form-control\",\"label\":\"form-control\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}]},{\"selectors\":[{\"name\":\"ipj4o\",\"label\":\"ipj4o\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}]},{\"selectors\":[{\"name\":\"btn\",\"label\":\"btn\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"btn-primary\",\"label\":\"btn-primary\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}]},{\"selectors\":[{\"name\":\"i1506\",\"label\":\"i1506\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}]}]"
        //             ],
        //             "gjs-components": [
        //                 "[{\"type\":\"section\",\"status\":\"hovered\",\"content\":\"\",\"style\":{},\"attributes\":{\"id\":\"iokxi\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"iokxi\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"container\",\"content\":\"\",\"style\":{},\"attributes\":{\"id\":\"i1ire\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"form\",\"type\":\"form\",\"content\":\"\",\"classes\":[{\"name\":\"form\",\"label\":\"form\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"method\":\"post\",\"id\":\"i8kgx\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Top Form\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"Method\",\"name\":\"method\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"post\",\"name\":\"POST\"},{\"value\":\"get\",\"name\":\"GET\"}]},{\"type\":\"text\",\"label\":\"Action\",\"name\":\"action\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"(default Grapedrop)\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"State\",\"name\":\"formState\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"\",\"name\":\"Normal\"},{\"value\":\"success\",\"name\":\"Success\"},{\"value\":\"error\",\"name\":\"Error\"}]}],\"components\":[{\"draggable\":\"form, form *\",\"content\":\"\",\"classes\":[{\"name\":\"form-group\",\"label\":\"form-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"custom-name\":\"Form group\",\"components\":[{\"type\":\"label\",\"highlightable\":false,\"content\":\"Name\",\"traits\":[{\"type\":\"text\",\"label\":\"For\",\"name\":\"for\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"input\",\"type\":\"input\",\"name\":\"input_ismiy\",\"highlightable\":false,\"void\":true,\"content\":\"\",\"classes\":[{\"name\":\"form-control\",\"label\":\"form-control\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"placeholder\":\"Type here your name\",\"name\":\"firstname\",\"id\":\"ismiy\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"input_ismiy\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"text\",\"label\":\"Placeholder\",\"name\":\"placeholder\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"Type here your name\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"Type\",\"name\":\"type\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"text\",\"name\":\"Text\"},{\"value\":\"email\",\"name\":\"Email\"},{\"value\":\"password\",\"name\":\"Password\"},{\"value\":\"number\",\"name\":\"Number\"}]},{\"type\":\"checkbox\",\"label\":\"Required\",\"name\":\"required\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"entity\",\"name\":\"entity\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"name\":\"none\",\"value\":\"none\"},{\"name\":\"ticket\",\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"},{\"name\":\"categories\",\"value\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\"}]},{\"type\":\"entityFieldButton\",\"label\":\"Field\",\"name\":\"Field\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false,\"entity\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"}],\"open\":0},{\"draggable\":\"form, form *\",\"content\":\"\",\"classes\":[{\"name\":\"form-group\",\"label\":\"form-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"custom-name\":\"Form group\",\"components\":[{\"type\":\"label\",\"highlightable\":false,\"content\":\"\",\"attributes\":{\"id\":\"i4sk1\"},\"traits\":[{\"type\":\"text\",\"label\":\"For\",\"name\":\"for\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"\",\"type\":\"textnode\",\"removable\":0,\"draggable\":0,\"highlightable\":0,\"copyable\":0,\"content\":\"Ticket Number\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}]}],\"open\":false},{\"tagName\":\"input\",\"type\":\"input\",\"name\":\"input_iqdiw\",\"highlightable\":false,\"void\":true,\"content\":\"\",\"classes\":[{\"name\":\"form-control\",\"label\":\"form-control\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"placeholder\":\"Type here your ticketNumber\",\"name\":\"firstname\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"input_iqdiw\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"text\",\"label\":\"Placeholder\",\"name\":\"placeholder\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"Type here your ticketNumber\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"Type\",\"name\":\"type\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"text\",\"name\":\"Text\"},{\"value\":\"email\",\"name\":\"Email\"},{\"value\":\"password\",\"name\":\"Password\"},{\"value\":\"number\",\"name\":\"Number\"}]},{\"type\":\"checkbox\",\"label\":\"Required\",\"name\":\"required\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"entity\",\"name\":\"entity\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"name\":\"none\",\"value\":\"none\"},{\"name\":\"ticket\",\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"},{\"name\":\"categories\",\"value\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\"}]},{\"type\":\"entityFieldButton\",\"label\":\"Field\",\"name\":\"Field\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false,\"entity\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"}],\"open\":0},{\"draggable\":\"form, form *\",\"content\":\"\",\"classes\":[{\"name\":\"form-group\",\"label\":\"form-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"custom-name\":\"Form group\",\"components\":[{\"type\":\"label\",\"highlightable\":false,\"content\":\"Options\",\"traits\":[{\"type\":\"text\",\"label\":\"For\",\"name\":\"for\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"select\",\"type\":\"select\",\"name\":\"select_ipj4o\",\"highlightable\":false,\"content\":\"\",\"classes\":[{\"name\":\"form-control\",\"label\":\"form-control\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"name\":\"options\",\"id\":\"ipj4o\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"select_ipj4o\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"select-options\",\"label\":\"Options\",\"name\":\"\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"checkbox\",\"label\":\"Required\",\"name\":\"required\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"entity\",\"name\":\"entity\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"name\":\"none\",\"value\":\"none\"},{\"name\":\"ticket\",\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"},{\"name\":\"categories\",\"value\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\"}]},{\"type\":\"entityFieldButton\",\"label\":\"Field\",\"name\":\"Field\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"option\",\"type\":\"text\",\"content\":\"Option 1\",\"attributes\":{\"value\":\"1\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"option\",\"type\":\"text\",\"content\":\"Option 2\",\"attributes\":{\"value\":\"2\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"option\",\"type\":\"text\",\"content\":\"Option 3\",\"attributes\":{\"value\":\"3\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false,\"entity\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"}],\"open\":0},{\"draggable\":\"form, form *\",\"content\":\"\",\"classes\":[{\"name\":\"form-group\",\"label\":\"form-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"custom-name\":\"Form group\",\"components\":[{\"type\":\"label\",\"highlightable\":false,\"content\":\"Message\",\"traits\":[{\"type\":\"text\",\"label\":\"For\",\"name\":\"for\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"textarea\",\"type\":\"textarea\",\"name\":\"textbox_iogyv\",\"highlightable\":false,\"content\":\"\",\"classes\":[{\"name\":\"form-control\",\"label\":\"form-control\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"name\":\"message\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"textbox_iogyv\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"text\",\"label\":\"Placeholder\",\"name\":\"placeholder\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"checkbox\",\"label\":\"Required\",\"name\":\"required\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"entity\",\"name\":\"entity\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"name\":\"none\",\"value\":\"none\"},{\"name\":\"ticket\",\"value\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"},{\"name\":\"categories\",\"value\":\"b5a631b0-ddf3-11e9-9a19-ef5df179aecc\"}]},{\"type\":\"entityFieldButton\",\"label\":\"Field\",\"name\":\"Field\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false,\"entity\":\"adc17900-ddf3-11e9-9a19-ef5df179aecc\"}],\"open\":0},{\"draggable\":\"form, form *\",\"content\":\"\",\"classes\":[{\"name\":\"form-group\",\"label\":\"form-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"custom-name\":\"Form group\",\"components\":[{\"tagName\":\"button\",\"type\":\"button\",\"name\":\"button_i1506\",\"highlightable\":false,\"content\":\"Save\",\"classes\":[{\"name\":\"btn\",\"label\":\"btn\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"btn-primary\",\"label\":\"btn-primary\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"type\":\"submit\",\"id\":\"i1506\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"button_i1506\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"content\",\"label\":\"contentName\",\"name\":\"contentname\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"Save\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"select\",\"label\":\"verb\",\"name\":\"verbs\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"key\":\"click\",\"value\":\"onClick\"},{\"key\":\"focus\",\"value\":\"onFocus\"},{\"key\":\"blur\",\"value\":\"onBlur\"}]},{\"type\":\"actionButton\",\"label\":\"Action\",\"name\":\"actionButton\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"content\":\"\",\"attributes\":{\"id\":\"ipdbj\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"ipdbj\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"button\",\"type\":\"popupModal-type\",\"name\":\"modal_ipdys\",\"status\":\"selected\",\"content\":\"Open Modal\\n      \",\"classes\":[{\"name\":\"btn\",\"label\":\"btn\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"btn-primary\",\"label\":\"btn-primary\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"id\":\"ipdys\"},\"traits\":[{\"type\":\"text\",\"label\":\"Name\",\"name\":\"name\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"modal_ipdys\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"content\",\"label\":\"contentName\",\"name\":\"contentname\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"Open Modal\\n      \",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[]},{\"type\":\"select\",\"label\":\"verb\",\"name\":\"verbs\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"key\":\"click\",\"value\":\"onClick\"},{\"key\":\"focus\",\"value\":\"onFocus\"},{\"key\":\"blur\",\"value\":\"onBlur\"}]},{\"type\":\"modalButton\",\"label\":\"Modal\",\"name\":\"modalButton\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":1}],\"open\":1},{\"type\":\"text\",\"removable\":false,\"draggable\":false,\"copyable\":false,\"content\":\"Thanks! We received your request\",\"classes\":[{\"name\":\"state-success\",\"label\":\"state-success\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"data-form-state\":\"success\",\"id\":\"i4fw8\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"form-state-type\":\"success\",\"open\":false},{\"type\":\"text\",\"removable\":false,\"draggable\":false,\"copyable\":false,\"content\":\"An error occurred on processing your request, try again!\",\"classes\":[{\"name\":\"state-error\",\"label\":\"state-error\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"data-form-state\":\"error\",\"id\":\"iwa4n\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"form-state-type\":\"error\",\"open\":false}],\"open\":1}],\"open\":1}],\"open\":1}]"
        //             ],
        //             "component-lifecycle": [],
        //             "special-events": [
        //                 {
        //                     "htmlId": "iyatzz",
        //                     "componentId": "c11308",
        //                     "elementName": "modal_ipdys",
        //                     "screenId": "59d68320-ddf4-11e9-b146-4bf37777f130",
        //                     "screenName": "popup",
        //                     "methodName": "popupModal",
        //                     "type": "modal",
        //                     "modal": {
        //                         "entityId": "b5a631b0-ddf3-11e9-9a19-ef5df179aecc",
        //                         "entityName": "categories",
        //                         "bindInfo": [
        //                             {
        //                                 "fieldId": "05ba87a1-ddf4-11e9-9a19-ef5df179aecc",
        //                                 "fieldName": "name",
        //                                 "componentName": "input_ismiy",
        //                                 "componentType": "input"
        //                             },
        //                             {
        //                                 "fieldId": "05ba87a0-ddf4-11e9-9a19-ef5df179aecc",
        //                                 "fieldName": "parent_id",
        //                                 "componentName": "input_iqdiw",
        //                                 "componentType": "input"
        //                             },
        //                             {
        //                                 "fieldId": "05ba87a0-ddf4-11e9-9a19-ef5df179aecc",
        //                                 "fieldName": "parent_id",
        //                                 "componentName": "select_ipj4o",
        //                                 "componentType": "select"
        //                             }
        //                         ]
        //                     }
        //                 }
        //             ],
        //             "is_grid_present": false,
        //             "project": "9fdc5800-ddf3-11e9-a76a-3bf50492c934",
        //             "feature": "a6f53530-ddf3-11e9-a313-47949bf80c3d",
        //             "screenType": "desktop",
        //             "isTemplate": false,
        //             "stylesheets": [],
        //             "scripts": [],
        //             "css-guidelines": [],
        //             "gjs-css": "* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin:0;}*{box-sizing:border-box;}body{margin:0;}*{box-sizing:border-box;}body{margin:0;}*{box-sizing:border-box;}body{margin:0;}*{box-sizing:border-box;}body{margin:0;}#iokxi{padding:50px 0;}#i1ire{width:40%;padding:25px 0;margin:0 auto;max-width:1200px;}#i4fw8{display:none;}#iwa4n{display:none;}.form-group{padding:10px 10px 10px 10px;}#ipdbj{padding-top:10px;padding-right:2px;padding-left:2px;padding-bottom:10px;}",
        //             "gjs-html": "<body><section id=\"iokxi\"><div id=\"i1ire\"><form method=\"post\" id=\"i8kgx\" class=\"form\"><div class=\"form-group\"><label>Name</label><input placeholder=\"Type here your name\" name=\"firstname\" id=\"ismiy\" class=\"form-control\"/></div><div class=\"form-group\"><label id=\"i4sk1\">Ticket Number</label><input placeholder=\"Type here your ticketNumber\" name=\"firstname\" class=\"form-control\"/></div><div class=\"form-group\"><label>Options</label><select name=\"options\" id=\"ipj4o\" class=\"form-control\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select></div><div class=\"form-group\"><label>Message</label><textarea name=\"message\" class=\"form-control\"></textarea></div><div class=\"form-group\"><button type=\"submit\" id=\"i1506\" class=\"btn btn-primary\">Save</button><div id=\"ipdbj\"><button id=\"ipdys\" class=\"btn btn-primary\">Open Modal\n      </button></div></div><div data-form-state=\"success\" id=\"i4fw8\" class=\"state-success\">Thanks! We received your request</div><div data-form-state=\"error\" id=\"iwa4n\" class=\"state-error\">An error occurred on processing your request, try again!</div></form></div></section></body>",
        //             "flows_info": [
        //                 {
        //                     "htmlId": "iyfjj9",
        //                     "componentId": "c11285",
        //                     "elementName": "button_i1506",
        //                     "verb": "click",
        //                     "flowName": "GpCreate",
        //                     "flow": "d7d25cf0-ddf3-11e9-9c3a-d11060cd5f6a"
        //                 }
        //             ],
        //             "route_info": [],
        //             "screenName": "createnew",
        //             "entity_info": [
        //                 {
        //                     "fields": {
        //                         "fieldId": "c74bb611-ddf3-11e9-9a19-ef5df179aecc",
        //                         "name": "name",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "ismiy",
        //                     "componentId": "c5133",
        //                     "elementName": "input_ismiy",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //                 },
        //                 {
        //                     "fields": {
        //                         "fieldId": "c74bb610-ddf3-11e9-9a19-ef5df179aecc",
        //                         "name": "ticketno",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "iqdiw",
        //                     "componentId": "c5793",
        //                     "elementName": "input_iqdiw",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //                 },
        //                 {
        //                     "fields": {
        //                         "fieldId": "c74b8f00-ddf3-11e9-9a19-ef5df179aecc",
        //                         "name": "Message",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "iogyv",
        //                     "componentId": "c5326",
        //                     "elementName": "textbox_iogyv",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //                 },
        //                 {
        //                     "fields": {
        //                         "fieldId": "25df0640-df58-11e9-a3b8-575ba9b6f945",
        //                         "name": "catagoryparent",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "i6lig5",
        //                     "componentId": "c11203",
        //                     "elementName": "select_ipj4o",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //                 },
        //                 {
        //                     "fields": {
        //                         "fieldId": "c74bb611-ddf3-11e9-9a19-ef5df179aecc",
        //                         "name": "name",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "iaidco",
        //                     "componentId": "c11127",
        //                     "elementName": "input_ismiy",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //                 },
        //                 {
        //                     "fields": {
        //                         "fieldId": "c74bb610-ddf3-11e9-9a19-ef5df179aecc",
        //                         "name": "ticketno",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "i8c36v",
        //                     "componentId": "c11170",
        //                     "elementName": "input_iqdiw",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc",
        //                 },
        //                 {
        //                     "fields": {
        //                         "fieldId": "c74b8f00-ddf3-11e9-9a19-ef5df179aecc",
        //                         "name": "message",
        //                         "description": "Description",
        //                         "typeName": "Text",
        //                         "dataType": "String"
        //                     },
        //                     "htmlId": "i1a8aj",
        //                     "componentId": "c11261",
        //                     "elementName": "textbox_iogyv",
        //                     "entityId": "adc17900-ddf3-11e9-9a19-ef5df179aecc"
        //                 }
        //             ],
        //             "__v": 0
        //         }
        //     ],
        //     "mobile": null,
        //     "flows": [
        //         {
        //             "_id": "d7d25cf0-ddf3-11e9-9c3a-d11060cd5f6a",
        //             "name": "GpCreate",
        //             "label": "save",
        //             "description": "creates a noun",
        //             "type": "basic",
        //             "actionOnData": "GpCreate",
        //             "createWithDefaultActivity": 1,
        //             "components": [
        //                 {
        //                     "name": "GpAngularComponent",
        //                     "label": "angular 7 component",
        //                     "description": "component for Angular desktop",
        //                     "type": "client",
        //                     "sequenceId": 1,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "8828d164-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.663Z"
        //                         },
        //                         {
        //                             "_id": "8828d165-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:39.755Z"
        //                         },
        //                         {
        //                             "_id": "8828f870-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.732Z"
        //                         },
        //                         {
        //                             "_id": "8828f871-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.824Z"
        //                         },
        //                         {
        //                             "_id": "8828f872-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:39.784Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbbbaf0-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "AngularComponent",
        //                             "description": "default connector calling from frontend component to frontend service",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a4"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpAngularComponent",
        //                             "toComponentName": "GpAngularService",
        //                             "createdAt": "2019-09-11T09:15:38.375Z",
        //                             "isCustom": false
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "GpAngularService",
        //                     "label": "angular 7 service",
        //                     "description": "service for Angular desktop",
        //                     "type": "client",
        //                     "sequenceId": 2,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "88291f82-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:39.876Z"
        //                         },
        //                         {
        //                             "_id": "88291f83-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.880Z"
        //                         },
        //                         {
        //                             "_id": "88291f84-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.869Z"
        //                         },
        //                         {
        //                             "_id": "88291f85-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:39.888Z"
        //                         },
        //                         {
        //                             "_id": "88294690-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.821Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isCustom": false,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbb93e4-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "AngularService",
        //                             "description": "default connector calling from frontend service to backend controller",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a5"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpAngularService",
        //                             "toComponentName": "GpExpressController",
        //                             "createdAt": "2019-09-11T09:15:38.021Z"
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "GpIonicAngularComponent",
        //                     "label": "Mobile Component",
        //                     "description": "component for Mobile Application",
        //                     "type": "client",
        //                     "sequenceId": 1,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Ionic Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "8828f873-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.936Z"
        //                         },
        //                         {
        //                             "_id": "8828f874-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:39.956Z"
        //                         },
        //                         {
        //                             "_id": "8828f875-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.974Z"
        //                         },
        //                         {
        //                             "_id": "88291f80-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.988Z"
        //                         },
        //                         {
        //                             "_id": "88291f81-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:40.008Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbb93e2-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "MobileComponent",
        //                             "description": "default connector calling from frontend Mobile component to mobile service",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a6"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpIonicAngularComponent",
        //                             "toComponentName": "GpIonicAngularService",
        //                             "createdAt": "2019-09-11T09:15:38.047Z",
        //                             "isCustom": false
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "GpIonicAngularService",
        //                     "label": "Mobile Service",
        //                     "description": "service for mobile Application",
        //                     "type": "client",
        //                     "sequenceId": 2,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Ionic Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "88294691-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.937Z"
        //                         },
        //                         {
        //                             "_id": "88294692-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:40.009Z"
        //                         },
        //                         {
        //                             "_id": "88294693-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.974Z"
        //                         },
        //                         {
        //                             "_id": "88294694-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:39.957Z"
        //                         },
        //                         {
        //                             "_id": "88294695-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.996Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbb93e0-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "MobileService",
        //                             "description": "default connector calling from frontend Mobile service to its backend controller",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a7"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpIonicAngularService",
        //                             "toComponentName": "GpExpressController",
        //                             "createdAt": "2019-09-11T09:15:37.926Z",
        //                             "isCustom": false
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "_id": "d7d28400-ddf3-11e9-9c3a-d11060cd5f6a",
        //             "name": "GpGetAllValues",
        //             "label": "getAllRecord",
        //             "description": "special search that gets all values",
        //             "type": "basic",
        //             "actionOnData": "GpGetAllValues",
        //             "createWithDefaultActivity": 1,
        //             "components": [
        //                 {
        //                     "name": "GpAngularComponent",
        //                     "label": "angular 7 component",
        //                     "description": "component for Angular desktop",
        //                     "type": "client",
        //                     "sequenceId": 1,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "8828d164-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.663Z"
        //                         },
        //                         {
        //                             "_id": "8828d165-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:39.755Z"
        //                         },
        //                         {
        //                             "_id": "8828f870-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.732Z"
        //                         },
        //                         {
        //                             "_id": "8828f871-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.824Z"
        //                         },
        //                         {
        //                             "_id": "8828f872-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularComponent",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:39.784Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isCustom": false,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbbbaf0-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "AngularComponent",
        //                             "description": "default connector calling from frontend component to frontend service",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a4"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpAngularComponent",
        //                             "toComponentName": "GpAngularService",
        //                             "createdAt": "2019-09-11T09:15:38.375Z"
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "GpAngularService",
        //                     "label": "angular 7 service",
        //                     "description": "service for Angular desktop",
        //                     "type": "client",
        //                     "sequenceId": 2,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "88291f82-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:39.876Z"
        //                         },
        //                         {
        //                             "_id": "88291f83-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.880Z"
        //                         },
        //                         {
        //                             "_id": "88291f84-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.869Z"
        //                         },
        //                         {
        //                             "_id": "88291f85-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:39.888Z"
        //                         },
        //                         {
        //                             "_id": "88294690-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpAngularService",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.821Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": "https://api.stlouisfed.org/fred/category/related?category_id=32073&api_key=1d6109900692021b3c0e18d9a1c9591f&file_type=json",
        //                             "isDefault": false,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "d2bbb100-d914-11e9-b5db-a1ef043adb68",
        //                             "name": "quick connectors",
        //                             "description": "qucik connectord api details",
        //                             "availableApi": [
        //                                 {
        //                                     "name": "availble",
        //                                     "description": "des",
        //                                     "type": "api",
        //                                     "properties": []
        //                                 }
        //                             ],
        //                             "fromComponentName": null,
        //                             "toComponentName": null,
        //                             "isCustom": true,
        //                             "entity_id": "b5a631b0-ddf3-11e9-9a19-ef5df179aecc",
        //                             "apiMethods": "get",
        //                             "service": "backEnd",
        //                             "api_key": "1d6109900692021b3c0e18d9a1c9591f",
        //                             "params": "category_id=125"
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "GpIonicAngularComponent",
        //                     "label": "Mobile Component",
        //                     "description": "component for Mobile Application",
        //                     "type": "client",
        //                     "sequenceId": 1,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Ionic Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "8828f873-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.936Z"
        //                         },
        //                         {
        //                             "_id": "8828f874-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:39.956Z"
        //                         },
        //                         {
        //                             "_id": "8828f875-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.974Z"
        //                         },
        //                         {
        //                             "_id": "88291f80-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.988Z"
        //                         },
        //                         {
        //                             "_id": "88291f81-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularComponent",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:40.008Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isCustom": false,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbb93e2-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "MobileComponent",
        //                             "description": "default connector calling from frontend Mobile component to mobile service",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a6"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpIonicAngularComponent",
        //                             "toComponentName": "GpIonicAngularService",
        //                             "createdAt": "2019-09-11T09:15:38.047Z"
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "GpIonicAngularService",
        //                     "label": "Mobile Service",
        //                     "description": "service for mobile Application",
        //                     "type": "client",
        //                     "sequenceId": 2,
        //                     "devLanguage": "java_script",
        //                     "devFramework": "Ionic Angular",
        //                     "microFlows": [
        //                         {
        //                             "_id": "88294691-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpHeaders",
        //                             "sequenceId": "1",
        //                             "createdAt": "2019-09-11T09:15:39.937Z"
        //                         },
        //                         {
        //                             "_id": "88294692-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpOptions",
        //                             "sequenceId": "2",
        //                             "createdAt": "2019-09-11T09:15:40.009Z"
        //                         },
        //                         {
        //                             "_id": "88294693-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpCodeToAdd",
        //                             "sequenceId": "3",
        //                             "createdAt": "2019-09-11T09:15:39.974Z"
        //                         },
        //                         {
        //                             "_id": "88294694-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpRequest",
        //                             "sequenceId": "5",
        //                             "createdAt": "2019-09-11T09:15:39.957Z"
        //                         },
        //                         {
        //                             "_id": "88294695-7003-11e9-abdd-ffb308621fd2",
        //                             "componentName": "GpIonicAngularService",
        //                             "microFlowStepName": "GpCheck_Connector",
        //                             "sequenceId": "4",
        //                             "createdAt": "2019-09-11T09:15:39.996Z"
        //                         }
        //                     ],
        //                     "connector": [
        //                         {
        //                             "url": null,
        //                             "isDefault": true,
        //                             "isCustom": false,
        //                             "isDisabled": false,
        //                             "properties": [],
        //                             "_id": "7cbb93e0-7877-11e9-bdb0-f73f14ce0e52",
        //                             "name": "MobileService",
        //                             "description": "default connector calling from frontend Mobile service to its backend controller",
        //                             "availableApi": [
        //                                 {
        //                                     "name": null,
        //                                     "description": null,
        //                                     "type": null,
        //                                     "properties": [],
        //                                     "_id": "5d88a639d018be2eb20883a7"
        //                                 }
        //                             ],
        //                             "fromComponentName": "GpIonicAngularService",
        //                             "toComponentName": "GpExpressController",
        //                             "createdAt": "2019-09-11T09:15:37.926Z"
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // }

        // console.log('create angular html metadata ---@#$$$$-11---    ', req.body.desktop.length);
        // console.log('create angular html metadata ---@#$$$$-json-22--    ', JSON.parse(req.body.desktop[0]['gjs-components'][0]));
        // more desktop screens in one features
        // const temp = JSON.parse(req.body.desktop[0]['gjs-components'][0]);
        // console.log('create angular html metadata ---@#$$$$--full temp--    ', details.desktop[0].screenName);
        // details.desktop.forEach((featureScreenElement, index) => {
        //     console.log('screen name ----  ', featureScreenElement.screenName);
        //     console.log('screen css ----  ', featureScreenElement['gjs-css']);
        //     generateHtmlWorker.generate(JSON.parse(featureScreenElement['gjs-components'][0]), featureScreenElement['gjs-css'], featureScreenElement, featureScreenElement.screenName, details, (response) => {
        //         console.log('angular service  response are -----  ', response);
        //         if (index == details.desktop.length - 1) {
        //             generateHtmlWorker.modifyDependency(details, (response) => {
        //                 callback(response);
        //             })
        //         }
        //     });
        // })
        const primaryScreens = details.desktop.filter(x => x.route_info.length > 0 || x["special-events"].length > 0);
        const secondaryScreens = details.desktop.filter(x => x.route_info.length == 0 && x["special-events"].length == 0);
        console.log('all screen lenght ---- ', details.desktop.length);
        console.log('primary screen lenght ---- ', primaryScreens.length);
        console.log('secondary screen lenght ---- ', secondaryScreens.length);
        this.iterateScreens(primaryScreens, details, (response) => {
            this.iterateScreens(secondaryScreens, details, (response) => {
                generateHtmlWorker.modifyDependency(details, (response) => {
                    // callback(response);
                    callback({ Message: 'feature screens are generated successfully' });
                })
            })
        });
        // working fine
        // asyncLoop(details.desktop, (featureScreenElement, next) => {
        //     generateHtmlWorker.generate(JSON.parse(featureScreenElement['gjs-components'][0]), featureScreenElement['gjs-css'], featureScreenElement, featureScreenElement.screenName, details, (response) => {
        //         next();
        //     });
        // }, (err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         generateHtmlWorker.modifyDependency(details, (response) => {
        //             // callback(response);
        //             callback({ Message: 'feature screens are generated successfully' });
        //         })
        //         // console.log({ Message: 'feature screens are generated successfully' });
        //     }
        // })
        // generateHtmlWorker.generate(temp, details.desktop[0], details.desktop[0].screenName, details, (response) => {
        //     console.log('angular service  response are 0-----  ', response);
        //     callback(response);
        // });
        // console.log('create angular html metadata ---@#$$$$--33--    ', temp.length);
        // console.log('create angular html metadata ---@#$$$$--44--    ', temp[0]);

        // console.log('has own property in classes are -11-- ', temp[0].hasOwnProperty('classes'))
        // console.log('has own property in traits are -22-- ', temp[0].hasOwnProperty('traits'))
        // console.log('has own property in attributes are -2222-- ', temp[0].hasOwnProperty('attributes'))
        // console.log('has own property in components are -33-- ', temp[0].hasOwnProperty('components'))

        // let menuDetails = await this.getMenuByProjectId('330044c0-82c3-11e9-b9fc-5fd84bbf02f0')
        // let menuData = JSON.parse(menuDetails.toString()).body;
        // // console.log('=======================', util.inspect(menuData[0].menuDetails[0].screenmenu[0], { showHidden: true, depth: null }))
        // let projectGenerationPath = '../../originalcode/'
        // let templateLocation = '../../template'
        // let routeObj = menuData[0].menuDetails[0].screenmenu[0];
        // routeWorker.generateRouteFile(projectGenerationPath, templateLocation, routeObj);
    }

    iterateScreens(screenInfo, details, callback) {
        // console.log('outside asyncloop screenfinfo are ----- ', screenInfo);
        asyncLoop(screenInfo, (featureScreenElement, next) => {
            // console.log('inside asyncloop screenfinfo are ----- ', featureScreenElement);
            if (featureScreenElement) {
                generateHtmlWorker.generate(JSON.parse(featureScreenElement['gjs-components'][0]), featureScreenElement['gjs-css'], featureScreenElement, featureScreenElement.screenName, details, (response) => {
                    next();
                });
            } else {
                next();
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                // generateHtmlWorker.modifyDependency(details, (response) => {
                // callback(response);
                callback({ Message: 'feature screens are generated successfully' });
                // })
                // console.log({ Message: 'feature screens are generated successfully' });
            }
        })
    }



    // getMenuByProjectId(projectId) {
    //     return new Promise(resolve => {
    //         this.menuManagerService.getMenuByProjectId(projectId, (data) => {
    //             resolve(data);
    //         })
    //     });
    // }
}

