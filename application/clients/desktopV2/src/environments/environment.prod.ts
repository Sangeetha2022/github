import { NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  production: true,
  Port: ":3000",
  BaseHost: 'http://' + window.location.hostname,
  logging:{
    level: NgxLoggerLevel.TRACE,
   serverLogLevel: NgxLoggerLevel.ERROR,
     // enableSourceMaps: true,
  // serverLoggingUrl:'http://localhost:3004/logEntry/create'

  }
};
