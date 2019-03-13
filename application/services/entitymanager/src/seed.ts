import * as mongoose from 'mongoose';
import { EntityTypeSchema } from './models/EntityType';
import { entityTypes } from './assets/entityTypes';
import { UserEntity } from './assets/UserEntity';
import { DefaultEntitySchema } from './models/DefaultEntity';

const entityTypeModel = mongoose.model('EntityType', EntityTypeSchema);
const defaultEntityModel = mongoose.model('Default_Entity', DefaultEntitySchema);

export class FeedSeedData {

    public EntityTypeData(): void {
        entityTypes.map(entityFieldType => {
            entityTypeModel.findOneAndUpdate({ typename: entityFieldType['typename'] },
                entityFieldType,
                { new: true },
                (err, data) => {
                    if (data === null) {
                        let entity = new entityTypeModel(entityFieldType);
                        entity.save();
                    }
                });
        });
    }

    public defaultEntityData(): void {
        defaultEntityModel.findOneAndUpdate({ name: UserEntity['name'] },
            UserEntity,
            { new: true },
            (err, data) => {
         if (data === null) {
            let defaultEntity = new defaultEntityModel(UserEntity);
            defaultEntity.save()
        }
    });
    }

}