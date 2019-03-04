import { EntitySupportWorker } from "../supportworker/EntitySupportWorker";


let entitySupportWorker = new EntitySupportWorker();
export class EntityWorker {


    entityModelWorker(entityData, callback) {
        let fields = this.FieldObject(entityData.field);
        console.log('list of fields in objects ----- ', fields);
        entitySupportWorker.entityModelWorker(entityData.name, fields, (response) => {
            callback(response);
        })
    }

    FieldObject(fields) {
        console.log('before field objects are -------- ', fields.length);
        let fieldValue = [];
        fields.forEach(element => {
            console.log('field object elements are ----------   ');
            if (!element.is_entity_type && !element.is_list_type) {
                fieldValue.push(`${element.name}: ${element.data_type}`)
            } else if (typeof element.entity_id === "object" && !element.is_list_type) {
                fieldValue.push(`${element.name}: { type: String, ref: '${element.entity_id.name}' }`)
            } else if (typeof element.entity_id === "object" && element.is_list_type) {
                fieldValue.push(`${element.name}: [{ type: String, ref: '${element.entity_id.name}' }]`)
            }else if (element.is_list_type && typeof element.entity_id !== "object") {
                fieldValue.push(`${element.name}: [${element.data_type}]`)
            }
        })
        return fieldValue;
    }
}