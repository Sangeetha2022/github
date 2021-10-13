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

const embedCodeService = new EmbedCodeService();
const dynamicListService = new DynamicListService();
const formservice = new FormService();
const listservice = new ListService();
const featureservice = new FeatureService();

export class BannersectionService {
    templatePath = '../../template'

    Bannersection(value, callback) {
        let bannerSection = {
            element: []
        };
        let bannerValue = value.values;
        asyncLoop(bannerValue, (item, next) => {
            let bannerapi = item.url;
            acousticdao.acoustic_elementsections(bannerapi, async (bannererror, bannerresponse) => {
                if (bannererror) {
                    console.error('----Banner error value----', bannererror);
                    callback(bannererror);
                } else {
                    if (bannerresponse.type === 'Embed code') {
                        embedCodeService.EmbedCode(bannerresponse, (res, err) => {
                            if (err) {
                                console.error('----form error ----', err);
                            }
                            let embedcode={
                                type:'embedcode',
                                value:res
                            }
                            bannerSection.element.push(embedcode);
                            next();
                        });
                    } else if (bannerresponse.type === 'Dynamic list') {
                        dynamicListService.DynamicList(bannerresponse, (res, err) => {
                            if (err) {
                                console.error('----form error ----', err);
                            }
                            let Dynamiclist={
                                type:'DynamicList',
                                value:res
                            }
                            bannerSection.element.push(Dynamiclist);
                            next();
                        });
                    } else if (bannerresponse.type == "Form component") {
                        formservice.Formcomponent(bannerresponse, (form_res, form_err) => {
                            if (form_err) {
                                console.error('----form error ----', form_err);
                            }
                            let formcomponent={
                                type:'Formcomponent',
                                value:form_res
                            }
                            bannerSection.element.push(formcomponent);
                            next();
                        })
                    } else if (bannerresponse.type == "List") {
                        listservice.Listcomponent(bannerresponse, (list_res, list_err) => {
                            if (list_err) {
                                console.error('----list error ----', list_err);
                            }
                            let list = {
                                type:'List',
                                value:list_res 
                            }
                            bannerSection.element.push(list);
                            next();
                        });
                    } else if (bannerresponse.type == "Feature") {
                        let featureresponse = await this.featuretype(bannerresponse);
                        let featurehtml = await this.generatestringtemplate(featureresponse);
                        let Feature = {
                            type:'Feature',
                            value:featurehtml 
                        }
                        bannerSection.element.push(Feature);
                        next();
                    }
                }
            });
        }, () => {
            callback(bannerSection);
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