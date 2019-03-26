import { Request } from 'express';
import { ScreenDao } from '../daos/ScreenDao';
import * as util from 'util';
// import { EntityWorker } from '../worker/ScreenWorker';
import * as path from '../config/pathConfig';
import { ScreenServiceSupporter } from '../servicesupporter/angular7/ScreenServiceSupporter';
import * as asyncLoop from 'node-async-loop';

let screenDao = new ScreenDao();
let screenSupporter = new ScreenServiceSupporter();
// let screenWorker = new EntityWorker();

export class ScreenService {

    private component: any[] = [];

    public generateScreen = async (req: Request, callback) => {
        // const projectName = req.query['projectname'];
        // const folderName = req.query['foldername'];
        const projectName = req.body.projectname;
        let folderNames = [];
        // const folderName = req.body.foldername;
        const projectID = req.body.templateid;
        const angularPath = {
            source: `${path.templatePath}/angular7`,
            destination: `${path.sourcePath}/${projectName}`
        }
        console.log('entering into generateScreen')
        screenDao.getTemplate(projectID, (templateResponse) => {
            screenSupporter.generateTemplate(templateResponse, angularPath, (createdTemplateResult) => {
                screenSupporter.generateDefaultFile(angularPath, (defaultResult) => {
                    screenDao.getScreenDetails((screenResponse) => {
                        if (screenResponse !== undefined) {
                            this.component = screenResponse;
                        }
                        asyncLoop(this.component, (element, next) => {
                            const folder = element.foldername;
                            folderNames.push(folder);
                            screenSupporter.createHtmlFile(angularPath, element, folder, (htmlResponse) => {
                                screenSupporter.createTsFile(angularPath, element, folder, (tsResponse) => {
                                    screenSupporter.createCssFile(angularPath, element, folder, (cssResponse) => {
                                        screenSupporter.createSpecFile(angularPath, element, folder, (specResponse) => {
                                            next();
                                        })
                                    })
                                })
                            })
                        }, function (err) {
                            if (err) {
                                console.log('entering in asyncLoop of if')
                            } else {
                                console.log('entering in asyncLoop of else')
                                screenSupporter.createHeader(angularPath, folderNames, (createdHeader) => {
                                screenSupporter.generateAppComponent(angularPath, (appResult) => {
                                    screenSupporter.generateDependency(angularPath, projectName, (dependencyResult) => {
                                        callback("angular app generated")
                                        
                                    })
                                })
                            })
                            }
                        })
                        
                    })
                })
            })
        })

        // const templatePath = path.templatePath;
        // const sourcePath = path.sourcePath;
        // let importComponent = [];
        // let importDependency = [];
        // // importComponent.push({classname: folderName, foldername: folderName})
        // screenDao.getScreenDetails((response) => {
        //     console.log('generate screen in services are ----pname-------  ', projectName, response.length, ' -- ',
        //         util.inspect(response, { showHidden: false, depth: null }));
        //     let count = 0;
        //     if (response.length > 0) {
        //         response.forEach(screenElement => {
        //         //     if(screenElement.is_grid_present) {
        //         //         var foundIndex = importDependency.findIndex(x => x.dependencyname == 'AgGridModule');
        //         //         if(foundIndex > -1) {
        //         //         importDependency.push({
        //         //             dependencyname: 'AgGridModule', 
        //         //             dependencypath: 'ag-grid-angular',
        //         //             modulename: 'AgGridModule.withComponents()'
        //         //     })
        //         // }
        //         //     }
        //             screenSupporter.createAng7Project(screenElement, projectName,
        //                 sourcePath, templatePath, (projectResponse) => {
        //                     console.log('projectResponse in screen service are---- ', projectResponse);
        //                     screenSupporter.createCustomHtml(screenElement, projectName, folderName, sourcePath, templatePath, (response) => {
        //                         screenSupporter.createCustomTs(screenElement, projectName, folderName, sourcePath, templatePath, (testresponse) => {
        //                             screenSupporter.createCustomSpecCss(screenElement, projectName, folderName, sourcePath, templatePath, (cssResponse) => {
        //                                 screenSupporter.createRoutingFile(sourcePath, templatePath, projectName, (routingResponse) => {
        //                                     screenSupporter.createAppModuleFile(sourcePath, templatePath, projectName, (appModuleResponse) => {
        //                                         screenSupporter.createAngularJsonFile(sourcePath, templatePath, projectName, (angResponse) => {
        //                                             screenSupporter.createPackageJsonFile(sourcePath, templatePath, projectName, (packageResponse) => {
        //                                                 callback("angular 7 application created");
        //                                             })
        //                                         })
        //                                     })
        //                                 })
        //                             })
        //                         })
        //                     })
        //                 });
        //         });
        //         // response.forEach(element => {
        //         //     screenWorker.entityModelWorker(element, (result) => {
        //         //         count++;
        //         //         console.log('inside one in controller')
        //         //         if(count === response.length - 1) {
        //         //             callback('file created successfully')
        //         //         }
        //         //     })
        //         // })
        //         // callback("angular 7 application created");
        //     }
        //     console.log('ouside one in controller')
        // });
    }

}