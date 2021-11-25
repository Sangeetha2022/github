import * as mongoose from 'mongoose';
import { AttachmentSchema } from '../models/attachment.model';

const Attachment = mongoose.model('attachment', AttachmentSchema);

export class AttachmentDao {

    public uploadFile(file, callback) {
        Attachment.create(file, (err, uploadedFile) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'File uploaded successfully' });
            }
        });
    }

    public getUploadFile(id, callback) {
        Attachment.findById(id, (err, file) => {
            if (err) {
                callback(err);
            } else {
                callback(file);
            }
        });
    }

    public deleteFileById(id, callback) {
        Attachment.findByIdAndRemove(id, (err, file) => {
            if (err) {
                callback(err);
            } else {
                callback(file);
            }
        });
    }

    public getAllFile(callback) {
        Attachment.find((err, file) => {
            if (err) {
                callback(err);
            } else {
                callback(file);
            }
        });
    }

}