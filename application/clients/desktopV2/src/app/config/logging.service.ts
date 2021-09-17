import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(public logger:NGXLogger) { }
  log(level:string ,message:string) {
    switch (level) {
      case 'log' : {
        this.logger.log(message);
        break;
      }
      case 'debug' : {
        this.logger.debug(message);
        break;
      }
      case 'warning' : {
        this.logger.warn(message);
        break;
      }
      case 'info' : {
        this.logger.info(message);
        break;
      }
      case 'trace' : {
       this.logger.trace(message);
       break;
     }
      case 'error' : {
        this.logger.error(message);
        break;
      }
    }
  }
}
