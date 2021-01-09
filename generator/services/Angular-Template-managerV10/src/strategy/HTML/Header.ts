import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { SideNav } from './SideNav';
import { Constant } from '../../config/Constant';

const sideNav = new SideNav();
export class Header {
    public generateHeaderComponent(gjCcomponents: Array<Object>, menuList, callback) {
        this.generateHeaderHtml(gjCcomponents, menuList, (res, err) => {

        });
    }
    private generateHeaderHtml(gjCcomponents: Array<Object>, menuList, callback) {
        try {
            let headerObject: any = {}
            gjCcomponents.forEach((gjCcomponent: any) => {
                headerObject.tagName = this.tagNameFunction(gjCcomponent);
                headerObject.classNames = this.setClassName(gjCcomponent);
                headerObject.attributes = this.setAttributes(gjCcomponent);
                const content = this.setContent(gjCcomponent);
                if (content) {
                    gjCcomponent.content = content;
                }
                headerObject.components = [];
                if (gjCcomponent.components && gjCcomponent.components.length > 0) {
                    gjCcomponent.components.forEach((componentElement1: any) => {
                        let componentObj1: any = {};
                        componentObj1.tagName = this.tagNameFunction(componentElement1);
                        componentObj1.classNames = this.setClassName(componentElement1);
                        componentObj1.attributes = this.setAttributes(componentElement1);
                        const content = this.setContent(componentElement1);
                        if (content) {
                            componentObj1.content = content;
                        }
                        componentObj1.components = [];
                        if (componentElement1.components && componentElement1.components.length > 0) {
                            componentElement1.components.forEach((componentElement2: any) => {
                                let componentObj2: any = {};
                                componentObj2.tagName = this.tagNameFunction(componentElement2);
                                componentObj2.classNames = this.setClassName(componentElement2);
                                componentObj2.attributes = this.setAttributes(componentElement2);
                                const content = this.setContent(componentElement2);
                                if (content) {
                                    componentObj2.content = content;
                                }
                                componentObj2.components = [];
                                if (componentElement2.components && componentElement2.components.length > 0) {
                                    componentElement2.components.forEach((componentElement3: any) => {
                                        let componentObj3: any = {};
                                        componentObj3.tagName = this.tagNameFunction(componentElement3);
                                        componentObj3.classNames = this.setClassName(componentElement3);
                                        componentObj3.attributes = this.setAttributes(componentElement3);
                                        const content = this.setContent(componentElement3);
                                        if (content) {
                                            componentObj3.content = content;
                                        }
                                        componentObj3.components = [];
                                        if (componentElement3.components && componentElement3.components.length > 0) {
                                            componentElement3.components.forEach((componentElement4: any) => {
                                                let componentObj4: any = {};
                                                componentObj4.tagName = this.tagNameFunction(componentElement4);
                                                componentObj4.classNames = this.setClassName(componentElement4);
                                                componentObj4.attributes = this.setAttributes(componentElement4);
                                                const content = this.setContent(componentElement4);
                                                if (content) {
                                                    componentObj4.content = content;
                                                }
                                                componentObj3.components.push(componentObj4);
                                            });
                                        }
                                        componentObj2.components.push(componentObj3);
                                    });
                                }
                                componentObj1.components.push(componentObj2);
                            });
                        }
                        headerObject.components.push(componentObj1);
                    });
                }
            });
            console.log('headerObject---->>>>', JSON.stringify(headerObject));
            const templatePath = path.resolve(__dirname, './template/TemplateHeader.handlebars');
            this.handleBarsFile(templatePath, headerObject, (handlebarsRes, handlebarsErr) => {
                if (!handlebarsErr) {
                    console.log('handlebarsRes--->>>>', handlebarsRes);
                    if (handlebarsRes.includes('<div id="MainMenu">')) {
                        // Call the sidenav generate function
                        const sideNavHtml = sideNav.generateSideNav(menuList);
                        const handlebarsResArray = handlebarsRes.split('\n');
                        for (let i = 0; i < handlebarsResArray.length; i++) {
                            if (handlebarsResArray[i].includes('<div id="MainMenu">')) {
                                handlebarsResArray.splice(i + 1, 0, '\t\t' + sideNavHtml);
                                break;
                            }
                        }
                        for (let i = 0; i < handlebarsResArray.length; i++) {
                            if (handlebarsResArray[i].includes('</nav>')) {
                                handlebarsResArray.splice(i + 1, 0, Constant.HTML_TAG);
                                break;
                            }
                        }
                        const final = handlebarsResArray.join('\n');
                        console.log('finalHtml---->>>>>', final);
                    }
                }

            });
        } catch (error) {
            callback(null, error);
        }
    }
    /**
     * 
     * @param firstEle
     * Find the tag name
     */
    tagNameFunction(firstEle) {
        let tagName = '';
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
    /**
     * 
     * @param firstEle 
     * construct class names
     */
    setClassName(firstEle) {
        let temp = '';
        if (firstEle.classes && firstEle.classes.length > 0) {
            firstEle.classes.forEach((element: any, index: number) => {
                temp += element.name
                if (firstEle.classes.length - 1 !== index) {
                    temp += ' ';
                }
            });
        }
        return temp;
    }

    /**
     * 
     * @param firstEle 
     * Set id
     */
    setAttributes(firstEle) {
        let attributes: any = {};
        if (firstEle.attributes) {
            const keys = Object.keys(firstEle.attributes);
            if (keys.length > 0) {
                attributes = firstEle.attributes;
            }
        }
        return attributes;
    }
    /**
     * set content
     */
    setContent(firstEle) {
        if (firstEle.content) {
            return firstEle.content;
        } else {
            return null;
        }
    }

    handleBarsFile(filePath, fileData, callback) {
        try {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
                    switch (operator) {
                        case "==":
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);

                        case "!=":
                            return (v1 != v2) ? options.fn(this) : options.inverse(this);

                        case "===":
                            return (v1 === v2) ? options.fn(this) : options.inverse(this);

                        case "!==":
                            return (v1 !== v2) ? options.fn(this) : options.inverse(this);

                        case "&&":
                            return (v1 && v2) ? options.fn(this) : options.inverse(this);

                        case "||":
                            return (v1 || v2) ? options.fn(this) : options.inverse(this);

                        case "<":
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);

                        case "<=":
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);

                        case ">":
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);

                        case ">=":
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        default:
                            return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
                    }
                });
                if (data) {
                    const source = data;
                    const template = Handlebars.compile(source);
                    const result = template(fileData);
                    callback(result, null);
                }
            });
        } catch (error) {
            callback(null, error);
        }
    }
}