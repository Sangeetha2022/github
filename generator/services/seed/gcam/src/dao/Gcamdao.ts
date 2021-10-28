import mongoose = require('mongoose');
import { Resourceschema } from '../model/resource';
import { CustomLogger } from '../config/Logger';
// import * as asyncLoop from 'node-async-loop';

const resourceschema = mongoose.model('resources', Resourceschema);


export class Gcamdao {
    public  getResourceAuthorizationByRole(role: any,callback: { (response: any): void; (arg0: any): void; }) {
        new CustomLogger().showLogger('info', 'Enter into Gcamdao.ts:  getResourceAuthorizationByRole');
        console.log("DAO -------------->",role,"check a answer progress", { roles: { "$in" : [role]}})
         resourceschema.find( { roles: [role]} )
        .then(async (response: any) => {
            console.log("response",response);
             let res = await this.jsontransformation();
             console.log("res-----",res)
             new CustomLogger().showLogger('info', 'Exit from Gcamdao.ts: getResourceAuthorizationsByRole');
            callback(res);
        }).catch((error: any) => {
            callback(error);
        })
    }


    public jsontransformation(){
            var jsonbody = 
                [
                    {
                    "resource-name": "admin screen",
                    "resource-type": "screen",
                    "roles": ["admin"],
                    "components": [{
                        "label_1425": {
                            "id": "878979",
                            "roles": ["admin"]
                        },
                        "textbox_6272": {
                            "id": "135979",
                            "roles": ["admin"]
                        },
                        "label_2437": {
                            "id": "343979",
                            "roles": ["admin"]
                        },
                        "dropdown_73821": {
                            "id": "738291",
                            "roles": ["admin"]
                        }
                    }
                    ]
                },
                {
                    "resource-name": "user admin screen",
                    "resource-type": "screen",
                    "roles": ["admin"],
                    "components": [{
                        "label_1425": {
                            "id": "878979",
                            "roles": ["admin"]
                        },
                        "textbox_6272": {
                            "id": "135979",
                            "roles": ["admin"]
                        },
                        "label_2437": {
                            "id": "343979",
                            "roles": ["admin"]
                        },
                        "dropdown_73821": {
                            "id": "738291",
                            "roles": ["admin"]
                        }
                    }
                    
                    ]
                },
                {
                    "resource-name": "landing",
                    "resource-type": "screen",
                    "roles": ["guest", "Admin", "User"],
                    "components": [{
                        "login": {
                            "id": "878979",
                            "roles": ["guest"]
                        },
                        "search": {
                            "id": "135979",
                            "roles": ["admin", "user"]
                        },
                        "catalog": {
                            "id": "343979",
                            "roles": ["guest"]
                        }
                    }
                    ]
                }
            ]
            console.log("js--->",jsonbody);
         return(jsonbody);
    }
}     