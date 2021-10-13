import { Request, Response, NextFunction, response } from "express";
import { AttachmentController } from "../controllers/attachment.controller";
import { FileUpload } from "../fileUpload/fileUpload"
export class Routes {

    public attachmentController: AttachmentController = new AttachmentController()
    public fileUpload: FileUpload = new FileUpload();

    public routes(app): void {

        app.route('/health/project-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/file/upload').post(this.fileUpload.uploadFile);
        app.route('/file/getById/:id').get(this.attachmentController.getUploadFile);
        app.route('/file/deleteById/:id').delete(this.attachmentController.deleteFileById);
        app.route('/file/getallfile').get(this.attachmentController.getAllFile)


    }
}
