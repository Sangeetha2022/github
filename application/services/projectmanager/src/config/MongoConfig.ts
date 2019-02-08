var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'VAULT_API', token: 'vault-root-token'});  
import * as mongoose from "mongoose";

export class MongoConfig {
    public mongoConfig(): void {
        vault.read('kv/kuberentes/database/mongo/connection').then((result) => {
            mongoose.connect(result.data.mongo_connection_string);
        })
    }
}