import * as fs from "fs";
import { CustomLogger } from "../config/Logger";

export class AttachmentToFileSystem {


    public fileSaveToSystem(data, fileKey) {
        return new Promise((resolve, reject) => {
            new CustomLogger().showLogger("info", "Enter into attachmentToFileSystem.ts: fileSaveToSystem");
            console.log("Error on File Save",data);
            var datas = JSON.stringify(data);
            fs.writeFile(fileKey, datas, function (err) {
                if (err) {
                    return console.log("Error on File Save",err);
                }
                console.log("The file was saved!");
            });

            new CustomLogger().showLogger('info', 'Exit from attachmentToFileSystem.ts: fileSaveToSystem');
        });

    }

    public async deleteAttachment(fileKey,callback) {
        new CustomLogger().showLogger("info", "Enter into attachmentToFileSystem.ts: deleteAttachment");
        fs.unlink(fileKey, function (err) {
            if (err)
            {
                callback(err);
            } 
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
        new CustomLogger().showLogger('info', 'Exit from attachmentToFileSystem.ts: deleteAttachment');
    }

    public fileDownload(fileKey,res, callback) {
        new CustomLogger().showLogger("info", "Enter into attachmentToS3Dao.ts: fileDownloadFromS3");
        res.download(fileKey); // Set disposition and send it.

        new CustomLogger().showLogger("info", "Exit into attachmentToS3Dao.ts: fileDownloadFromS3");
    }


}
