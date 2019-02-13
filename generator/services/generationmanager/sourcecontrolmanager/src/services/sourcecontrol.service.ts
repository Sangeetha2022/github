import { Request } from 'express';
import SourceControlDto from '../dto/sourcecontrol.dto';

export class SourceControlService {

    public deployCodeToRepository(req: Request, callback: CallableFunction) {
        let sourceControlDto = new SourceControlDto()

        console.log("== = =  = = = =  = = =  > > > > > ", sourceControlDto)
        callback("data")
    }

}