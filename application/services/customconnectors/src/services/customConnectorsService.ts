import { Request } from 'express'
import { CustomConnectorsDao } from '../daos/customConnectorsDao'

let customConnectorsDao: CustomConnectorsDao = new CustomConnectorsDao();

export class CustomConnectorsService {

    public quickTestcustomConnectors(req: Request, callback: CallableFunction) {
        const data = req.body;
        customConnectorsDao.quickTestcustomConnectors(data, (response) => {
            callback(response)
        })

    }
}