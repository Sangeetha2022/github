import { Request } from 'express';
import { FeatureDao } from '../daos/FeatureDao';
import { DefaultFeatureDao } from '../daos/DefaultFeatureDao'


const featureDao = new FeatureDao();
const defaultFeatureDao = new DefaultFeatureDao();

export class DefaultFeatureService {

    public saveDefaultFeature(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        // UserEntity.project_id = projectId;
        let count = 1;
        defaultFeatureDao.getDefaultFeature((response) => {
            console.log('response for default tabvle ---- ', response);
            if (response) {
                response.forEach(async element => {
                    console.log(" - - - - - -  -  > > >  ", element)
                     delete element.__v;
                     var defaultObj = {
                         name: element.name,
                         description: element.description,
                         project: projectId,
                         is_default: true,
                         field: element.field
                     }
                    console.log('each element in default object ---- ', element);
                    featureDao.saveFeatures(defaultObj, (createdEntity) => {
                        if (count === response.length) {
                            callback(createdEntity);
                        }
                        count++;
                    })
                })
            }
        })
        
    }

}