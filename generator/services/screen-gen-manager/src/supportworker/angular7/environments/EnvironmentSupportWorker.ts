import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';


export class EnvironmentSupportWorker {


    generateEnvironmentFile(path, callback) {
        // if (!fs.existsSync(environmentPath)) {
        //     fs.mkdirSync(environmentPath)
        // }

          // generate environment.ts files
          var environmentStg = st.loadGroup(require(path.source + '/environment_ts_stg'));
          var environmentConf = environmentStg.render("environment_ts");
          fs.writeFile(path.destination + '/environment.ts', environmentConf, function (err) {
              if (err) throw err;
              console.log('environment.ts file saved!!')
          })
          // generate environment.prod.ts files
          var environmentProdStg = st.loadGroup(require(path.source + '/environment_prod_ts_stg'));
          var environmentProdConf = environmentProdStg.render("environment_prod_ts");
          fs.writeFile(path.destination + '/environment.prod.ts', environmentProdConf, function (err) {
              if (err) throw err;
              console.log('environment.prod.ts file saved!!')
              callback('environment folder generated')
          })
    }
}