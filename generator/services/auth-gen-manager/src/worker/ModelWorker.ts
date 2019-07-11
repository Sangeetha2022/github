import * as util from 'util';
import { ModelSupportWorker } from '../Supportworker/ModelSupportWorker';

export class ModelWorker {

    modelsupport = new ModelSupportWorker();
    createfile(models, generationpath,templatepath, callback) {
        let Modeldetails = this.Modelfile(models.field);
        this.modelsupport.createUserModel(models.name, Modeldetails, generationpath, templatepath, (response) => {
            callback(response);
        });
    }


    Modelfile(entity) {
        let fieldValue = [];
        entity.forEach(element => {
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