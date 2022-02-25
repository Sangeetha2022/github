// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  production: false,
  Port: ":3000",
  uploadPort: ":3015",
  BaseHost: 'http://' + window.location.hostname,
  UploadHost: 'http://' + window.location.hostname,
  logging:{
    level: NgxLoggerLevel.TRACE,
   serverLogLevel: NgxLoggerLevel.ERROR,
     // enableSourceMaps: true,
  // serverLoggingUrl:'http://localhost:3004/logEntry/create'

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
