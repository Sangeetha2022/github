
import { CustomLogger } from '../config/Logger'
import * as dotenv from 'dotenv';


dotenv.config();
let vaultOptions = {
    apiVersion: 'v1',
    endpoint: `${process.env.VAULT_PORT}`
};

var vault = require("node-vault")(vaultOptions);
vault.token = `${process.env.VAULT_TOKEN}`;
export class systemCredentialsManagerVaultDao {
vault: any;

    constructor() {
       
    }
    public GpVaultGetAll(callback) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerVaultDao.ts: GpReadAll')
        vault.list('kv/kubernetes/sourcecode').then((data) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerVaultDao.ts: GpReadAll');
        callback(data);
        }).catch((error) => {
        callback(error);
        });
    }

    public GpVaultCreate(data, callback) {
        const temp = data.credentials.userName;
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerVaultDao.ts: GpCreate')
        vault.write(`kv/kubernetes/sourcecode/${temp}`, data.credentials).then((data) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerVaultDao.ts: GpCreate');
        callback(data);
        }).catch((error) => {
        callback(error);
        });
    }


    public GpVaultUpdate(data, callback) {
        const temp = data.credentials.userName;
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerVaultDao.ts: GpUpdate')
        vault.put(`kv/kubernetes/sourcecode/${temp}`, data.credentials).then((data) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerVaultDao.ts: GpUpdate');
        callback(data);
        }).catch((error) => {
        callback(error);
        });
    }

    public GpVaultGet(id, callback) {
        const temp = id;
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerVaultDao.ts: GpRead')
        vault.read(`kv/kubernetes/sourcecode/${temp}`, id).then((data) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerVaultDao.ts: GpRead');
        callback(data);
        }).catch((error) => {
        callback(error);
        });
    }


    public GpVaultDelete(id, callback) {
        const temp = id;
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerVaultDao.ts: GpDelete')
        vault.delete(`kv/kubernetes/sourcecode/${temp}`, id).then((data) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerVaultDao.ts: GpDelete');
        callback(data);
        }).catch((error) => {
        callback(error);
        });
    }










}