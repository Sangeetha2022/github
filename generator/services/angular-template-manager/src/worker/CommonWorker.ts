import * as asyncForEach from 'async-foreach';
import { ComponentWorker } from "./ComponentWorker";
import { DependencyWorker } from "./DependencyWorker";

let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();
export class CommonWorker {
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

    private HeaderTag: any[] = [];
    private FooterTag: any[] = [];
    private TemplateTag: any[] = [];

    private templateHeaderObj = {
        tag: [],
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

    private navMenu: any[] = [];
    private scriptTag: any[] = [];
    private mainHtmlTag: any[] = [];


    generateAngularTemplate(generationPath, templatePath, callback) {
        return componentWorker.createHeaderComponent(generationPath, templatePath, this.templateHeaderObj, (response) => {
            return componentWorker.createTemplateComponent(generationPath, templatePath, this.templateMainObj, (response) => {
                return componentWorker.createFooterComponent(generationPath, templatePath, this.templateFooterObj, (response) => {
                    return componentWorker.generateAppComponentHtml(generationPath, templatePath, (response) => {
                        callback('angular template files are generated')
                    });

                });

            });

        });
    }

    generateMainFile(generationPath, templatePath, templateCss, sharedObj, callback) {
        return dependencyWorker.generateIndexHtml(generationPath, templatePath, this.mainHtmlTag, this.scriptTag, (response) => {
            return dependencyWorker.generateStyleSCSS(generationPath, templatePath, templateCss, (response) => {
                return dependencyWorker.generateSharedFile(generationPath, templatePath, sharedObj, (response) => {
                    return componentWorker.generateMainModule(generationPath, templatePath, (response) => {
                        callback('main files are generated');
                    });
                });
            });
        });

    }

    generateAppRoutingFile(generationPath, templatePath, callback) {
        return componentWorker.generateMainModule(generationPath, templatePath, (response) => {
            callback('main files are generated');
        });
    }

    createHeaderHtml(metaData, navMenu) {
        this.startTag = [];
        // this.HeaderTag = [];
        this.endTag = [];
        this.navMenu = navMenu;
        this.isTemplate = false;
        this.generateHtml(metaData);
        this.templateHeaderObj.tag = this.startTag;
        // this.HeaderTag = this.startTag;
        console.log('after completed all method in child HeaderHtml are   ', `${this.startTag.join(`\n`)}`);
    }

    createFooterHtml(metaData) {
        this.startTag = [];
        this.endTag = [];
        this.isTemplate = false;
        this.generateHtml(metaData);
        this.templateFooterObj.tag = this.startTag;
        // this.FooterTag = this.startTag;
        // console.log('after completed all method in child FooterHtml are   ', `${this.startTag.join(`\n`)}`);
    }

    createTemplateHtml(metaData) {
        this.startTag = [];
        this.endTag = [];
        this.mainHtmlTag = [];
        this.scriptTag = [];
        this.isTemplate = true;
        this.generateHtml(metaData);
        this.templateMainObj.tag = this.startTag;
        // this.TemplateTag = this.startTag;
        // console.log('after completed all method in child mainHtmlTag are   ', `${this.mainHtmlTag.join(`\n`)}`);
        // console.log('after completed all method in child scriptTag are   ', `${this.scriptTag.join(`\n`)}`);
        console.log('after completed all method in child templateTag are   ', `${this.startTag.join(`\n`)}`);
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
            console.log('tagName for each iterate value are -parent----   ', this.tagName);
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
        console.log(`firstElE -11--${this.count}-- `, firstEle);
        console.log(`secondElE -22--${this.count}-- `, secondEle);
        this.tagName = '';
        this.startString = '';
        if (firstEle && firstEle.hasOwnProperty('endTagName')) {
            this.startTag.push(`</${firstEle.endTagName}>`);
            this.getNextValue(secondEle);
        } else if (firstEle) {
            this.tagName = this.tagNameFunction(firstEle);
            if (firstEle.type == 'textnode') {
                this.startTag.push(firstEle.content);
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
            console.log('set each classNmaes are -------- ', className);
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
                    if (element === 'id' && firstEle.attributes[element] === this.MAINMENU_ATTRIBUTE) {
                        this.setNav(firstEle, this.secondEle);
                    }
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
    // add list of menu details in header nav
    setNav(firstEle, secondEle) {
        console.log('navMensu lengha are ------- ', this.navMenu.length);
        this.startString += `>`;
        this.startTag.push(this.startString);
        if (this.navMenu.length > 0) {
            this.startTag.push(`<div class="list-group panel">`);
            this.navMenu.forEach(menuElement => {
                const featureInfo = menuElement.featuremenu[0].description.feature;
                const screenInfo = menuElement.screenmenu[0];
                this.startTag.push(`<a href="#${featureInfo}" data-toggle="collapse" data-parent="#MainMenu" class="list-group-item list-group-item-success">
                ${featureInfo}
                <i class="fa fa-caret-down"></i></a>`);
                this.startTag.push(`<div id="${featureInfo}" class="collapse">`);
                // this.startTag.push(`<a [routerLink]="['/feature-details']" class="list-group-item">create</a>`);
                screenInfo.description.screen.forEach((screenElement, index) => {
                    this.startTag.push(`<a [routerLink]="['/${screenElement}']" class="list-group-item">${screenElement}</a>`);
                });
                this.startTag.push(`</div>`);
            })
            this.startTag.push(`</div>`);
            this.templateHeaderObj.css.push(`.list-group.panel {
    border: 0;
    border-radius: 0;
    margin-bottom: 0;
  }
  
  .list-group-item {
    border: none !important;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    color: white !important;
  }
  
  .list-group-item-success {
    background-color: rgba(0, 0, 0, 0.65);
    font-size: 20px;
    color: white !important;
    border-radius: none !important;
  }`)
        }

        this.getNextValue(secondEle);

    }

    setContent(firstEle) {
        if (firstEle.hasOwnProperty('content')) {
            // console.log('tagname of values rae ----- ', this.tagName);
            if (this.startString && firstEle.content) {
                this.startString += `${firstEle.content}`;
            } else if (!this.startString && firstEle.type != 'textnode') {
                this.isContentOnly = true;
                this.startString += `<${this.tagName}>${firstEle.content}`;
                if (this.tagName == 'script' || this.tagName == 'title' ||
                    (firstEle.content &&
                        (this.tagName == 'p' || firstEle.type == 'header' ||
                            this.tagName == 'span' || this.tagName == 'div'))
                ) {
                    console.log('set content of firstelement --tagname-- ', this.tagName)
                    this.startString += `</${this.tagName}>`
                }
                // this.startTag.push(this.startString);
                this.setTagValue();
                // if (this.tagName == 'title') {
                //     this.mainHtmlTag.push(`<base href="/" />`);
                // }
                // console.log('isContentOnly pushed values are ---item.content-- ', firstEle.content, '  --item.type---  ', firstEle.type);

            } else if (!firstEle.content && (this.tagName == 'button')) {
                this.isContentOnly = true;
                this.setTagValue();
                // this.startTag.push(this.startString);
            }
            // console.log('setContent vlaue of isContentOnly is ----  ', this.isContentOnly);
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
                    this.tagName == 'link' || this.tagName == 'li' || this.tagName == 'ul' ||
                    this.tagName == 'base' || this.tagName == 'span')) {
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
        if (this.tagName == 'meta' || this.tagName == 'title' ||
            this.tagName == 'link' || this.tagName == 'base') {
            this.mainHtmlTag.push(this.startString);
        } else if (this.tagName == 'script') {
            this.scriptTag.push(this.startString);
        } else {
            this.startTag.push(this.startString);
        }
    }

    childComponents(firstEle) {
        if (firstEle.hasOwnProperty('components')) {
            let firstTemp = null;
            var test = [];
            this.forEach(firstEle.components, (item, index, arr) => {
                let tempObj = { endTagName: null };
                if (index === 0) {
                    firstTemp = item;
                } else {
                    test.push(item);
                }
                this.tagName = this.tagNameFunction(item);
                // console.log('before pushing the tagname in array ----  ', this.tagName, ' --item type---- ', item.type, ' ---item.content---  ', item.content);
                if (!item.classes || (item.classes && item.classes[0].name !== this.STATE_SUCCESS_CLASSNAME &&
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
                            this.tagName == 'footer' || this.tagName == 'p' ||
                            item.type == 'header' || this.tagName == 'form' ||
                            this.tagName == 'nav' || this.tagName == 'svg' ||
                            this.tagName == 'span'
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

}