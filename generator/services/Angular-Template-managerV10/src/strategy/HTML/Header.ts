export class Header {
    public generateHeader(gjCcomponents: Array<Object>, callback) {
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
                                // if (componentObj2.tagName === 'button') {
                                //     const buttonAttributes = this.setDataToggleAndDataTarget(componentElement2);
                                //     componentObj2.dataToggle = buttonAttributes.dataToggle;
                                //     componentObj2.dataTarget = buttonAttributes.dataTarget;
                                // }
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
            callback(headerObject, null);
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
    /**
     * 
     * @param firstEle 
     * set data-toggle and data-target
     */
    // setDataToggleAndDataTarget(firstEle) {
    //     let buttonAttributes = { dataToggle: '', dataTarget: '' }
    //     if (firstEle.hasOwnProperty('attributes') && firstEle.attributes.hasOwnProperty('data-toggle')) {
    //         buttonAttributes.dataToggle = firstEle.attributes['data-toggle'];
    //     }
    //     if (firstEle.hasOwnProperty('attributes') && firstEle.attributes.hasOwnProperty('data-target')) {
    //         buttonAttributes.dataTarget = firstEle.attributes['data-target'];
    //     }
    //     return buttonAttributes;
    // }
}