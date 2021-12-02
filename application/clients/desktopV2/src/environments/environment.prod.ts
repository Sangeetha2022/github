import { NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  production: true,
  Port: "",
  BaseHost: 'https://stage-v2api.geppettosoftware.com',
  logging:{
    level: NgxLoggerLevel.TRACE,
   serverLogLevel: NgxLoggerLevel.ERROR,
     // enableSourceMaps: true,
  // serverLoggingUrl:'http://localhost:3004/logEntry/create'

  }
};
