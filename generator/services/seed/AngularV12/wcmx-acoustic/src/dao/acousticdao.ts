import { AcousticEndPointService } from '../config/constants';

const requestpromise = require('request-promise');
const request = require('request');

export class AcousticDao {

    public acousticsite(callback) {
        let options = {
            method: 'Get',
            uri: `${AcousticEndPointService.AcousticEndPoint}/authoring/v1/sites`,
            json: true,
            auth: {
                'user':`${AcousticEndPointService.AcousticUsername}`,
                'pass':`${AcousticEndPointService.AcousticPassword}`
            }
        }
        let sitearray;
        requestpromise(options).then((acousticsite) => {
            sitearray = acousticsite.items;
            callback(null, sitearray);
        }).catch((siteerror) => {
            console.error('----acoustic site error---', siteerror.message);
            callback(siteerror, null);
        })
    }

    public acousticpagebysiteid(site_id,callback){
        let options = {
            method: 'Get',
            uri: `${AcousticEndPointService.AcousticEndPoint}/authoring/v1/sites/${site_id}/pages`,
            json: true,
            auth: {
                'user':`${AcousticEndPointService.AcousticUsername}`,
                'pass':`${AcousticEndPointService.AcousticPassword}`
            }
        }
        let pagearray;
        requestpromise(options).then((pagedetails)=>{
            pagearray = pagedetails.items;
            callback(null,pagearray);
        }).catch((pageerror)=>{
            console.error('----acoustic page error---', pageerror.message);
            callback(pageerror,null);
        })

    }

    public acousticcontentbyid(content_id,callback) {
        let options = {
            method: 'Get',
            uri: `${AcousticEndPointService.AcousticEndPoint}/authoring/v1/content/${content_id}?include=metadata&include=links`,
            json: true,
            auth:{
                'user':`${AcousticEndPointService.AcousticUsername}`,
                'pass':`${AcousticEndPointService.AcousticPassword}`
            }
        }
        let contentarray;
        requestpromise(options).then((acousticres) => {
            contentarray = acousticres.items;
            callback(null, contentarray);
        }).catch((error) => {
            console.error('----acoustic content error---', error.message);
            callback(error, null);
        })
    }

    public acoustic_deliverycontent_byid(content_id, callback) {
        let options = {
            method: 'Get',
            uri: `${AcousticEndPointService.AcousticEndPoint}/delivery/v1/content/${content_id}?include=metadata&include=links`,
            json: true,
            auth:{
                'user':`${AcousticEndPointService.AcousticUsername}`,
                'pass':`${AcousticEndPointService.AcousticPassword}`
            }
        }
        let deliverycontent_obj;
        requestpromise(options).then((contentres) => {
            deliverycontent_obj = contentres;
            callback(null, deliverycontent_obj);
        }).catch((error) => {
            console.error('------acoustic delivery content error----', error.message);
            callback(error, null);
        })
    }


    public acoustic_elementsections(bannerapi, callback) {
        let options = {
            method: 'Get',
            uri: `${AcousticEndPointService.AcousticDeliveryEndpoint}/${bannerapi}`,
            json: true,
            auth:{
                'user':`${AcousticEndPointService.AcousticUsername}`,
                'pass':`${AcousticEndPointService.AcousticPassword}`
            }
        }
        let elementobj;
        requestpromise(options).then((elementsectionres) => {
            elementobj = elementsectionres;
            callback(null, elementobj);
        }).catch((error) => {
            console.error('------element content error----', error);
            callback(error, null)
        })

    }


    public getlistofpagemenu(site_id, callback) {
        let options = {
            method: 'Get',
            uri: `${AcousticEndPointService.AcousticEndPoint}/authoring/v1/sites/${site_id}/pages`,
            json: true,
            auth: {
                'user': `${AcousticEndPointService.AcousticUsername}`,
                'pass': `${AcousticEndPointService.AcousticPassword}`
            }
        }
        requestpromise(options).then((sitepage) => {
            let sitepagearray = sitepage.items;
            callback(null, sitepagearray);
        }).catch((siteerror) => {
            console.error('----acoustic site error---', siteerror.message);
            callback(siteerror, null);
        })
    }

    getImages(url, callback) {    
        callback(request( AcousticEndPointService.AcousticDeliveryEndpoint + '/' + url));
    }
}