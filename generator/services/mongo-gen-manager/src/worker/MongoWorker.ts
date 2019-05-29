


import * as util from 'util';
import { MongoSupportWorker } from '../supportworker/MongoSupportWorker';

export class MongoWorker {

    mongoSupportWorker = new MongoSupportWorker();

    createProjectModel(modelDetails, modelPath, templatePath, callback) {
        let fields = this.FieldObject(modelDetails.field);
        this.mongoSupportWorker.createProjectModel(modelDetails.name, fields, modelPath, templatePath,  (response) => {
            callback(response);
        })
    }


    FieldObject(fields) {
        let fieldValue = [];
        fields.forEach(element => {
            if (!element.is_entity_type && !element.is_list_type) {
                fieldValue.push(`${element.name}: ${element.data_type}`)
            } else if (typeof element.entity_id === "object" && !element.is_list_type) {
                fieldValue.push(`${element.name}: { type: Schema.Types.ObjectId, ref: '${element.entity_id.name}' }`)
            } else if (typeof element.entity_id === "object" && element.is_list_type) {
                fieldValue.push(`${element.name}: [{ type: Schema.Types.ObjectId, ref: '${element.entity_id.name}' }]`)
            } else if (element.is_list_type && typeof element.entity_id !== "object") {
                fieldValue.push(`${element.name}: [${element.data_type}]`)
            }
        })
        return fieldValue;
    }

}