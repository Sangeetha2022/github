import * as util from 'util';
import * as asyncForEach from 'async-foreach';
// import { RouteSupportWorker } from '../supportworker/RouteSupportWorker';

// let routeSupportWorker = new RouteSupportWorker();
export class GenerateHtmlWorker {

    private forEach = asyncForEach.forEach;
    private firstEle: any = null;
    private secondEle: any[] = [];
    private startTag: any[] = [];
    private endTag: any[] = [];
    private tagName: String = null;
    private startString: String = '';
    private count: number = 0;
    private parentTest: any[] = [];
    private isNotImportant: Boolean = false;
    private isContentOnly: Boolean = false;
    private templateHeaderObj = {
        tag: [],
        component: {
            scriptVariable: [],
            componentOnInit: []
        },
        css: [],
        module: []
    }
    private templateMainObj = {
        tag: [],
        css: [],
        module: []
    }
    private templateFooterObj = {
        tag: [],
        css: [],
        module: []
    }

    // private HEADERNAME: String = 'header';
    // private FOOTERNAME: String = 'footer';
    // private TEMPLATENAME: String = 'template';

    private isTemplate: Boolean = false;

    private NAV_CLASS_NAME: String = 'list-group panel';
    private STATE_SUCCESS_CLASSNAME: String = 'state-success';
    private STATE_ERROR_CLASSNAME: String = 'state-error';
    private MAINMENU_ATTRIBUTE = 'MainMenu';
    private HREF_BASE = '/';
    private CHANGENAME: any = 'changename';
    private LOADHEADERNAV: any = 'loadnav';

    private navMenu: any[] = [];
    private scriptTag: any[] = [];
    private mainHtmlTag: any[] = [];

    // html tags
    private ANCHOR_TAG: String = 'a';
    private UNORDERED_TAG: String = 'ul';
    private LIST_TAG: String = 'li';

    // nav header
    private HOME_MENU = 'home';
    private ADMIN_MENU = 'admin';
    private LOGOUT_MENU = 'logout';

    // feature name
    private DEFAULT_FEATURENAME = 'default';

    //component variable
    private HEADER_ADMIN_VARIABLE = 'isAdminUser';

    createTemplateHtml(metaData, details) {
        this.startTag = [];
        this.endTag = [];
        this.mainHtmlTag = [];
        this.scriptTag = [];
        this.isTemplate = true;
        this.generateHtml(metaData);
        this.templateMainObj.tag = this.startTag;
        // this.TemplateTag = this.startTag;
        console.log('after completed all method in child startTag are   ', `${this.startTag.join(`\n`)}`);
        // console.log('after completed all method in child scriptTag are   ', `${this.startTag.join(`\n`)}`);
        // console.log('after completed all method in child templateTag are   ', `${this.startTag.join(`\n`)}`);
    }

    generateHtml(grapesJSMetadata) {
        this.forEach(grapesJSMetadata, (item, index, arr) => {
            let tempObj = { endTagName: null };
            if (index === 0) {
                this.firstEle = item;
            } else {
                this.parentTest.push(item);
            }
            this.tagName = this.tagNameFunction(item);
            // console.log('tagName for each iterate value are -parent----   ', this.tagName, ' --item.content--  ', item.content);
            if (item.type === 'textnode') {
                tempObj.endTagName = 'label';
                this.parentTest.push(tempObj);
            } else if (!this.tagName || this.tagName == 'div') {
                tempObj.endTagName = 'div';
                this.parentTest.push(tempObj);
            } else if (this.tagName == 'form') {
                tempObj.endTagName = 'form';
                this.parentTest.push(tempObj);
            } else if (this.tagName == 'section') {
                tempObj.endTagName = 'section';
                this.parentTest.push(tempObj);
            } else if (!item.content &&
                (this.tagName == 'nav' || this.tagName == 'header' || this.tagName == 'footer')) {
                tempObj.endTagName = this.tagName;
                this.parentTest.push(tempObj);
            }
            if (index === grapesJSMetadata.length - 1) {
                if (this.parentTest.length > 0) {
                    this.secondEle.unshift(this.parentTest);
                }
                this.generateChildHtml(this.firstEle, this.secondEle);
            }
        })
    }

    generateChildHtml(firstEle, secondEle) {
        // console.log(`firstElE -11--${this.count}-- `, firstEle);
        // console.log(`secondElE -22--${this.count}-- `, secondEle);
        this.tagName = '';
        this.startString = '';
        if (firstEle && firstEle.hasOwnProperty('endTagName')) {
            this.startTag.push(`</${firstEle.endTagName}>`);
            this.getNextValue(secondEle);
        } else if (firstEle) {
            this.tagName = this.tagNameFunction(firstEle);
            if (firstEle.type == 'textnode') {
                this.startTag.push(firstEle.content);
                // console.log('pushed ttextnode are ------------ ', this.startTag);
                this.getNextValue(secondEle);
            } else if (!this.tagName) {
                this.tagName = 'div';
            }
            this.isNotImportant = false;
            this.isContentOnly = false;
            // set html classes
            this.setClasses(firstEle, secondEle);
            // set html traits
            this.setTraits(firstEle);
            // set html attributes
            this.setAttributes(firstEle);
            // set html contents
            this.setContent(firstEle);
            // based on value push it into startTag and endTag
            this.pushValue(firstEle);
            // check if the current html contents child components or not if it
            this.childComponents(firstEle);
        }
    }

    setClasses(firstEle, secondEle) {
        if (firstEle.hasOwnProperty('classes')) {
            // console.log('firstEle classes are ---- ', firstEle.classes[0], ' ---firstELE classes length-- ', firstEle.classes.length);
            if (!firstEle.hasOwnProperty('tagName') && !this.tagName) {
                this.tagName = 'div';
            }
            const className = this.getClassName(firstEle);
            // console.log('set each classNmaes are -------- ', className);
            if (className) {
                if (className == this.STATE_SUCCESS_CLASSNAME || className == this.STATE_ERROR_CLASSNAME) {
                    this.isNotImportant = true;
                } else {
                    this.startString += `<${this.tagName} class='${className}'`
                }
            }
        }
    }

    getClassName(firstEle) {
        let temp = '';
        if (firstEle.classes && firstEle.classes.length > 0) {
            this.forEach(firstEle.classes, (item, index, arr) => {
                temp += `${item.name}`;
                if (firstEle.classes.length - 1 == index) {
                } else {
                    temp += ` `;
                }
            });
        }
        return temp;
    }

    setTraits(firstEle) {
        if (firstEle.hasOwnProperty('traits')) {
        }
    }

    setAttributes(firstEle) {
        if (firstEle.hasOwnProperty('attributes') && this.tagName !== 'form') {
            let attributes = Object.keys(firstEle.attributes);
            if (!this.startString) {
                this.startString += `<${this.tagName}`
            }
            attributes.forEach(element => {
                if (element === 'name' && firstEle.name) {
                    this.startString += ` ${element}='${firstEle.name}'`;
                } else {
                    if (this.tagName != 'base' && element === 'href' && firstEle.attributes[element] === this.HREF_BASE) {
                        this.startString += ` [routerLink]="['${firstEle.attributes[element]}']"`;
                    } else {
                        this.startString += ` ${element}='${firstEle.attributes[element]}'`;
                    }
                    // if (element === 'id' && firstEle.attributes[element] === this.MAINMENU_ATTRIBUTE) {
                    //     this.setNav(firstEle, this.secondEle);
                    // }
                }

            })
            if (this.tagName === 'input' || this.tagName === 'meta' || this.tagName === 'link') {
                this.startString += `/>`;
            } else {
                this.startString += `>`;
            }
        } else {
            if (this.startString) {
                this.startString += `>`;
            }
        }
    }

    setContent(firstEle) {
        if (firstEle.hasOwnProperty('content')) {
            // console.log('tagname of values rae ----- ', this.tagName, '  ---content---  ', firstEle.content);
            if (this.startString && firstEle.content) {
                // console.log('content startstring are -----test----  ', this.startTag);
                this.startString += `${firstEle.content}`;
            } else if (!this.startString && firstEle.type != 'textnode') {
                this.isContentOnly = true;
                this.startString += `<${this.tagName}>${firstEle.content}`;
                if (this.tagName == 'script' || this.tagName == 'title' ||
                    (firstEle.content &&
                        (this.tagName == 'p' || firstEle.type == 'header' ||
                            this.tagName == 'span' || this.tagName == 'div'))
                ) {
                    // console.log('set content of firstelement --tagname-- ', this.tagName)
                    this.startString += `</${this.tagName}>`
                }
                // this.startTag.push(this.startString);
                if (this.count < 10) {
                    // console.log('need to knsow ------------  ', this.startTag);
                }
                this.setTagValue();
                // if (this.tagName == 'title') {
                //     this.mainHtmlTag.push(`<base href="/" />`);
                // }
                // console.log('isContentOnly pushed values are ---item.content-- ', firstEle.content, '  --item.type---  ', firstEle.type);

            } else if (!firstEle.content && (this.tagName == 'button' || this.tagName == 'input')) {
                this.isContentOnly = true;
                this.setTagValue();
                // this.startTag.push(this.startString);
            } else {
                // if(this.count < 10) {
                //     console.log('need to knsow ------------  ', this.startTag);
                // }
                // this.startString = firstEle.content;
                // this.isContentOnly = true;
                // this.setTagValue(); 
            }
            // console.log('setContent vlaue of isContentOnly is ----  ', this.isContentOnly, ' --complete---  ', this.startTag);
        }
    }


    pushValue(firstEle) {
        if (this.tagName && this.tagName != 'option' && !this.isContentOnly && !this.isNotImportant) {
            // console.log('pushed value tagname are -------->>>   ', this.tagName, ' ---firstEle.content---- ', firstEle.content);
            if (this.startString && this.tagName != 'div' && this.tagName != 'form') {
                if (!firstEle.content && (this.tagName == 'label' || this.tagName == 'footer'
                    || this.tagName == 'section' || firstEle.type == 'header' || this.tagName == 'header'
                    || this.tagName == 'nav' || this.tagName == 'a' || this.tagName == 'svg' ||
                    this.tagName == 'p' || this.tagName == 'br' || this.tagName == 'meta' ||
                    this.tagName == 'link' || this.tagName == 'li' || this.tagName == 'ul' || this.tagName == 'g' ||
                    this.tagName == 'base' || this.tagName == 'span' || this.tagName == 'img' || this.tagName == 'h1' ||
                    this.tagName == 'h2' || this.tagName == 'h3' ||
                    this.tagName == 'h4' || this.tagName == 'h5' ||
                    this.tagName == 'h6' || this.tagName == 'hr')) {
                    this.endTag.unshift(`${this.tagName}`);
                    // console.log('@@@@@@@@@@ pushed vlaue are -----------   ', this.endTag);
                } else {
                    this.startString += `</${this.tagName}>`
                }
                // this.startTag.push(this.startString);
                this.setTagValue();
            } else if (this.startString && this.tagName == 'div' && firstEle.content) {
                this.startString += `</${this.tagName}>`;
                this.setTagValue();
            } else if (this.startString) {
                // this.startTag.push(this.startString);
                this.setTagValue();
            }
        }
    }

    setTagValue() {
        this.startTag.push(this.startString);
        // if (this.tagName == 'meta' || this.tagName == 'title' ||
        //     this.tagName == 'link' || this.tagName == 'base') {
        //     this.mainHtmlTag.push(this.startString);
        // } else if (this.tagName == 'script') {
        //     this.scriptTag.push(this.startString);
        // } else {
        //     this.startTag.push(this.startString);
        // }
    }

    childComponents(firstEle) {
        // console.log('entering into chiuld component ');
        if (firstEle.hasOwnProperty('components')) {
            // console.log(`child component firstELEM are ---${this.count}------   `, firstEle.components.length);
            if (typeof firstEle.components !== 'undefined' && firstEle.components.length === 0) {
                this.getNextValue(this.secondEle);
            }
            let firstTemp = null;
            var test = [];
            this.forEach(firstEle.components, (item, index, arr) => {
                // console.log('for each child component are --------  ', index, '  items   ', item);
                let tempObj = { endTagName: null };
                if (index === 0) {
                    firstTemp = item;
                } else {
                    test.push(item);
                }
                this.tagName = this.tagNameFunction(item);
                // console.log('before pushing the tagname in array ----  ', this.tagName, ' --item type---- ', item.type, ' ---item.content---  ', item.content);
                if (!item.classes || (item.classes && item.classes.length === 0) || (item.classes && item.classes.length > 0 && item.classes[0].name !== this.STATE_SUCCESS_CLASSNAME &&
                    item.classes[0].name !== this.STATE_ERROR_CLASSNAME)) {
                    if (!item.content && item.type === 'textnode') {
                        tempObj.endTagName = this.endTag.shift();
                        if (tempObj.endTagName) {
                            test.push(tempObj);
                            // console.log('if- ', this.tagName, ' --endtagname--  ', tempObj.endTagName);
                        }
                    } else if (!item.content &&
                        (this.tagName == 'button' || this.tagName == 'a' ||
                            this.tagName == 'ul' || this.tagName == 'li' || this.tagName == 'div' ||
                            this.tagName == 'footer' || this.tagName == 'p' || this.tagName == 'section' ||
                            item.type == 'header' || this.tagName == 'form' ||
                            this.tagName == 'nav' || this.tagName == 'svg' ||
                            this.tagName == 'span' || this.tagName == 'h1' ||
                            this.tagName == 'h2' || this.tagName == 'h3' ||
                            this.tagName == 'h4' || this.tagName == 'h5' ||
                            this.tagName == 'h6' || this.tagName == 'g'
                        )) {
                        tempObj.endTagName = this.tagName;
                        test.push(tempObj);
                        // console.log('2nd else if-', this.tagName, ' --endtagname--  ', tempObj.endTagName);
                        // console.log('before pushing the tagname in array -textnode--tagname-', this.tagName, ' --endtagname--  ', tempObj.endTagName, ' --endTag---- ', this.endTag);
                    } else if (!this.tagName) {
                        tempObj.endTagName = 'div';
                        test.push(tempObj);
                        // console.log('3nd else if-', this.tagName, ' --endtagname--  ', tempObj.endTagName);
                    }
                }

                if (index === firstEle.components.length - 1) {
                    this.count++;
                    if (test.length > 0) {
                        this.secondEle.unshift(test);
                    }
                    this.generateChildHtml(firstTemp, this.secondEle);
                }
            })
        } else {
            this.getNextValue(this.secondEle);
        }
    }



    getNextValue(secondEle) {
        let testTemp = secondEle.shift();
        var temp = '';
        if (testTemp) {
            temp = testTemp.shift();
            if (testTemp.length > 0) {
                secondEle.unshift(testTemp);
            }
        } else {
            temp = testTemp;
        }
        // console.log('getNext value ------------  ', temp);
        if (temp != undefined) {
            this.generateChildHtml(temp, secondEle);
        }
    }

    tagNameFunction(firstEle) {
        let tagName = '';
        if (firstEle.hasOwnProperty('tagName')) {
            tagName = firstEle.tagName;
        } else if (firstEle.hasOwnProperty('type')) {
            if (
                firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
                (firstEle.type == 'label' || firstEle.type == 'section')
            ) {
                tagName = firstEle.type;
            } else if (firstEle.type == 'tab' || firstEle.type == 'link') {
                tagName = 'a';
            } else if (firstEle.type == 'image') {
                tagName = 'img';
            } else {
                tagName = 'div';
            }
        }
        if (firstEle.type === 'header') {
            // console.log()
            if (firstEle.tagName) {
                tagName = firstEle.tagName;
            } else {
                tagName = 'h1';
            }

        } else if (!tagName) {
            tagName = 'div';
        }
        // console.log('before return each tagname are ------  ', tagName);
        return tagName;
    }





    // private forEach = asyncForEach.forEach;
    // private firstEle: any = null;
    // private secondEle: any[] = [];
    // private finalString: String = '';
    // private startTag: any[] = [];
    // private endTag: any[] = [];
    // private tagName: String = null;
    // private startString: String = '';
    // private count: number = 0;
    // private parentTest: any[] = [];
    // private isNotImportant: Boolean = false;
    // private isContentOnly: Boolean = false;

    // generateHtml(grapesJSMetadata, details) {
    //     this.forEach(grapesJSMetadata, (item, index, arr) => {
    //         var tempObj = { endTagName: '' };
    //         if (index === 0) {
    //             this.firstEle = item;
    //         } else {
    //             this.parentTest.push(item);
    //         }
    //         this.tagName = this.tagNameFunction(item);
    //         console.log('tagName for each iterate value are -parent----   ', this.tagName);
    //         if (item.type === 'textnode') {
    //             tempObj.endTagName = 'label';
    //             this.parentTest.push(tempObj);
    //         } else if (!this.tagName || this.tagName == 'div') {
    //             tempObj.endTagName = 'div';
    //             this.parentTest.push(tempObj);
    //         } else if (this.tagName == 'form') {
    //             tempObj.endTagName = 'form';
    //             this.parentTest.push(tempObj);
    //         } else if (this.tagName == 'section') {
    //             tempObj.endTagName = 'section';
    //             this.parentTest.push(tempObj);
    //         }
    //         if (index === grapesJSMetadata.length - 1) {
    //             if (this.parentTest.length > 0) {
    //                 this.secondEle.unshift(this.parentTest);
    //             }
    //             console.log(`finallllll iterate ----parent-------------${this.count}---------    `, this.secondEle);
    //             this.generateChildHtml(this.firstEle, this.secondEle);
    //             console.log('after completed all method in child are--------11--------  ', this.startTag);
    //             console.log('after completed all method in child are--------22--------  ', this.endTag);
    //             console.log('after completed all method in child are---thirdEle-----33--------  ', `${this.startTag.join(`\n`)}`);
    //         }
    //     })
    // }

    // generateChildHtml(firstEle, secondEle) {
    //     // console.log(`firstElE -11--${this.count}-- `, firstEle);
    //     // // console.log(`secondElE -22--${count}-- `, secondEle, '------lenght----- ', secondEle.length);
    //     // console.log(`startTag -33--${this.count}-- `, this.startTag, '------lenght----- ', this.startTag.length);
    //     // // console.log(`endTag -44--${count}-- `, endTag, '------lenght----- ', endTag.length);
    //     // console.log(`finalString -55--${this.count}-- `, firstEle.type);
    //     this.tagName = '';
    //     this.startString = '';
    //     if (firstEle && firstEle.hasOwnProperty('endTagName')) {
    //         // console.log('firstELEMent endTagName ----  ', firstEle.endTagName);
    //         this.startTag.push(`</${firstEle.endTagName}>`);
    //         this.getNextValue(secondEle);
    //     } else if (firstEle) {
    //         this.tagName = this.tagNameFunction(firstEle);
    //         if (firstEle.type == 'textnode') {
    //             this.startTag.push(firstEle.content);
    //         } else if (!this.tagName) {
    //             this.tagName = 'div';
    //         }
    //         this.isNotImportant = false;
    //         this.isContentOnly = false;
    //         // set html classes
    //         this.setClasses(firstEle);
    //         // set html traits
    //         this.setTraits(firstEle);
    //         // set html attributes
    //         this.setAttributes(firstEle);
    //         // set html contents
    //         this.setContent(firstEle);
    //         // based on value push it into startTag and endTag
    //         this.pushValue(firstEle);
    //         // check if the current html contents child components or not if it
    //         this.childComponents(firstEle);
    //     }
    // }

    // setClasses(firstEle) {
    //     if (firstEle.hasOwnProperty('classes')) {
    //         if (!firstEle.hasOwnProperty('tagName') && !this.tagName) {
    //             this.tagName = 'div';
    //         }
    //         let className = firstEle.classes[0].name;
    //         if (className == 'state-success' || className == 'state-error') {
    //             this.isNotImportant = true;
    //         }
    //         this.startString += `<${this.tagName} class='${className}'`
    //     }
    // }

    // setTraits(firstEle) {
    //     if (firstEle.hasOwnProperty('traits')) {
    //     }
    // }

    // setAttributes(firstEle) {
    //     if (firstEle.hasOwnProperty('attributes') && this.tagName !== 'form') {
    //         let attributes = Object.keys(firstEle.attributes);
    //         if (!this.startString) {
    //             this.startString += `<${this.tagName}`
    //         }
    //         attributes.forEach(element => {
    //             if (element === 'name' && firstEle.name) {
    //                 this.startString += ` ${element}='${firstEle.name}'`;
    //             } else {
    //                 this.startString += ` ${element}='${firstEle.attributes[element]}'`;
    //             }

    //         })
    //         if (this.tagName === 'input') {
    //             this.startString += `/>`;
    //         } else {
    //             this.startString += `>`;
    //         }
    //     } else {
    //         if (this.startString) {
    //             this.startString += `>`;
    //         }
    //     }
    // }

    // setContent(firstEle) {
    //     if (firstEle.hasOwnProperty('content')) {
    //         if (this.startString && firstEle.content) {
    //             this.startString += `${firstEle.content}`;
    //         } else if (!this.startString && firstEle.type != 'textnode') {
    //             this.isContentOnly = true;
    //             this.startString += `<${this.tagName}>${firstEle.content}`;
    //             this.startTag.push(this.startString);
    //         }
    //     }
    // }


    // pushValue(firstEle) {
    //     if (this.tagName != 'option' && !this.isContentOnly && !this.isNotImportant) {
    //         // console.log('open tagName are -------->>>   ', firstEle.open, ' ---open---- ', (firstEle.open === false));
    //         if (this.startString && this.tagName === 'input') {
    //             this.startTag.push(this.startString);
    //         } else if (this.startString && this.tagName != 'div' && this.tagName != 'form') {
    //             if (!firstEle.content && (this.tagName == 'label'
    //                 || this.tagName == 'section' || firstEle.type == 'header'
    //                 || this.tagName == 'nav' || this.tagName == 'a' || this.tagName == 'svg')) {
    //                 this.endTag.unshift(`${this.tagName}`)
    //             } else {
    //                 this.startString += `</${this.tagName}>`
    //             }
    //             this.startTag.push(this.startString);
    //         } else if (this.startString) {
    //             this.startTag.push(this.startString);
    //         }
    //     }
    // }

    // childComponents(firstEle) {
    //     if (firstEle.hasOwnProperty('components')) {
    //         let firstTemp = null;
    //         var test = [];
    //         this.forEach(firstEle.components, (item, index, arr) => {
    //             let tempObj = { endTagName: null };
    //             if (index === 0) {
    //                 firstTemp = item;
    //             } else {
    //                 test.push(item);
    //             }
    //             this.tagName = this.tagNameFunction(item);
    //             if (!item.classes || (item.classes && item.classes[0].name !== 'state-success' &&
    //                 item.classes[0].name !== 'state-error')) {
    //                 if (item.type === 'textnode') {
    //                     tempObj.endTagName = this.endTag.shift();
    //                     test.push(tempObj);
    //                 } else if (!this.tagName || this.tagName == 'div'
    //                     || this.tagName == 'form' || this.tagName == 'nav' ||
    //                     this.tagName == 'a' || this.tagName == 'svg') {
    //                     tempObj.endTagName = this.tagName;
    //                     test.push(tempObj);
    //                 }
    //             }

    //             if (index === firstEle.components.length - 1) {
    //                 this.count++;
    //                 if (test.length > 0) {
    //                     this.secondEle.unshift(test);
    //                 }
    //                 this.generateChildHtml(firstTemp, this.secondEle);
    //             }
    //         })
    //     } else {
    //         this.getNextValue(this.secondEle);
    //     }
    // }



    // getNextValue(secondEle) {
    //     let testTemp = secondEle.shift();
    //     var temp = '';
    //     if (testTemp) {
    //         temp = testTemp.shift();
    //         if (testTemp.length > 0) {
    //             secondEle.unshift(testTemp);
    //         }
    //     } else {
    //         temp = testTemp;
    //     }
    //     if (temp != undefined) {
    //         this.generateChildHtml(temp, secondEle);
    //     }
    // }

    // tagNameFunction(firstEle) {
    //     let tagName = '';
    //     if (firstEle.hasOwnProperty('tagName')) {
    //         tagName = firstEle.tagName;
    //     } else if (firstEle.hasOwnProperty('type')) {
    //         if (
    //             firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
    //             (firstEle.type == 'label' || firstEle.type == 'section')
    //         ) {
    //             tagName = firstEle.type;
    //         } else if (firstEle.type == 'tab') {
    //             tagName = 'a';
    //         } else {
    //             tagName = 'div';
    //         }
    //     }
    //     if (firstEle.type === 'header') {
    //         console.log()
    //         if (firstEle.tagName) {
    //             tagName = firstEle.tagName;
    //         } else {
    //             tagName = 'h1';
    //         }

    //     } else if (!tagName) {
    //         tagName = 'div';
    //     }
    //     console.log('before return each tagname are ------  ', tagName);
    //     return tagName;
    // }
}