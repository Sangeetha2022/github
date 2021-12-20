import { AcousticDao } from '../dao/acousticdao';
import * as asyncLoop from 'node-async-loop';

import { FeatureService } from './Feature';

import * as st from 'stringtemplate-js';

const acousticdao = new AcousticDao();

const featureservice = new FeatureService();


export class ListService {

    list = {
        listheading: {},
        listitemheading: {},
        listcss:'',
        listtype: []
    }
    templatePath = '../../template'

    Listcomponent(value, callback) {
        let listvalue = value.elements.items;
        this.list.listheading = value.elements.heading.value;
        // console.log('-------list values-------', listvalue);
        this.list.listtype = [];
        asyncLoop(listvalue.values, (item, next) => {
            let listapi = item.url;
            acousticdao.acoustic_elementsections(listapi, async (listerror, listresponse) => {
                if (listerror) {
                    console.error('------list error ----', listerror);
                    callback(listerror);
                } else {
                    if (listresponse.type == "Feature") {
                        let feature_response = await this.Feature(listresponse);
                        next();
                    }
                }
            })
        }, () => {
            this.generatestringtemplate(res => {
                callback(res, null);
            });
        })
    }

    public Feature(feature_res) {

        return new Promise((resolve, reject) => {
            featureservice.FeatureComponent(feature_res, (feature_response, feature_err) => {
                if (feature_err) {
                    console.error('------feature error ----', feature_err);
                    reject(feature_err);
                }
                let feature = {
                    header: '',
                    description: '',
                    image: '',
                    button: '',
                    link: '',
                    imageclass:'',
                    gridclass:''
                }
                feature_response.forEach(featureelement => {
                    feature.header = featureelement['featureHeadline'];
                    feature.description = featureelement['descriptionOfFeature'];
                    feature.image = featureelement.image;
                    feature.button = featureelement['readMoreLink'].value;
                    feature.link = featureelement['readMoreLink'].link;
                    feature.imageclass = 'gep-Firstimage gep-ibm-padding-bottom-1';
                    feature.gridclass = 'col-lg-4 col-md-4 col-sm-4';

                });
                this.list.listcss = 'gep-secondtag gep-mobilesecondtag';
                this.list.listtype.push(feature);
                resolve(feature_response);
            })
        })
    }

    public generatestringtemplate(callback) {
        let generateComponent = st.loadGroup(require(this.templatePath + `/List_stg`));
        let listHTML = generateComponent.render('List', [this.list]);
        callback(listHTML);
    }
}