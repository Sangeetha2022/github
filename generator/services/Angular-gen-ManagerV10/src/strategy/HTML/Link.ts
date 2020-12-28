export class Link {
    public generateLink(formData, screenData, details, callback) {
        let aTag = "<a ";
        aTag = formData.attributes && formData.attributes.id ? `${aTag}class = "${formData.attributes.id}" ` : `${aTag}class = "" `;
        aTag = formData.name ? `${aTag}name = "${formData.name}" ` : `${aTag}name = "" `;
        if (screenData.link_info && screenData.link_info.length > 0) {
            screenData.link_info.forEach((element) => {
                if (element.htmlId && element.htmlId === formData.attributes.id) {
                    aTag = element.internalURL && element.internalURL.screenName ? `${aTag}[routerLink]="['/${element.internalURL.screenName}']" ` : aTag;
                } if(element.htmlId && element.htmlId === formData.attributes.id && element.linkType === 'external') {
                    aTag = `${aTag}[routerLink]="['/${element.externalURL}']" `;
                }
                if (element.paramArray && element.paramArray.length > 0 && element.htmlId && element.htmlId === formData.attributes.id) {
                    aTag = `${aTag}[queryParams]="{${element.paramArray[0].name}: ${element.paramArray[0].fieldName}"}`;
                } else if (element.paramArray && element.paramArray.length === 0 && element.htmlId && element.htmlId === formData.attributes.id) {
                    aTag = `${aTag}[queryParams]="{ }"`;
                }
            });
        }
        aTag = aTag + '>';
        aTag = formData.content ? `${aTag}${formData.content}` : aTag;
        aTag = aTag + '</a>';
        callback(aTag);
    }
}