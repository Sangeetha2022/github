var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://gep-dev-telimetry.gep-dev-201902.svc.cluster.local:8200', token: 'vault-root-token' });
import * as mongoose from "mongoose";

export class MongoConfig {
    public mongoConfig(): void {
        vault.read('kv/kuberentes/database/mongo/connection').then((result) => {
            // live
            mongoose.connect(result.data.mongo_connection_string);
            // local
            // mongoose.connect(result.data.mongo_local_connection_string);
        })
    }
}