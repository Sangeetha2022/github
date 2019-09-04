import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class MongoService {

    generate_mongo_script_local(projectDetails, callback: CallableFunction) {
        let destination = projectDetails.projectUrl + '/devops';
        let templatePath = projectDetails.templateUrl + '/mongo';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script cloud
        let generateMongoScript = st.loadGroup(require(templatePath + '/mongoscript_stg'));
        let mongoScript = generateMongoScript.render("mongoscript");
        fs.writeFile(destination + '/mongoscript', mongoScript, function (err) {
            if (err) throw err;
            console.log('mongo script for local is generated!!')
        })
    }

    generate_mongo_script_cloud(projectDetails, callback: CallableFunction) {
        let destination = projectDetails.projectUrl + '/devops';
        let templatePath = projectDetails.templateUrl + '/mongo';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script cloud
        let generateMongoScript = st.loadGroup(require(templatePath + '/mongoscript_stg'));
        let mongoScript = generateMongoScript.render("mongoscript");
        fs.writeFile(destination + '/mongoscript', mongoScript, function (err) {
            if (err) throw err;
            console.log('mongo script for cloud is generated!!')
        })
    }
}