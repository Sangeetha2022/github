import { Request } from 'express';
import { FrontendWorker } from '../worker/frontendWorker';

export class AdminFrontendServcie {

    frontendWorker = new FrontendWorker();

    public seedPath: any;
    public adminGenerateUi: any;
    public adminTemplatePath: any;
  
    public adminFrontend(req: Request, callback: CallableFunction) {
        console.log('req----tempalte-->>', req.body);
        const details = req.body;
        this.frontendWorker.createAdminComponent(details, async (response) => {
            await this.frontendWorker.modifyFiles();
            console.log('22222222222222---------');
            callback();
        });

    }


}