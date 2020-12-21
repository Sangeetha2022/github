import * as mongoose from 'mongoose';
import { DefaultScreen } from '../models/Defaultscreen';
import { ScreenDao } from '../daos/ScreenDao';

const defaultscreen = mongoose.model('Default_screen', DefaultScreen);
let screenobject = [{
    'gjs-assets': '',
    'gjs-css': '',
    'gjs-styles': '',
    'gjs-html': '',
    'gjs-components': '',
    'grid_fields': '',
    'flows_info': '',
    'screenName': '',
    'is_grid_present': '',
    'is_bootStrapTable_present': '',
    'entity_info': '',
    'screenType': '',
    'project': ''
}];
let screendao = new ScreenDao();
export class DefaultScreendao {

    public getdefaultscreen(projectId, callback) {
        defaultscreen.find({}, { _id: false, versionkey: false }).then(response => {
            screenobject['gjs-assets'] = response[0]['gjs-assets'];
            screenobject['gjs-css'] = response[0]['gjs-css'];
            screenobject['gjs-styles'] = response[0]['gjs-styles'];
            screenobject['gjs-html'] = response[0]['gjs-html'];
            screenobject['gjs-components'] = response[0]['gjs-components'];
            screenobject['grid_fields'] = response[0].grid_fields;
            screenobject['flows_info'] = response[0].flows_info;
            screenobject['screenName'] = response[0].screenName;
            screenobject['is_grid_present'] = response[0].is_grid_present;
            screenobject['is_bootStrapTable_present'] = response[0].is_bootStrapTable_present;
            screenobject['entity_info'] = response[0].entity_info;
            screenobject['screenType'] = response[0].screenType;
            screenobject['project'] = projectId;
            screendao.createScreen(screenobject, (response) => {
                callback(response)
            })
        }).catch((error) => {
            console.log('------', error);
            callback(error);
        })
    }
}