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

export class SectiononeService {
    templatePath = '../../template'

    Sectionone(value, callback) {
        let sectionone = {
            element: []
        };
        let sectionOnevalue = value.values;
        asyncLoop(sectionOnevalue, (item, next) => {
            let sectionOneapi = item.url;
            acousticdao.acoustic_elementsections(sectionOneapi,async (sectionerror, sectiononeresponse) => {
                if (sectionerror) {
                    console.error('----section one error ----', sectionerror);
                    callback(sectionerror);
                } else {
                    if (sectiononeresponse.type == "Form component") {
                        formservice.Formcomponent(sectiononeresponse, (form_res, form_err) => {
                            if (form_err) {
                                console.error('----form error ----', form_err);
                            }
                            let Form={
                                type:'Formcomponent',
                                value:form_res
                            }
                            sectionone.element.push(Form);
                            next();
                        })
                    }
                    else if (sectiononeresponse.type == "List") {
                        listservice.Listcomponent(sectiononeresponse, (list_res, list_err) => {
                            if (list_err) {
                                console.error('----list error ----', list_err);
                            }
                            let list = {
                                type:'List',
                                value:list_res 
                            }
                            sectionone.element.push(list);
                            next();
                        });
                    } else if (sectiononeresponse.type === 'Embed code') {
                        embedCodeService.EmbedCode(sectiononeresponse, (res, err) => {
                            if (err) {
                                console.error('----embed code error ----', err);
                            }
                            let embedcode={
                                type:'embedcode',
                                value:res
                            }
                            sectionone.element.push(embedcode);
                            next();
                        });
                    } else if (sectiononeresponse.type === 'Dynamic list') {
                        dynamicListService.DynamicList(sectiononeresponse, (res, err) => {
                            if (err) {
                                console.error('----Dynamic list error ----', err);
                            }
                            let Dynamiclist={
                                type:'DynamicList',
                                value:res
                            }
                            sectionone.element.push(Dynamiclist);
                            next();
                        });
                    }
                    else if (sectiononeresponse.type == "Feature") {
                        let featureresponse = await this.featuretype(sectiononeresponse);
                        let featurehtml = await this.generatestringtemplate(featureresponse);
                        let Feature = {
                            type:'Feature',
                            value:featurehtml 
                        }
                        sectionone.element.push(Feature);
                        next();
                    }
                }
            });
        }, () => {
            callback(sectionone);
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