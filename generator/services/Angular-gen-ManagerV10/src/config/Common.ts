import * as fs from 'fs';
import * as Handlebars from 'handlebars';

export class Common {
    public static createFolders(path) {
        try {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path)
            }
        } catch (err) {
            console.log('error for createing into -----  ', err);
        }
    };
    public static readFile(filePath: string, callback) {
        const file = fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) {
                callback(null, err);
            } else {
                callback(data, null);
            }
        });
    }
    public static writeFile(filePath, data, callback) {
        fs.writeFile(filePath, data, (response) => {
            callback(response);
        })
    }
    /**
     * 
     * @param filePath 
     * @param fileData 
     * @param screenGenerationPath 
     * @param fileName 
     * File Writing using Handlebars
     */
    public static handleBarsFile(filePath, fileData, screenGenerationPath, fileName) {
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
                var source = data;
                var template = Handlebars.compile(source);
                var result = template(fileData);
                Common.createFolders(screenGenerationPath);
                fs.writeFile(screenGenerationPath + `/${fileName}`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}