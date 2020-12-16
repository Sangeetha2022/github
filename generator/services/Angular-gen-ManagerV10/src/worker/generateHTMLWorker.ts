import * as util from 'util';
import * as asyncForEach from 'async-foreach';
import * as asyncLoop from 'node-async-loop';
import { Forms } from '../strategy/HTML/Forms';
import {InputTagGeneration} from '../strategy/HTML/Input';
let forms = new Forms();
let generateInput = new InputTagGeneration();

export class GenerateHtmlWorker {

    private forEach = asyncForEach.forEach;
    private tagName: String = null;
    // Screen details

    private screenInfo: any;

    generate(screenDetails, details, callback) {
        // add default styles
        this.screenInfo = screenDetails;
        let metaData: any = JSON.parse(screenDetails['gjs-components'][0]);
        this.generateHtml(metaData, screenDetails, details);
    }

    generateHtml(grapesJSMetadata, screensData, details) {
        let screenHtmlContent: any;
        this.forEach(grapesJSMetadata, (item, index, arr) => {
            this.tagName = this.tagNameFunction(item);
            if (this.tagName == 'form') {
                forms.formHTMLGeneration(item, screensData, details, (response) => {
                    screenHtmlContent.push({data: response});
                });
            }
            if (this.tagName == 'input') {
                let formResponse = generateInput.inputGeneration(item);
            }
        })
    }

    tagNameFunction(firstEle) {
        let tagName = '';
        if (firstEle.hasOwnProperty('tagName')) {
            tagName = firstEle.tagName;
        } else if (firstEle.hasOwnProperty('type')) {
            if (
                firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
                (firstEle.type == 'label' || firstEle.type == 'section' || firstEle.type == 'input')
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
            if (firstEle.tagName) {
                tagName = firstEle.tagName;
            } else {
                tagName = 'h1';
            }

        } else if (!tagName) {
            tagName = 'div';
        }
        return tagName;
    }
}
