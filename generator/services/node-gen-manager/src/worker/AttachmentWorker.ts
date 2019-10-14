import * as util from 'util';
import { AttachmentSupportWorker } from '../supportworker/AttachmentSupportWorker';
import * as path from 'path';

var fs = require("fs-extra");

let attachmentSupportWorker = new AttachmentSupportWorker();

export class AttachmentWorker {

    public generationPath: String;
    public templatePath: String;
    public pGenerationPath: String;

 
    generateAttachment(attachmentObj, callback) {
        const findPath = attachmentObj.projectGenerationPath.indexOf('/custom_services');
        this.pGenerationPath = attachmentObj.projectGenerationPath.slice(0, findPath);
        const attachmentPath = path.resolve(__dirname, `${attachmentObj.seedPath}/attachment`);
        fs.copy(attachmentPath, `${this.pGenerationPath}/custom_services/${attachmentObj.folder}`, async (err) => {
            if (err) {
                return console.error(err)
            } else {
                await this.generateAttachmentFile(attachmentObj)
                callback('Attachment manager generated and saved')
            }
        });
    }

    generateAttachmentFile(attachmentObj) {
        this.generationPath =`${this.pGenerationPath}/custom_services` ;
        this.templatePath = attachmentObj.templateLocation;
        attachmentSupportWorker.generateAttachmentFile(this.generationPath, this.templatePath, attachmentObj, (response) => {
            console.log('Attachment file generated and saved')
        });
    }

}