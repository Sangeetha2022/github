// import * as fs from 'fs';
// import * as path from 'path';
// import * as st from 'stringtemplate-js';

// export class GcamSupportWorker {

//     public gcamConfig(gcamFolder, templatePath,projectName, callback) {
//         const configFolder = gcamFolder + `/src/config`;
//         let pathfile = path.resolve(__dirname, templatePath);
//         const generateModel = st.loadGroup(require(pathfile + '/gcam_stg'));
//         let modelData = generateModel.render("gcam");
//         if (!fs.existsSync(configFolder)) {
//             fs.mkdirSync(configFolder);
//         }

//         fs.writeFile(configFolder + `/gcamService.ts`, modelData, function (err) {
//             if (err) throw err;
//             callback('file generated');
//         })

//     }
// }