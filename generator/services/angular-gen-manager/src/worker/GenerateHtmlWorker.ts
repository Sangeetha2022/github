import * as util from 'util';
import * as asyncForEach from 'async-foreach';
// import { RouteSupportWorker } from '../supportworker/RouteSupportWorker';

// let routeSupportWorker = new RouteSupportWorker();
export class GenerateHtmlWorker {
    private forEach = asyncForEach.forEach;
    private firstEle: any = null;
    private secondEle: any[] = [];
    private finalString: String = '';
    private startTag: any[] = [];
    private endTag: any[] = [];
    private tagName: String = null;
    private startString: String = '';
    private count: number = 0;
    private parentTest: any[] = [];
    private isNotImportant: Boolean = false;
    private isContentOnly: Boolean = false;

    generateHtml(grapesJSMetadata, details) {
        this.forEach(grapesJSMetadata, (item, index, arr) => {
            var tempObj = { endTagName: '' };
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
            }
            if (index === grapesJSMetadata.length - 1) {
                if (this.parentTest.length > 0) {
                    this.secondEle.unshift(this.parentTest);
                }
                console.log(`finallllll iterate ----parent-------------${this.count}---------    `, this.secondEle);
                this.generateChildHtml(this.firstEle, this.secondEle);
                console.log('after completed all method in child are--------11--------  ', this.startTag);
                console.log('after completed all method in child are--------22--------  ', this.endTag);
                console.log('after completed all method in child are---thirdEle-----33--------  ', `${this.startTag.join(`\n`)}`);
            }
        })
    }

    generateChildHtml(firstEle, secondEle) {
        // console.log(`firstElE -11--${this.count}-- `, firstEle);
        // // console.log(`secondElE -22--${count}-- `, secondEle, '------lenght----- ', secondEle.length);
        // console.log(`startTag -33--${this.count}-- `, this.startTag, '------lenght----- ', this.startTag.length);
        // // console.log(`endTag -44--${count}-- `, endTag, '------lenght----- ', endTag.length);
        // console.log(`finalString -55--${this.count}-- `, firstEle.type);
        this.tagName = '';
        this.startString = '';
        if (firstEle && firstEle.hasOwnProperty('endTagName')) {
            // console.log('firstELEMent endTagName ----  ', firstEle.endTagName);
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
            this.setClasses(firstEle);
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

    setClasses(firstEle) {
        if (firstEle.hasOwnProperty('classes')) {
            if (!firstEle.hasOwnProperty('tagName') && !this.tagName) {
                this.tagName = 'div';
            }
            let className = firstEle.classes[0].name;
            if (className == 'state-success' || className == 'state-error') {
                this.isNotImportant = true;
            }
            this.startString += `<${this.tagName} class='${className}'`
        }
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
                    this.startString += ` ${element}='${firstEle.attributes[element]}'`;
                }

            })
            if (this.tagName === 'input') {
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
            if (this.startString && firstEle.content) {
                this.startString += `${firstEle.content}`;
            } else if (!this.startString && firstEle.type != 'textnode') {
                this.isContentOnly = true;
                this.startString += `<${this.tagName}>${firstEle.content}`;
                this.startTag.push(this.startString);
            }
        }
    }


    pushValue(firstEle) {
        if (this.tagName != 'option' && !this.isContentOnly && !this.isNotImportant) {
            // console.log('open tagName are -------->>>   ', firstEle.open, ' ---open---- ', (firstEle.open === false));
            if (this.startString && this.tagName === 'input') {
                this.startTag.push(this.startString);
            } else if (this.startString && this.tagName != 'div' && this.tagName != 'form') {
                if (!firstEle.content && (this.tagName == 'label'
                    || this.tagName == 'section' || firstEle.type == 'header'
                    || this.tagName == 'nav' || this.tagName == 'a' || this.tagName == 'svg')) {
                    this.endTag.unshift(`${this.tagName}`)
                } else {
                    this.startString += `</${this.tagName}>`
                }
                this.startTag.push(this.startString);
            } else if (this.startString) {
                this.startTag.push(this.startString);
            }
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
                if (!item.classes || (item.classes && item.classes[0].name !== 'state-success' &&
                    item.classes[0].name !== 'state-error')) {
                    if (item.type === 'textnode') {
                        tempObj.endTagName = this.endTag.shift();
                        test.push(tempObj);
                    } else if (!this.tagName || this.tagName == 'div'
                        || this.tagName == 'form' || this.tagName == 'nav' ||
                        this.tagName == 'a' || this.tagName == 'svg') {
                        tempObj.endTagName = this.tagName;
                        test.push(tempObj);
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
            } else if (firstEle.type == 'tab') {
                tagName = 'a';
            } else {
                tagName = 'div';
            }
        }
        if (firstEle.type === 'header') {
            console.log()
            if (firstEle.tagName) {
                tagName = firstEle.tagName;
            } else {
                tagName = 'h1';
            }

        } else if (!tagName) {
            tagName = 'div';
        }
        console.log('before return each tagname are ------  ', tagName);
        return tagName;
    }
}