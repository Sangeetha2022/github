import * as fs from 'fs';

export class AssetSupportWorker {
    public async generateStaticFile(applicationPath, templatePath, fileName) {
        await fs.readFile(`${templatePath}/${fileName}`, (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }
}