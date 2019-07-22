import * as fs from 'fs';

export class AssetSupportWorker {
    public async generateStaticFile(applicationPath, templatePath, fileName) {
        console.log('generate static file applicationPath =-----  ', applicationPath);
        console.log('generate static file templatePath =-----  ', templatePath);
        console.log('generate static file fileName =-----  ', fileName);
        await fs.readFile(`${templatePath}/${fileName}`, (err, result) => {
            console.log('read file errror are ----- ', err);
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }
}