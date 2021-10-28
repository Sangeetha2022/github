import { AcousticDao } from '../dao/acousticdao';
import * as asyncLoop from 'node-async-loop';
import * as st from 'stringtemplate-js';

//strategy
import { FormService } from '../strategy/FormComponent';
import { ListService } from '../strategy/List';
import { EmbedCodeService } from '../strategy/EmbedCode';
import { DynamicListService } from '../strategy/DynamicList';
import { FeatureService } from '../strategy/Feature';

const acousticdao = new AcousticDao();

const formservice = new FormService();
const listservice = new ListService();
const embedCodeService = new EmbedCodeService();
const dynamicListService = new DynamicListService();
const featureservice = new FeatureService();

export class SectiontwoService {
    templatePath = '../../template'

    Sectiontwo(value, callback) {
        let sectiontwo = {
            element: []
        };
        let sectionTwovalue = value.values;
        asyncLoop(sectionTwovalue, (item, next) => {
            let sectionTwoapi = item.url;
            acousticdao.acoustic_elementsections(sectionTwoapi,async(sectiontwoerror, sectiontworesponse) => {
                if (sectiontwoerror) {
                    console.error('----section one error ----', sectiontwoerror);
                    callback(sectiontwoerror);
                } else {
                    if (sectiontworesponse.type == "Form component") {
                        formservice.Formcomponent(sectiontworesponse, (form_res, form_err) => {
                            if (form_err) {
                                console.error('----form error ----', form_err);
                            }
                            // console.log('-------form response----', form_res)
                            let Form={
                                type:'Formcomponent',
                                value:form_res
                            }
                            sectiontwo.element.push(Form);
                            next();
                        })
                    }
                    else if (sectiontworesponse.type == "List") {
                        listservice.Listcomponent(sectiontworesponse, (list_res, list_err) => {
                            if (list_err) {
                                console.error('----list error ----', list_err);
                            }
                            // console.log('-------list response----', list_res)
                            let list = {
                                type:'List',
                                value:list_res 
                            }
                            sectiontwo.element.push(list);
                            next();
                        });
                    } else if (sectiontworesponse.type === 'Embed code') {
                        embedCodeService.EmbedCode(sectiontworesponse, (res, err) => {
                            if (err) {
                                console.error('----embed code error ----', err);
                            }
                            let embedcode={
                                type:'embedcode',
                                value:res
                            }
                            sectiontwo.element.push(embedcode);
                            next();
                        });
                    } else if (sectiontworesponse.type === 'Dynamic list') {
                        dynamicListService.DynamicList(sectiontworesponse, (res, err) => {
                            if (err) {
                                console.error('----Dynamic list error ----', err);
                            }
                            let Dynamiclist={
                                type:'DynamicList',
                                value:res
                            }
                            sectiontwo.element.push(Dynamiclist);
                            next();
                        });
                    }
                    else if (sectiontworesponse.type == "Feature") {
                        let featureresponse = await this.featuretype(sectiontworesponse);
                        let featurehtml = await this.generatestringtemplate(featureresponse);
                        let Feature = {
                            type:'Feature',
                            value:featurehtml 
                        }
                        sectiontwo.element.push(Feature);
                        next();
                    }

                }
            });
        }, () => {
            callback(sectiontwo);
        });
    }


    public featuretype(value) {
        return new Promise((resolve, reject) => {
            featureservice.FeatureComponent(value, (feature_response, feature_err) => {
                if (feature_err) {
                    console.error('----list error ----', feature_err);
                    reject(feature_err)
                }
                resolve(feature_response)
            });
        });
    }


    public generatestringtemplate(value) {
        return new Promise((resolve, reject) => {
            let feature = {
                header: '',
                description: '',
                image: '',
                button: '',
                link: '',
                imageclass:'',
                blockclass:'',
                gridclass:'',
                buttonclass:'',
                headerclass:''
            }
            feature.header = value[0].featureHeadline;
            feature.image = value[0].image;
            feature.description = value[0].descriptionOfFeature;
            feature.button = value[0].readMoreLink.value;
            feature.blockclass = 'gep-text-block-acoustic';
            feature.imageclass = 'gep-ibm-resize-acoustic';
            feature.gridclass = 'col-lg-6 col-md-6 col-sm-6';
            feature.buttonclass = 'btn btn-primary ibmbtn';
            feature.headerclass = 'font-weight-light';

            let generateComponent = st.loadGroup(require(this.templatePath + `/Feature_stg`));
            let featureHTML = generateComponent.render('Feature', [feature]);
            resolve(featureHTML);
        });
    }
}