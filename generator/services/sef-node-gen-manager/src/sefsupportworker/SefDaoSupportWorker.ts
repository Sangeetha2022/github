import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';
export class DaoSupportWorker {



    generateSefDaoFile(generationPath, templatePath, daoData, callback) {
        const daoPath =  `${generationPath}/src/dao`;
        const daoTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(daoPath);
        let generateDao = st.loadGroup(require(daoTemplatePath + '/dao_stg'));
        let daoFile = generateDao.render("dao", [daoData]);
        fs.writeFile(daoPath + `/${daoData.entityFileName.trim()}Dao.ts`, daoFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    };

}