export const itemTagsManager = {

    "feature_name": "itemtagsmanager",
    "sharing_visibility_status": "admin",
    "type": "",
    "last_modified_date": "",
    "description": "To create a tags to view the list of field like year 2023, 2014 etc",
    "author_email": "gepinfo@gmail.com",
    "author_name": "Kishan Ravindra",
    "organization": "geppettosoftware.com",
    "icon_location": "/file_manager.png",
    "repo":{
        "type": "github",
        "location": "",
        "branch" : "main",
        "release_version_tag": ""
    },
    "security":{
        "verification_status": "not verified",
        "verification_id": ""
    },
    "quality":{
        "quality_status": "not reviewed",
        "quality_id": ""

    },
    "geppetto_framework":{
        "generator_version": "",
        "generator_build_id": ""
    },
    "license":{
        "type": "OSS", 
        "name": "Apache 2",
        "price": "0",
        "term": "",
        "comments": "best effort support"
    },
    "primary_entity": "itemTags",
    "secondary_entities":[
        "tags"
    ],
    "entities":[
        {
            "name": "tags",
            "fields":[
                {
                    "name": "year",
                    "description": "list of year",
                    "type": "text"
                }
            ]

        }
    ],
    "configuration": {
        "admin_ui_entry_point": "",
        "admin_backend_services": [
            {
                "service_name": "",
                "apis":[
                    {
                        "name": "api one",
                        "route": "",
                        "api_method": "get",
                        "input": "",
                        "output": ""

                    }
                ]
            }
        ]
    },
    "entry_point": {
        "default_entry": "client",
        "entry_point_access": "",
        "alternate_entry": "server",
        "alternate_entry_point_access": ""
    },
    "server_properties":{
        "runtime": "nodejs",
        "runtime_version": "16.0.0",
        "dev_framework": "express",
        "dev_framework_version": "4.7.1",
        "datastore": "mongo",
        "datastore_version": "5.0",
        "flows":[
            {
                "name": "gepcreate",
                "api": "",
                "api_method": "post",
                "input": "",
                "output": ""
            }
        ]
    },
    "web_client_properties":{
        "framework": "angular",
        "framework_version": "13.0.3",
        "screens":[{
            "name": "update_tags",
            "route": "",
            "component_name": "itemtags",
            "meta_data": 
            {
                "type": "GJS",
                "location": ""

            }
        }],
        "flows":[{
            "name": "gpcreate",
            "route": "",
            "component_name": "itemtags"

        }]
    }
    
}

export const shoppingCart = {

    "feature_name": "shoppingcart",
    "sharing_visibility_status": "admin",
    "type": "",
    "last_modified_date": "",
    "description": "To use the services add and edit the cart",
    "author_email": "gepinfo@gmail.com",
    "author_name": "Kishan Ravindra",
    "organization": "geppettosoftware.com",
    "icon_location": "/shopping_cart.png",
    "repo":{
        "type": "github",
        "location": "",
        "branch" : "main",
        "release_version_tag": ""
    },
    "security":{
        "verification_status": "not verified",
        "verification_id": ""
    },
    "quality":{
        "quality_status": "not reviewed",
        "quality_id": ""

    },
    "geppetto_framework":{
        "generator_version": "",
        "generator_build_id": ""
    },
    "license":{
        "type": "OSS", 
        "name": "Apache 2",
        "price": "0",
        "term": "",
        "comments": "best effort support"
    },
    "primary_entity": "cartshop",
    "secondary_entities":[
        "carts"
    ],
    "entities":[
        {
            "name": "carts",
            "fields":[
                {
                    "name": "name",
                    "description": "list of name",
                    "type": "text"
                }
            ]

        }
    ],
    "configuration": {
        "admin_ui_entry_point": "",
        "admin_backend_services": [
            {
                "service_name": "",
                "apis":[
                    {
                        "name": "api one",
                        "route": "",
                        "api_method": "get",
                        "input": "",
                        "output": ""

                    }
                ]
            }
        ]
    },
    "entry_point": {
        "default_entry": "client",
        "entry_point_access": "",
        "alternate_entry": "server",
        "alternate_entry_point_access": ""
    },
    "server_properties":{
        "runtime": "nodejs",
        "runtime_version": "16.0.0",
        "dev_framework": "express",
        "dev_framework_version": "4.7.1",
        "datastore": "mongo",
        "datastore_version": "5.0",
        "flows":[
            {
                "name": "gepcreate",
                "api": "",
                "api_method": "post",
                "input": "",
                "output": ""
            }
        ]
    },
    "web_client_properties":{
        "framework": "angular",
        "framework_version": "13.0.3",
        "screens":[{
            "name": "create_cart",
            "route": "",
            "component_name": "carts_name",
            "meta_data": 
            {
                "type": "GJS",
                "location": ""

            }
        }],
        "flows":[{
            "name": "gpcreate",
            "route": "",
            "component_name": "carts_name"

        }]
    }
}

export const wcmx_wordpress = {

    "feature_name": "wcmx_wordpress",
    "sharing_visibility_status": "admin",
    "type": "",
    "last_modified_date": "",
    "description": "To create a own static pages to view the sites",
    "author_email": "gepinfo@gmail.com",
    "author_name": "Kishan Ravindra",
    "organization": "geppettosoftware.com",
    "icon_location": "/wcmx_wordpress.png",
    "repo":{
        "type": "github",
        "location": "",
        "branch" : "main",
        "release_version_tag": ""
    },
    "security":{
        "verification_status": "not verified",
        "verification_id": ""
    },
    "quality":{
        "quality_status": "not reviewed",
        "quality_id": ""

    },
    "geppetto_framework":{
        "generator_version": "",
        "generator_build_id": ""
    },
    "license":{
        "type": "OSS", 
        "name": "Apache 2",
        "price": "0",
        "term": "",
        "comments": "best effort support"
    },
    "primary_entity": "wcmx_wordpress",
    "secondary_entities":[
        "wcmx_wordpress"
    ],
    "entities":[
        {
            "name": "name",
            "fields":[
                {
                    "name": "blocks",
                    "description": "list of blocks",
                    "type": "text"
                }
            ]

        }
    ],
    "configuration": {
        "admin_ui_entry_point": "",
        "admin_backend_services": [
            {
                "service_name": "",
                "apis":[
                    {
                        "name": "api one",
                        "route": "",
                        "api_method": "get",
                        "input": "",
                        "output": ""

                    }
                ]
            }
        ]
    },
    "entry_point": {
        "default_entry": "client",
        "entry_point_access": "",
        "alternate_entry": "server",
        "alternate_entry_point_access": ""
    },

    "server_properties":{
        "runtime": "nodejs",
        "runtime_version": "16.0.0",
        "dev_framework": "express",
        "dev_framework_version": "4.7.1",
        "datastore": "mongo",
        "datastore_version": "5.0",
        "flows":[
            {
                "name": "gepcreate",
                "api": "",
                "api_method": "post",
                "input": "",
                "output": ""
            }
        ]
    },
    "web_client_properties":{
        "framework": "angular",
        "framework_version": "13.0.3",
        "screens":[{
            "name": "update_tags",
            "route": "",
            "component_name": "wcmx_wordpress",
            "meta_data": 
            {
                "type": "GJS",
                "location": ""

            }
        }],
        "flows":[{
            "name": "gpcreate",
            "route": "",
            "component_name": "wcmx_wordpress"

        }]
    }
}

export const wcmx_grapesjs = {
    
    "feature_name": "wcmx_grapesjs",
    "sharing_visibility_status": "admin",
    "type": "",
    "last_modified_date": "",
    "description": "To create a tags to view the list of field like year 2023, 2014 etc",
    "author_email": "gepinfo@gmail.com",
    "author_name": "Kishan Ravindra",
    "organization": "geppettosoftware.com",
    "icon_location": "/wcmx_grapesjs_manager.png",
    "repo":{
        "type": "github",
        "location": "",
        "branch" : "main",
        "release_version_tag": ""
    },
    "security":{
        "verification_status": "not verified",
        "verification_id": ""
    },
    "quality":{
        "quality_status": "not reviewed",
        "quality_id": ""

    },
    "geppetto_framework":{
        "generator_version": "",
        "generator_build_id": ""
    },
    "license":{
        "type": "OSS", 
        "name": "Apache 2",
        "price": "0",
        "term": "",
        "comments": "best effort support"
    },
    "primary_entity": "wcmx_grapesjs",
    "secondary_entities":[
        "tags"
    ],
    "entities":[
        {
            "name": "grapesjs",
            "fields":[
                {
                    "name": "year",
                    "description": "list of year",
                    "type": "text"
                }
            ]

        }
    ],
    "configuration": {
        "admin_ui_entry_point": "",
        "admin_backend_services": [
            {
                "service_name": "",
                "apis":[
                    {
                        "name": "api one",
                        "route": "",
                        "api_method": "get",
                        "input": "",
                        "output": ""

                    }
                ]
            }
        ]
    },
    "entry_point": {
        "default_entry": "client",
        "entry_point_access": "",
        "alternate_entry": "server",
        "alternate_entry_point_access": ""
    },

    "server_properties":{
        "runtime": "nodejs",
        "runtime_version": "16.0.0",
        "dev_framework": "express",
        "dev_framework_version": "4.7.1",
        "datastore": "mongo",
        "datastore_version": "5.0",
        "flows":[
            {
                "name": "gepcreate",
                "api": "",
                "api_method": "post",
                "input": "",
                "output": ""
            }
        ]
    },
    "web_client_properties":{
        "framework": "angular",
        "framework_version": "13.0.3",
        "screens":[{
            "name": "update_tags",
            "route": "",
            "component_name": "wcmx_grapesjs",
            "meta_data": 
            {
                "type": "GJS",
                "location": ""

            }
        }],
        "flows":[{
            "name": "gpcreate",
            "route": "",
            "component_name": "wcmx_grapesjs"

        }]
    }
}