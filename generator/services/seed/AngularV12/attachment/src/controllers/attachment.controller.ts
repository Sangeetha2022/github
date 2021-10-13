import { AttachmentService } from '../services/attachment.service';

let attachmentService = new AttachmentService()

export class AttachmentController {

    public getUploadFile(req, res) {
        attachmentService.getUploadFile(req, (file) => {
            res.status(200); // status for the response
            res.sendFile(file)
        })
    }


    public deleteFileById(req, res) {
        attachmentService.deleteFileById(req, (file) => {
            res.status(200); // status for the response
            res.json(file)
        })
    }

    public getAllFile(req, res) {
        attachmentService.getAllFile((file) => {
            res.status(200); // status for the response
            res.json(file);
        })
    }

}
