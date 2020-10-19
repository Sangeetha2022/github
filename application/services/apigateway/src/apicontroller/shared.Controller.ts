import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";
import { Constants } from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';

const fs = require("fs");
const multiparty = require("multiparty");

class SharedController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/shared/getbyproject/:id').get(this.getSharedByProjectId);
        this.router.route('/shared/details').post(this.create)
        this.router.route('/shared/upload/:id').post(this.importProject)
    }


    public async getSharedByProjectId(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdaptar().get(`${Constants.sharedUrl}/shared/getbyproject/` + req.params.id));
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdaptar().post(`${Constants.sharedUrl}/shared/details`, req.body));
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async importProject(req: Request, res: Response) {

        let form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log('err----------', err)
            console.log('fileds-----------', fields)
            console.log('file-----------------', files)
        });

        form.on('file', async (name, file) => {
            let formData = {
                file: {
                    value: fs.createReadStream(file.path),
                    options: {
                        filename: file.originalFilename
                    }
                }
            }
            // console.log("req.headers----apigateway", req.headers);
            try {
                let response = await Promise.resolve(new ApiAdaptar().FileUploadPost(`${Constants.sharedUrl}/shared/upload/` + req.params.id, formData));
                req.baseUrl === '/mobile' ? res.send(response) :
                    req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
            } catch (err) {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            }
        })

    }

}
export { SharedController };