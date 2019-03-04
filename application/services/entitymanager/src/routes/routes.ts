
import { EntityController } from '../controllers/EntityController';
import { EntityTypeController } from '../controllers/EntityTypeController';
import { Request, Response, NextFunction } from "express";
import { DefaultEntityController } from '../controllers/DefaultEntityController';

export class Routes {

    public entityController: EntityController = new EntityController();
    public defaultEntityController: DefaultEntityController = new DefaultEntityController();
    
    public entityTypeController: EntityTypeController = new EntityTypeController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/entity/save').post(this.entityController.createEntity);
        app.route('/entity/update').put(this.entityController.updateEntity);
        app.route('/entity/delete/:id').delete(this.entityController.deleteEntity);
        app.route('/entity/get/:id').get(this.entityController.getByEntityId);
        app.route('/entity/getall').get(this.entityController.getAllEntity);
        app.route('/entity/get').get(this.entityController.getEntityByProjectId);

        // entity field
        app.route('/entity/field/update').put(this.entityController.updateEntityField);
        
        // entity types
        app.route('/entity_type/get').get(this.entityTypeController.getAllEntity);

        // default entity
        app.route('/create/default').get(this.defaultEntityController.createDefaultEntity);

    }
}