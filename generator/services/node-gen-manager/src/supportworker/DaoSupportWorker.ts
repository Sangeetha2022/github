import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class DaoSupportWorker {



    generateDaoFile(generationPath, templatePath, daoData, callback) {
        const daoPath = path.join(__dirname, `${generationPath}/src/dao`)
        const daoTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(daoPath);
        let generateDao = st.loadGroup(require(daoTemplatePath + '/dao_stg'));
        let daoFile = generateDao.render("dao", [daoData]);
        fs.writeFile(daoPath + `/${daoData.entityFileName.trim()}Dao.ts`, daoFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }

    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}