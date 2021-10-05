import * as path from 'path';
import * as Handlebars from 'handlebars';

import { ComponentSupportWorker } from "../../supportworker/componentsupportworker/componentsupportworker";

const componentSupportWorker = new ComponentSupportWorker();
export class Link {
    public generateLink(formData, screenData, details, callback) {
        let handlesbarObject: any = {};
        handlesbarObject.class = formData.attributes && formData.attributes.id ? formData.attributes.id : '';
        handlesbarObject.name = formData.name ? formData.name : '';
        if (screenData.link_info && screenData.link_info.length > 0) {
            screenData.link_info.forEach((element) => {
                if (element.htmlId && element.htmlId === formData.attributes.id) {
                    handlesbarObject.attributes = element.internalURL && element.internalURL.screenName ? `[routerLink]="['/${element.internalURL.screenName}']"` : '';
                } if (element.htmlId && element.htmlId === formData.attributes.id && element.linkType === 'external') {
                    handlesbarObject.attributes = `[routerLink]="['/${element.externalURL}']"`;
                }
                if (element.paramArray && element.paramArray.length > 0 && element.htmlId && element.htmlId === formData.attributes.id) {
                    handlesbarObject.attributes = handlesbarObject.attributes + ` [queryParams]="{${element.paramArray[0].name}: ${element.paramArray[0].fieldName}}"`;
                } else if (element.paramArray && element.paramArray.length === 0 && element.htmlId && element.htmlId === formData.attributes.id) {
                    handlesbarObject.attributes = handlesbarObject.attributes + ` [queryParams]="{ }"`
                }
            });
        }
        handlesbarObject.content = formData.content ? formData.content : '';
        const templatePath = path.resolve(__dirname, './template/link.handlebars');
        componentSupportWorker.readFile(templatePath, (res, err) => {
            if (res) {
                const source = res;
                const template = Handlebars.compile(source);
                const result = template(handlesbarObject);
                callback(result);
            }
        });
    }
}