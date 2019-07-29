import * as asyncForEach from 'async-foreach';
import { ComponentWorker } from "./componentWorker";
import { DependencyWorker } from "./dependencyWorker";
import * as constant from '../assets/headerComponent';

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
    private ADMIN_MENU = 'admin';
    private LOGOUT_MENU = 'logout';

    //component variable
    private HEADER_ADMIN_VARIABLE = 'isAdminUser';
    initializeVariable() {
        this.templateHeaderObj = {
            tag: [],
            component: {
                scriptVariable: [],
                componentOnInit: []
            },
            css: [],
            module: []
        }
        this.templateFooterObj = {
            tag: [],
            css: [],
            module: []
        }
        this.templateMainObj = {
            tag: [],
            css: [],
            module: []
        }

        this.navMenu = [];
        this.scriptTag = [];
        this.mainHtmlTag = [];

    }

    generateAngularTemplate(generationPath, templatePath, templateName, menuList, callback) {
        console.log('headerobject before create are --TEMPLATENAME--------   ', templateName);
        if (this.templateHeaderObj.tag.length === 0 && this.templateHeaderObj.css.length === 0) {
            let headerNav = constant.sideBar.htmlTag[0].replace(this.CHANGENAME, templateName.toUpperCase().replace('TEMPLATE', ''));
            let loadHeaderNav = '';
            if (menuList && menuList.length > 0) {
                menuList.forEach(menuElement => {
                    if (menuElement.parent.length == 0 && menuElement.children.length > 0) {
                        menuElement.children.forEach(childElement => {
                            if (childElement.name == this.ADMIN_MENU) {

                                loadHeaderNav += `<${this.LIST_TAG}>
                               <a class="text" *ngIf='${this.HEADER_ADMIN_VARIABLE}' [routerLink]="['/${childElement.route}']">${childElement.name}</a>
                               </${this.LIST_TAG}>`

                            } else if (childElement.name == this.LOGOUT_MENU) {

                                loadHeaderNav += `<${this.LIST_TAG}>
                                <a class="text" (click)="${this.LOGOUT_MENU}()">${childElement.name}</a>
                                </${this.LIST_TAG}>`

                            } else {

                                loadHeaderNav += `<${this.LIST_TAG}>
                               <a class="text" [routerLink]="['/${childElement.route}']">${childElement.name}</a>
                               </${this.LIST_TAG}>`

                            }

                        })
                    } else if (menuElement.parent) {

                        loadHeaderNav += `<li>
                        <a class="text" href="#${menuElement.parent[0]}" data-toggle="collapse" aria-expanded="false"
                         class="dropdown-toggle">${menuElement.parent[0]}</a>
                        <ul class="collapse list-unstyled" id="${menuElement.parent[0]}">`;

                    }
                    if (menuElement.parent.length != 0 && menuElement.children.length != 0) {
                        menuElement.children.forEach(childElement => {
                            if (childElement.name == this.ADMIN_MENU) {

                                loadHeaderNav += `<${this.LIST_TAG}>
                               <a class="text" *ngIf='${this.HEADER_ADMIN_VARIABLE}' [routerLink]="['/${childElement.route}']">${childElement.name}</a>
                               </${this.LIST_TAG}>`

                            } else if (childElement.name == this.LOGOUT_MENU) {

                                loadHeaderNav += `<${this.LIST_TAG}>
                                <a class="text" (click)="${this.LOGOUT_MENU}()">${childElement.name}</a>
                                </${this.LIST_TAG}>`;

                            } else {

                                loadHeaderNav += `<${this.LIST_TAG}>
                               <a class="text" [routerLink]="['/${childElement.route}']">${childElement.name}</a>
                               </${this.LIST_TAG}>`;

                            }
                            loadHeaderNav += `</ul>
                            </li>`;

                        })
                    }
                })
                headerNav = headerNav.replace(this.LOADHEADERNAV, loadHeaderNav);
                this.templateHeaderObj.tag.push(headerNav);
                // add script sidebar script in header component
                this.templateHeaderObj.component.scriptVariable = constant.sideBar.components.scriptVariable;
                this.templateHeaderObj.component.componentOnInit = constant.sideBar.components.componentOnInit;
            }
            this.templateHeaderObj.css = constant.sideBar.css;
            constant.sideBar.script.forEach(scriptElement => {
                this.scriptTag.push(scriptElement);
            })
        }
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

    generateMainFile(generationPath, templatePath, templateCss, sharedObj, projectName, callback) {
        return dependencyWorker.generateNginxDockerFile(generationPath, templatePath, projectName, (response) => {
            return dependencyWorker.generateIndexHtml(generationPath, templatePath, this.mainHtmlTag, this.scriptTag, (response) => {
                return dependencyWorker.generateStyleSCSS(generationPath, templatePath, templateCss, (response) => {
                    return dependencyWorker.generateSharedFile(generationPath, templatePath, sharedObj, (response) => {
                        return componentWorker.generateMainModule(generationPath, templatePath, (response) => {
                            callback('main files are generated');
                        });
                    });
                });
            });
        });

    }

    // generateAppRoutingFile(generationPath, templatePath, callback) {
    //     return componentWorker.generateMainModule(generationPath, templatePath, (response) => {
    //         callback('main files are generated');
    //     });
    // }

    createHeaderHtml(metaData, navMenu) {
        this.startTag = [];
        // this.HeaderTag = [];
        this.endTag = [];
        this.navMenu = navMenu;
        this.isTemplate = false;
        this.generateHtml(metaData);
        this.templateHeaderObj.tag = this.startTag;
        console.log('header tag bvalues are ----templateHeaderObj----- ', this.templateHeaderObj);
        // this.HeaderTag = this.startTag;
        // console.log('after completed all method in child HeaderHtml are   ', `${this.startTag.join(`\n`)}`);
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
        // console.log('navMensu lengha are ------- ', this.navMenu.length);
        this.startString += `>`;
        this.startTag.push(this.startString);
        let isParentDiv = false;
        if (this.navMenu.length > 0) {
            // this.startTag.push(`<div class="list-group panel">`);
            this.navMenu.forEach(navElement => {
                // this.startTag.push(`<div class="list-group panel">`);
                if (navElement.parent.length == 0 && navElement.children.length > 0) {
                    navElement.children.forEach(childElement => {
                        this.startTag.push(`<div class="list-group panel">`);
                        if (childElement.name == this.ADMIN_MENU) {

                            this.startTag.push(`<${this.ANCHOR_TAG} class="list-group-item list-group-item-success" *ngIf='${this.HEADER_ADMIN_VARIABLE}' [routerLink]="['/${childElement.route}']">${childElement.name}</${this.ANCHOR_TAG}>`);

                        } else if (childElement.name == this.LOGOUT_MENU) {
                            this.startTag.push(`<${this.ANCHOR_TAG} class="list-group-item list-group-item-success" (click)="${this.LOGOUT_MENU}()">${childElement.name}</${this.ANCHOR_TAG}>`);
                            //     loadHeaderNav += `<${this.LIST_TAG}>
                            //    <a class="text" [routerLink]="['/${childElement.route}']">${childElement.name}</a>
                            //    </${this.LIST_TAG}>`

                        } else {
                            this.startTag.push(`<${this.ANCHOR_TAG} class="list-group-item list-group-item-success" [routerLink]="['/${childElement.route}']">${childElement.name}</${this.ANCHOR_TAG}>`);
                            // loadHeaderNav += `<${this.LIST_TAG}>
                            // <a class="text" (click)="${this.LOGOUT_MENU}()">${childElement.name}</a>
                            // </${this.LIST_TAG}>`

                        }
                        this.startTag.push(`</div>`);
                    })
                } else if (navElement.parent) {
                    isParentDiv = true;
                    this.startTag.push(`<div class="list-group panel">`);
                    this.startTag.push(`<${this.ANCHOR_TAG} href="#${navElement.parent[0]}" class="list-group-item list-group-item-success" data-toggle="collapse"
                        data-parent="#MainMenu">${navElement.parent[0]} <i class="fa fa-caret-down"></i></${this.ANCHOR_TAG}>`);
                    this.startTag.push(`<div class="collapse" id="${navElement.parent[0]}">`);
                    // loadHeaderNav += `<li>
                    // <a class="text" href="#${menuElement.parent[0]}" data-toggle="collapse" aria-expanded="false"
                    //  class="dropdown-toggle">${menuElement.parent[0]}</a>
                    // <ul class="collapse list-unstyled" id="${menuElement.parent[0]}">`;

                }
                if (navElement.parent.length != 0 && navElement.children.length != 0) {
                    navElement.children.forEach(childElement => {
                        if (childElement.name == this.ADMIN_MENU) {

                            this.startTag.push(`<${this.ANCHOR_TAG} class="list-group-item list-group-item-success" *ngIf='${this.HEADER_ADMIN_VARIABLE}' [routerLink]="['/${childElement.route}']">${childElement.name}</${this.ANCHOR_TAG}>`);

                        } else if (childElement.name == this.LOGOUT_MENU) {
                            this.startTag.push(`<${this.ANCHOR_TAG} class="list-group-item" (click)="${this.LOGOUT_MENU}()">${childElement.name}</${this.ANCHOR_TAG}>`);
                        } else {

                            // loadHeaderNav += `<${this.LIST_TAG}>
                            // <a class="text" (click)="${this.LOGOUT_MENU}()">${childElement.name}</a>
                            // </${this.LIST_TAG}>`;
                            this.startTag.push(`<${this.ANCHOR_TAG} class="list-group-item" [routerLink]="['/${childElement.route}']">${childElement.name}</${this.ANCHOR_TAG}>`);
                        }
                        // loadHeaderNav += `</ul>
                        // </li>`;

                    })
                }

                if (isParentDiv) {
                    this.startTag.push(`</div>`);
                    this.startTag.push(`</div>`);
                }
            })
            // this.navMenu.forEach(menuElement => {
            //     const featureInfo = menuElement.featuremenu[0].description.feature;
            //     const screenInfo = menuElement.screenmenu[0];
            //     this.startTag.push(`<a href="#${featureInfo}" data-toggle="collapse" data-parent="#MainMenu" class="list-group-item list-group-item-success">
            //     ${featureInfo}
            //     <i class="fa fa-caret-down"></i></a>`);
            //     this.startTag.push(`<div id="${featureInfo}" class="collapse">`);
            //     // this.startTag.push(`<a [routerLink]="['/feature-details']" class="list-group-item">create</a>`);
            //     screenInfo.description.screen.forEach((screenElement, index) => {
            //         this.startTag.push(`<a [routerLink]="['/${screenElement}']" class="list-group-item">${screenElement}</a>`);
            //     });
            //     this.startTag.push(`</div>`);
            // })
            // this.startTag.push(`</div>`);
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

}