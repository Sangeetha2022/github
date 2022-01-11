import { AttachmentDao } from '../daos/attachment.dao';
import * as path from 'path';
import * as mime from 'mime';
import * as fs from 'fs';
let attachmentDao = new AttachmentDao()

export class AttachmentService {

    public uploadFile(files, callback) {
        let fileArray = [];
        files.map(fileData => {
            console.log(fileData)
            var filename = fileData.path.substring(fileData.path.lastIndexOf("/") + 1, fileData.path.length);
            var fileToUpload = {
                fileName: filename,
                originalFilename: fileData.originalname,
                contentType: fileData.mimetype,
                location: fileData.path
            }
            fileArray.push(fileToUpload);
        })
        if (fileArray.length > 0) {
            attachmentDao.uploadFile(fileArray, (file) => {
                callback(file)
            })
        }
    }

    public getUploadFile(req, callback) {
        let fileId = req.params.id;
        attachmentDao.getUploadFile(fileId, (file) => {
            var filePath = file.location;
            file.location = path.join(__dirname, `../../${filePath}`);
            callback(file)

        });
    }

    public deleteFileById(req, callback) {
        let fileId = req.params.id;
        attachmentDao.deleteFileById(fileId, (file) => {
            var filePath = file.location;
            file.location = path.join(__dirname, `../../${filePath}`);
            fs.unlinkSync(file.location)
            callback({ message: 'file removed successfully' })

        });
    }

    public getAllFile(callback) {
        attachmentDao.getAllFile((file) => {
            callback(file)

        });
    }

}
