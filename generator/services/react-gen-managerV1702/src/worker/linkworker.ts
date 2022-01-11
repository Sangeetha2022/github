import { Constant } from "../config/Constant";

export class LinkWorker {
    // Mapping the entities for link worker
    public constructEntitiesForLinkWorker(desktopElement, entityArray, entities) {
        let gjsComponents: any = desktopElement['gjs-components'][0];
        if (gjsComponents && gjsComponents.length > 0) {
            gjsComponents = JSON.parse(gjsComponents);
            gjsComponents.forEach((element: any) => {
                if (element.entity) {
                    const entity: any = entities.filter((e: any) => e.name === element.entity);
                    let entityObject: any = {};
                    if (entity && entity.length > 0) {
                        entityObject.name = entity[0].name;
                        const fieldName = [];
                        entity[0].field.map(e => {
                            fieldName.push({ name: e.name });
                        });
                        entityObject.field = fieldName;
                        entityArray.push(entityObject);
                    }
                }
            });
        }
        return entityArray;
    }
}