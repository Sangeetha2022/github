import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';
export class AttachmentSupportWorker {
    generateAttachmentFile(generationPath, templatePath, attachmentObj, callback) {
        let attachData = attachmentObj.gpAttachDetails[0].gpattach
        const attachmentFilePath = path.resolve( __dirname,`${generationPath}/${attachmentObj.folder}/src/fileUpload`);
        const attachmentTemplatePath = path.resolve(__dirname, templatePath+'/attachment');
        Common.createFolders(attachmentFilePath);
        let generateService = st.loadGroup(require(attachmentTemplatePath + '/attachment_stg'));
        let attachmentFile = generateService.render("attachment", [attachData]);
        fs.writeFile(attachmentFilePath + `/${attachmentObj.file.trim()}.ts`, attachmentFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }

}