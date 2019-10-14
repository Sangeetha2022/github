attachment(object) ::=  <<

import * as multer from 'multer';
import * as nanoid from 'nanoid/generate';
import { AttachmentService } from '../services/attachment.service';
const uploadFilter = function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    // if (extension === 'html') {
    //     return cb(new Error('file type not allow to upload'));
    // }
    cb(null, true);
    // filter rules here
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        $if(object.location)$$object.location:{location | cb(null, '$location$')}$$endif$ 
    },
    filename: function (req, file, cb) {
        const unique = nanoid('0123456789', 8)
        cb(null, unique.concat(`.\${file.originalname}`))
    }
})

var upload = multer({ storage: storage, fileFilter: uploadFilter }).array('file', $if(object.count)$$object.count:{count | $count$}$$endif$);


export class FileUpload {

    public uploadFile(req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    res.status(400);
                    res.send({ message: 'File Upload Limit Exceed' })
                } else if (err.code === 'LIMIT_FILE_SIZE') {
                    res.status(400);
                    res.send({ message: 'File Size is Too Large' })
                }
            } else if (err) {
                console.log(err)
                res.status(501).json({ error: err });
            } else {
                res.status(200);
                if (req.files) {
                    new AttachmentService().uploadFile(req.files, file => {
                        res.json(file);
                    })
                }
            }
        });

    }

}

>> 