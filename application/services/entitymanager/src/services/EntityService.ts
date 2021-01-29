import { Request } from 'express';
import { EntityDao } from '../daos/EntityDao';
import { fieldTypes, fieldDataType } from '../constants/constant.service';

let entityDao = new EntityDao();

export class EntityService {

    public createEntity(req: Request, callback) {
        const entity = req.body;
        entityDao.createEntity(entity, (response) => {
            callback(response);
        });
    }

    public updateEntity(req: Request, callback) {
        const entity = req.body;
        console.log('----------entity------', entity);
        // entity.field.forEach(element => {
        //     if (element.is_list_type && typeof element.entity_id !== "object") {
        //         this.typeListCheck(element);
        //     } else {
        //         this.typeCheck(element);
        //     }

        // });
        entityDao.updateEntity(entity, (response) => {
            callback(response);
        })
    }

    public updateEntityField(req: Request, callback) {
        const entity = req.body;
        entity.field.forEach(element => {
            if (element.is_list_type && typeof element.entity_id !== "object") {
                this.typeListCheck(element);
            } else {
                this.typeCheck(element);
            }

        });
        entityDao.upateEntityField(entity, (response) => {
            callback(response);
        })
    }

    public deleteEntity(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.deleteEntity(entityId, (response) => {
            callback(response);
        })
    }

    public deleteProjectEntity(req: Request, callback) {
        const projectId = req.params.id;
        entityDao.deleteProjectEntity(projectId, (response) => {
            callback(response);
        })
    }

    public getProjectEntity(req: Request, callback) {
        const projId = req.params.id;
        entityDao.getProjectEntity(projId, (response) => {
            callback(response);
        })
    }

    public getByEntityId(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.getByEntityId(entityId, (response) => {
            callback(response);
        })
    }

    public getEntityByProjectId(req: Request, callback) {
        const projectId = req.query.projectId;
        entityDao.getEntityByProjectId(projectId, (response) => {
            callback(response);
        })
    }

    public getEntityByFeatureId(req: Request, callback) {
        const featureId = req.query.featureId;
        entityDao.getEntityByFeatureId(featureId, (response) => {
            callback(response);
        })
    }

    public getAllEntity(req: Request, callback) {
        entityDao.getAllEntity((response) => {
            callback(response);
        });
    }

    public getentityfeatures(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        entityDao.getentityfeatures(projectId, (response) => {
            callback(response);
        })
    }

    public getFeatureEntities(req: Request , callback: CallableFunction){
        const entity = req.body;
        entityDao.getFeatureEntities(entity , (response) => {
            callback(response)
        })
    }


    typeCheck(element) {
        if (element.type_name === fieldTypes.NUMBER ||
            element.type_name === fieldTypes.DECIMAL) {
            element.data_type = fieldDataType.NUMBER;
        } else if (element.type_name === fieldTypes.DATE) {
            element.data_type = fieldDataType.DATE;
        } else if (element.type_name === fieldTypes.BOOLEAN) {
            element.data_type = fieldDataType.BOOLEAN;
        } else {
            element.data_type = fieldDataType.STRING;
        }
    }

    typeListCheck(element) {
        if (element.list_value === fieldTypes.NUMBER ||
            element.list_value === fieldTypes.DECIMAL) {
            element.data_type = fieldDataType.NUMBER;
        } else if (element.list_value === fieldTypes.DATE) {
            element.data_type = fieldDataType.DATE;
        } else if (element.list_value === fieldTypes.BOOLEAN) {
            element.data_type = fieldDataType.BOOLEAN;
        } else {
            element.data_type = fieldDataType.STRING;
        }
    }
}