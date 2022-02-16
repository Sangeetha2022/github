import * as mongoose from 'mongoose';
import gfcModel from '../models/gfc';
import { CustomLogger } from '../config/Logger'


export class gfcDao {
    private gfc = gfcModel;
    constructor() { }

    public async gepfeatureConfDelete(gfcId, callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfDelete');






        this.gfc.findByIdAndRemove(gfcId).then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfDelete');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public async gepfeatureConfGetAllValues(callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfGetAllValues');






        this.gfc.find().then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfGetAllValues');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public async gepfeatureConfCreate(gfcData, callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfCreate');

        let temp = new gfcModel(gfcData);




        temp.save().then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfCreate');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public async gepfeatureConfUpdate(gfcData, callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfUpdate');






        this.gfc.findOneAndUpdate({ _id: gfcData._id }, gfcData, { new: true }).then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfUpdate');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public async gepfeatureConfSearch(gfcData, callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfSearch');

        let andkey; let and_obj = {}; let orkey; let or_obj = {};;



        Object.entries(gfcData).forEach(
            ([key, value]) => {
                if (value !== '') {
                    andkey = key;
                    and_obj[andkey] = value;
                }
                else {
                    orkey = key;
                    or_obj[orkey] = { $ne: '' }
                }
            }
        );;
        this.gfc.find({
            $and: [
                {
                    $or: [
                        or_obj
                    ]
                },
                and_obj
            ]
        }).then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfSearch');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public async gepfeatureConfSearchForUpdate(gfcData, callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfSearchForUpdate');






        this.gfc.findOneAndUpdate({ _id: gfcData._id }, gfcData, { new: true }).then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfSearchForUpdate');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public async gepfeatureConfGetNounById(gfcId, callback) {

        new CustomLogger().showLogger('info', 'Enter into gfcDao.ts: gepfeatureConfGetNounById');






        this.gfc.findById(gfcId).then((result) => {

            new CustomLogger().showLogger('info', 'Exit from gfcDao.ts: gepfeatureConfGetNounById');

            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }


}