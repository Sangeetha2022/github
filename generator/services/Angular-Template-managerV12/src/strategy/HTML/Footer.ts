import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentSupportWorker } from '../../supportworker/componentSupportWorker';
import { Constant } from '../../config/Constant';


const componentSupportWorker = new ComponentSupportWorker()


export class Footer {

    async footerHTMLGeneration(generationPath, gjCcomponents, callback) {
        let footerData: any = {}
        gjCcomponents.forEach(async (gjCcomponent: any) => {
            let headerObject: any = {}
            headerObject.tagName = this.tagNameFunction(gjCcomponent);
            headerObject.classNames = this.setClassName(gjCcomponent);
            headerObject.attributes = gjCcomponent.attributes;
            const content = this.setContent(gjCcomponent);
            if (content) {
                gjCcomponent.content = content;
            }
            headerObject.components = [];
            if (gjCcomponent.components && gjCcomponent.components.length > 0) {
                gjCcomponent.components.forEach(async (componentElement1: any) => {
                    let componentObj1: any = {};
                    componentObj1.tagName = this.tagNameFunction(componentElement1);
                    componentObj1.classNames = this.setClassName(componentElement1);
                    componentObj1.attributes = componentElement1.attributes;
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
                            componentObj2.attributes = componentElement1.attributes;
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
                                    componentObj3.attributes = componentElement3.attributes
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
                                            componentObj4.attributes = componentElement4.attributes
                                            const content = this.setContent(componentElement4);
                                            if (content) {
                                                componentObj4.content = content;
                                            }
                                            componentObj4.components = [];
                                            if (componentElement4.components && componentElement4.components.length > 0) {
                                                componentElement4.components.forEach((componentElement5: any) => {
                                                    let componentObj5: any = {};
                                                    componentObj5.tagName = this.tagNameFunction(componentElement5);
                                                    componentObj5.classNames = this.setClassName(componentElement5);
                                                    componentObj5.attributes = componentElement5.attributes
                                                    const content = this.setContent(componentElement5);
                                                    if (content) {
                                                        componentObj5.content = content;
                                                    }
                                                    componentObj4.components.push(componentObj5);
                                                });
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
                    footerData = headerObject
                });
            }

        });
        let templatePath = path.resolve(__dirname, './template');
        let screenPath = generationPath + `/${Constant.SRC_FOLDERNAME}` + `/${Constant.FOOTER_FOLDERNAME}`
        let filePath = templatePath + `/Template.Footer`;
        await componentSupportWorker.handleBarsFile(filePath, footerData, screenPath, "footer.component.html");
        callback("Footer Html file generated")
    }

    /**
      * 
      * @param firstEle
      * Find the tag name
      */
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
     * set content
     */
    setContent(firstEle) {
        if (firstEle.content) {
            return firstEle.content;
        } else {
            return null;
        }
    }

}