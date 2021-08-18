import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { Common } from '../../config/Common';

export class SefComponentSupportWorker {
    /**
     * 
     * @param filePath 
     * @param fileData 
     * @param screenGenerationPath 
     * @param fileName 
     * File Writing using Handlebars
     */
    public handleBarsFile(filePath, fileData, screenGenerationPath, fileName) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
                    switch (operator)
                    {
                        case "==":
                            return (v1==v2)?options.fn(this):options.inverse(this);
                
                        case "!=":
                            return (v1!=v2)?options.fn(this):options.inverse(this);
                
                        case "===":
                            return (v1===v2)?options.fn(this):options.inverse(this);
                
                        case "!==":
                            return (v1!==v2)?options.fn(this):options.inverse(this);
                
                        case "&&":
                            return (v1&&v2)?options.fn(this):options.inverse(this);
                
                        case "||":
                            return (v1||v2)?options.fn(this):options.inverse(this);
                
                        case "<":
                            return (v1<v2)?options.fn(this):options.inverse(this);
                
                        case "<=":
                            return (v1<=v2)?options.fn(this):options.inverse(this);
                
                        case ">":
                            return (v1>v2)?options.fn(this):options.inverse(this);
                
                        case ">=":
                         return (v1>=v2)?options.fn(this):options.inverse(this);
                
                        default:
                            return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
                    }
                });
                if(data) {
                    let source = data;
                    let template = Handlebars.compile(source);
                    let result = template(fileData);
                    Common.createFolders(screenGenerationPath);
                    fs.writeFile(screenGenerationPath + `/${fileName}`, result, (response) => {
                        resolve(response);
                    })
                }
            });
        })
    }

    public readFile(filePath: string, callback) {
        const file = fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) {
                callback(null, err);
            } else {
                callback(data, null);
            }
        });
    }
    public writeFile(filePath, data, callback) {
        fs.writeFile(filePath, data, (response) => {
            callback(response);
        })
    }
}