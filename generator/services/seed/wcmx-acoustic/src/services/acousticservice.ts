import { AcousticDao } from '../dao/acousticdao';
import { AcousticEndPointService } from '../config/constants';
import { AcousticWorker } from '../worker/acousticWorker';

//Sections
import { BannersectionService } from '../sections/bannersection';
import { SectiononeService } from '../sections/sectionone';
import { SectiontwoService } from '../sections/sectiontwo';
import { DmnWorkerFile } from '../worker/DMNWorker';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as asyncLoop from 'node-async-loop';

const acousticdao = new AcousticDao();
let htmlcontentarray = [];
let htmlcontent = {
    css: '',
    html: '',
    component: ''
}

export class AcousticService {

    private acousticworker = new AcousticWorker();
    private bannersection = new BannersectionService();
    private sectionone = new SectiononeService();
    private sectiontwo = new SectiontwoService();
    private dmnworker = new DmnWorkerFile();


    public acousticgenerate(callback) {

        let site_id = AcousticEndPointService.AcousticSiteid;
        acousticdao.acousticpagebysiteid(site_id, (pageerror, pageresponse) => {
            if (pageerror) {
                console.error('Page error---------', pageerror);
            } else {
                asyncLoop(pageresponse, async (pageelement, next) => {
                    if (pageelement.status == "ready") {
                        htmlcontentarray = []
                        htmlcontent.html = '';
                        console.log('------pagename-----', pageelement.name);
                        let pagecontent = await this.deliverycontentby_id(pageelement.contentId);
                        htmlcontentarray.forEach(element => {
                            htmlcontent.html = htmlcontent.html.concat(element)
                        })
                        // console.log('------page content----', htmlcontent);
                        let acousticrenderedobj = {
                            title: pageelement.title,
                            htmlcontent: htmlcontent.html.replace('\n', ""),
                            csscontent: htmlcontent.css.replace('\n', ""),
                            component: htmlcontent.component
                        }
                        this.acousticworker.acoustic_rendercontent(acousticrenderedobj, (response) => {
                            this.acousticworker.modifyDependency();
                            this.acousticworker.modifyHeader();
                        })
                        next();
                    }
                }, () => {
                    callback('code has been generated');
                });
            }
        })
    }

    public deliverycontentby_id(content_id) {
        return new Promise((resolve, reject) => {
            acousticdao.acoustic_deliverycontent_byid(content_id, async (contenterror, contentresponse) => {
                if (contenterror) {
                    reject(contenterror);
                }
                else {
                    let contentelement = contentresponse.elements;
                    //checking banner
                    let bannerSection = contentelement.banner;
                    if (bannerSection.values !== undefined || bannerSection.values !== null) {
                        let bannerresponse = await this.bannerSection(bannerSection);
                        let bannerhtml = await this.generatehtml(bannerresponse);
                        // console.log('------Banner response-----', bannerresponse);
                    }
                    //checking section1
                    let sectionOne = contentelement.sectionOne;
                    if (sectionOne.values !== undefined || sectionOne.values !== null) {
                        let sectionresponse = await this.sectionOne(sectionOne);
                        let sectiononehtml = await this.generatehtml(sectionresponse);
                        // console.log('------Section one response-----', sectionresponse);
                    }
                    //checking section2
                    let sectionTwo = contentelement.sectionTwo;
                    if (sectionTwo.values !== undefined || sectionTwo.values !== null) {
                        let sectiontworesponse = await this.sectionTwo(sectionTwo);
                        let sectiontwohtml = await this.generatehtml(sectiontworesponse);
                        // console.log('------Section two response-----', sectiontworesponse);
                    }
                    resolve('HTML constructed');
                }
            })
        })
    }


    public bannerSection(bannerValue) {
        return new Promise((resolve, reject) => {
            this.bannersection.Bannersection(bannerValue, (banner_res, banner_err) => {
                if (banner_err) {
                    reject(banner_err);
                    console.error('----Banner error value----', banner_err);
                }
                resolve(banner_res);
            });
        })
    }

    public sectionOne(sectionOnevalue) {
        return new Promise((resolve, reject) => {
            this.sectionone.Sectionone(sectionOnevalue, (sectionone_res, sectionone_err) => {
                if (sectionone_err) {
                    reject(sectionone_err);
                    console.error('----Section one error value----', sectionone_err);
                }
                resolve(sectionone_res);
            });
        })
    }

    public sectionTwo(sectionTwovalue) {
        return new Promise((resolve, reject) => {
            this.sectiontwo.Sectiontwo(sectionTwovalue, (sectiontwo_res, sectiontwo_err) => {
                if (sectiontwo_err) {
                    reject(sectiontwo_err);
                    console.error('----Section one error value----', sectiontwo_err);
                }
                resolve(sectiontwo_res);
            });
        })
    }


    generatehtml(value) {
        value.element.forEach(element => {
            if (element.type == 'Feature') {
                htmlcontentarray.push(element.value);
            }
            else if (element.type == 'List') {
                htmlcontentarray.push(element.value);
            }
            else if (element.type == 'DynamicList') {
                htmlcontent.component = element.value;
                htmlcontentarray.push(element.value.html)
            }
            else if (element.type == 'embedcode') {
                htmlcontentarray.push(element.value.html);
                htmlcontent.css = element.value.css;
            }
        });

    }

    getPageTitles(pageTitles, callback) {
        console.log('REQ=====>>>>>', pageTitles);
        this.dmnworker.dmnTable(pageTitles, async (response) => {
            let dmnresponse = await this.postDMNtoCamunda();
            callback(dmnresponse);
        })
    }

    postDMNtoCamunda() {
        const DmnPath = path.resolve(__dirname, '../../Gep_authorize.dmn');
        const postUrl = `${AcousticEndPointService.camundaurlEndpoint}/engine-rest/deployment/create`;
        console.log('---------DMNpath======>>>>', DmnPath);
        const options = {
            url: postUrl,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                "data": fs.createReadStream(DmnPath),
                "deployment-name": "Gepauthorize",
                "enable-duplicate-filtering": "true",
                "deploy-changed-only": "true",
            }
        }
        request.post(options, ((err, response, body) => {
            console.log('error --->>>', err);
            // console.log('bodyy -------->>>>', body);
            // console.log('i am response -->>', response);
            return body;
        }))

    }


}