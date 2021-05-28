export class Constant {
    public static JSON_DATA = [
        {
            name: 'MLSGRID',
            data: `{
                "info": {
                    "_postman_id": "30c910ff-1209-47e9-a2af-a25c34413f14",
                    "name": "mls",
                    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
                },
                "item": [
                    {
                        "name": "https://api.mlsgrid.com/PropertyResi?$filter=ModificationTimestamp gt 2018-12-30T23:59:59.99Z",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "7f9827ce5e9e52cffb49578dc892aeffe3fbe95c",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "https://api.mlsgrid.com/PropertyResi?$filter=ModificationTimestamp gt 2018-12-30T23:59:59.99Z",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "mlsgrid",
                                    "com"
                                ],
                                "path": [
                                    "PropertyResi"
                                ],
                                "query": [
                                    {
                                        "key": "$filter",
                                        "value": "ModificationTimestamp gt 2018-12-30T23:59:59.99Z"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "https://api.mlsgrid.com/PropertyResi?$filter=MlgCanView eq true",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "7f9827ce5e9e52cffb49578dc892aeffe3fbe95c",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "https://api.mlsgrid.com/PropertyResi?$filter=MlgCanView eq true",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "mlsgrid",
                                    "com"
                                ],
                                "path": [
                                    "PropertyResi"
                                ],
                                "query": [
                                    {
                                        "key": "$filter",
                                        "value": "MlgCanView eq true"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "https://api.mlsgrid.com/PropertyResi?$filter=ModificationTimestamp gt 2019-02-04T23:59:59.99Z",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "7f9827ce5e9e52cffb49578dc892aeffe3fbe95c",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "https://api.mlsgrid.com/PropertyResi?$filter=ModificationTimestamp gt 2019-02-04T23:59:59.99Z",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "mlsgrid",
                                    "com"
                                ],
                                "path": [
                                    "PropertyResi"
                                ],
                                "query": [
                                    {
                                        "key": "$filter",
                                        "value": "ModificationTimestamp gt 2019-02-04T23:59:59.99Z"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "https://api.mlsgrid.com/Media?$filter=ModificationTimestamp gt 2019-02-04T23:59:59.99Z",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "7f9827ce5e9e52cffb49578dc892aeffe3fbe95c",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "https://api.mlsgrid.com/Media?$filter=ModificationTimestamp gt 2019-02-04T23:59:59.99Z",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "mlsgrid",
                                    "com"
                                ],
                                "path": [
                                    "Media"
                                ],
                                "query": [
                                    {
                                        "key": "$filter",
                                        "value": "ModificationTimestamp gt 2019-02-04T23:59:59.99Z"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "https://api.mlsgrid.com/PropertyResi?$filter=StandardStatus+eq+Enums.StandardStatus'Active'",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "7f9827ce5e9e52cffb49578dc892aeffe3fbe95c",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "https://api.mlsgrid.com/PropertyResi?$filter=StandardStatus+eq+Enums.StandardStatus'Active'",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "mlsgrid",
                                    "com"
                                ],
                                "path": [
                                    "PropertyResi"
                                ],
                                "query": [
                                    {
                                        "key": "$filter",
                                        "value": "StandardStatus+eq+Enums.StandardStatus'Active'"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            }`
        }
    ];

    
}