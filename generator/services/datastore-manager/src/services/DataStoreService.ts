import { Request } from 'mongoose';
import { MongoGenManagerService } from '../apiservices/MongoGenManagerService';

export class DataStoreService {

    mongoService = new MongoGenManagerService();

    public async createProject(req: Request, callback: CallableFunction) {
        const details = req.body;
      try {
        if(details.serverLanguage.name === 'Node.js' &&
        details.serverFramework.name === 'Express') {
            const mongo = await this.getMongo(details);
            callback(mongo);
        }
      } catch(error) {
          callback('Something went wrong in dataStore manager microservices');
      }
    }


    getMongo(details) {
        return new Promise(resolve => {
            this.mongoService.getMongo(details, (data) => {
                resolve(data);
            })
        })
    }

}