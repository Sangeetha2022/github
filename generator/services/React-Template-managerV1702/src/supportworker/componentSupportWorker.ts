import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { Common } from '../config/Common';

export class ComponentSupportWorker {
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
                const source = data;
                const template = Handlebars.compile(source);
                const result = template(fileData);
                Common.createFolders(screenGenerationPath);
                fs.writeFile(screenGenerationPath + `/${fileName}`, result, (response) => {
                    resolve(response);
                })
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

    tagNameFunction(firstEle) {
        let tagName = null;
        if (firstEle.hasOwnProperty('tagName')) {
            tagName = firstEle.tagName;
        }
        else if (firstEle.hasOwnProperty('type')) {
            if (firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
                (firstEle.type == 'label' || firstEle.type == 'section')) {
                tagName = firstEle.type;
            }
            else if (firstEle.type == 'tab' || firstEle.type == 'link') {
                tagName = 'a';
            }
            else if (firstEle.type == 'image') {
                tagName = 'img';
            }
            else {
                tagName = 'div';
            }
        }
        if (firstEle.type === 'header') {
            if (firstEle.tagName) {
                tagName = firstEle.tagName;
            }
            else {
                tagName = 'h1';
            }
        }
        else if (!tagName) {
            tagName = 'div';
        }
        return tagName;
    }
}