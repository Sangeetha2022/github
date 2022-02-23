import { Request, response } from 'express';
import { AttachmentToS3Dao } from '../dao/attachmentToS3Dao';
import { AttachmentToDBDao } from '../dao/attachmentToDBDao';
import { CustomLogger } from '../config/Logger';
import * as Busboy from 'busboy';
import { uuid, fromString } from 'uuidv4';
import { AttachmentToFileSystem } from '../dao/attachmentToFileSystem';

let attachmentToS3Dao = new AttachmentToS3Dao();
let attachmentToDBDao = new AttachmentToDBDao();
let attachmentToFileSystem = new AttachmentToFileSystem();
export class AttachmentService {

    public addAttachment(req, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: addAttachment');
        var busboy = new Busboy({ headers: req.headers });
        const id = uuid();
        var fileKey;
        var s3URL;
        var fileName;

        busboy.on('file', function (fieldname, file, filename) {
            console.log('inside busboy file');
            let resource = `${process.env.DB_RESOURCE}`;
            resource = 'FS';
            fileName=id+"_"+filename;
            file.on('data', async function (data) {
                let originalFileData = JSON.parse(data.toString());
                let dataObject = JSON.parse(data.toString());
                dataObject.item.map((data, index) => {
                    if(data.request.auth !== undefined && data.request.auth[data.request.auth.type] !== undefined) {
                        data.request.auth[data.request.auth.type].map((data, index) => {
                            data.value = "";
                        })
                    } else {
                    }
                })
                if (resource === 'S3') {
                    console.log('inside busboy data');
                    fileKey = "task_attachments/" + fileName;
                    console.log("file key---", fileKey);
                    s3URL = "https://projectmonk.s3.amazonaws.com/" + fileKey;
                    let temp = await attachmentToS3Dao.fileUploadToS3(data, fileKey);
                }
                // else if (resource === 'FS') {
                //     attachmentToFileSystem.fileSaveToSystem(dataObject, fileName);
                // }

                attachmentToDBDao.addAttachment("", dataObject, fileName, async (response: any) => {
                    let resObject = {
                        resp: response,
                        originalFileData: originalFileData
                    }
                    new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: addAttachment');
                    callback(resObject);
                });
            });
        });
        busboy.on('finish', function () {
            // attachmentToDBDao.addAttachment("", data, fileName, (response) => {
            //     new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: addAttachment');
            //     callback(response);
            // });
        })
        req.pipe(busboy);
    }

    public deleteAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: deleteAttachment')
        var fileKey = req.query.fileKey;
        let resource = `${process.env.DB_RESOURCE}`;
        console.log("Service fileKey is :", fileKey);
        if (resource === 'FS') {
        attachmentToFileSystem.deleteAttachment(req, (error) => {
            if(error==null){
                attachmentToDBDao.deleteAttachment(fileKey, (response) => {
                    new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: deleteAttachment')
                    callback(response);
                });
            }
        });
        }
        else if (resource === 'S3') {
        attachmentToS3Dao.deleteAttachment(fileKey);
        attachmentToDBDao.deleteAttachment(fileKey, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: deleteAttachment')
            callback(response);
        });
        }
    }
    public downloadAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: downloadAttachment')
        var fileKey = req.query.fileKey;
        console.log("Service fileKey is :", fileKey);
        attachmentToS3Dao.fileDownloadFromS3(fileKey, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: downloadAttachment')
            callback(response);
        });
    }

    public getAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: getAttachment');
        console.log('req.body ', req.body);
        var fileIds = req.body;
        attachmentToDBDao.getAttachment(fileIds, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: getAttachment');
            callback(response);
        });
    }

    public UploadS3(req, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: uploads3services');
        let busboy = new Busboy({ headers: req.headers });
        const id = uuid();
        let fileKey, s3URL, fileName, mimeType, enCoding;
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            fileName = filename;
            mimeType = mimetype;
            enCoding = encoding;
            file.on('data', async(data) => {
                fileKey = "grapesjsimages/" + fileName;
                s3URL = "" + fileKey;
                let temp = await attachmentToS3Dao.grapejsUploadS3(data, fileKey, mimeType, enCoding);
                callback(temp);
            });
        });
        busboy.on('finish', function () {
        })
        req.pipe(busboy);
    }
}