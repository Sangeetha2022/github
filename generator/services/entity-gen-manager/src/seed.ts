import * as mongoose from 'mongoose';
import { EntityTypeSchema } from './models/EntityType';
import { entityTypes } from './assets/entityTypes';

const entityTypeModel = mongoose.model('EntityType', EntityTypeSchema);

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

}