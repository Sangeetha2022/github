import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const Destination = deployConfig.AWS.DESTINATION_URL;

export class DevOpsService {

    public dev_ops_db_pod(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/aws"

        let namespaceYaml = projectDetails.yamlSource + "/namespace";
        let namespaceManifest = yaml.safeLoad(fs.readFileSync(namespaceYaml + '/namespace.yaml', 'utf8'));

        async function createNameSpace() {
            try {

                //create name space
                const namespaceData = await client.api.v1.namespace.post({ body: namespaceManifest })
                if (namespaceData.statusCode == 201) {
                    //applyDeploy()
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        createNameSpace()
        async function applyDeploy() {
            try {

                //todo
                


            } catch (err) {
                console.error('Error: ', err)
            }
        }

    }


}