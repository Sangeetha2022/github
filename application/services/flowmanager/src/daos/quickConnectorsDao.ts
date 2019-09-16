
import * as  mongoose from 'mongoose';
import { connectorSchema } from '../models/Connectors'

const connector = mongoose.model('connectors', connectorSchema)

export class QuickConnectorsDao {

    public saveConnectors(data, callback) {
        let alldata = new connector(data);
        alldata.save().then((result) => {
            console.log('i am resut')
            callback(result);
        })
    }
}