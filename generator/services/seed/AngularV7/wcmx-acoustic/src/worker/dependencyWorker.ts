import { AcousticSupportWorker } from "../supportworker/acousticSupportWorker";
import { Constant } from "../assets/constant";


export class DependencyWorker {

    private acousticSupportWorker = new AcousticSupportWorker();
    private appComponentFactory = [];


    // app.routing file
    public modifyAppRouteFile(applicationPath, information) {
        const file = this.acousticSupportWorker.readFile(applicationPath, Constant.APP_ROUTING_FILENAME);

        if (information.importDependency.length > 0) {
            information.importDependency.forEach((dependencyElement, elementIndex) => {
                if (!file.find(x => x === dependencyElement)) {
                    const importIndex = file.findIndex(x => /const.*routes\:\s+Routes/.test(x));
                    const pathIndex = file.findIndex(x => /];/.test(x));
                    file.splice(importIndex - 1, 0, dependencyElement);
                    console.log('app route path are -file--pathIndex-- ', pathIndex - 1, ' --pathindex-- ', file[pathIndex - 1]);
                    file[pathIndex - 1].replace('}', '},');
                    file.splice(pathIndex, 0, information.routePath[elementIndex]);
                }
            })
        }
        this.acousticSupportWorker.writeStaticFile(applicationPath, Constant.APP_ROUTING_FILENAME,
            file.join(`\n`), (response) => { })
    }



    // app.module.ts file
    public modifyAppModuleFile(applicationPath, information, pageDetails) {
        console.log('modifyAppModule in depend worker----- ', information, ' page details ', pageDetails);
        const file = this.acousticSupportWorker.readFile(applicationPath, Constant.APP_MODULE_FILENAME);
        const moduleIndex = file.findIndex(x => /@NgModule/.test(x));
        // const moduleIndex = file.findIndex(x => /DynamicComponentManifest\[]/.test(x));
        if (information.importDependency.length > 0) {
            information.importDependency.forEach(dependencyElement => {
                if (!file.find(x => x === dependencyElement)) {
                    file.splice(moduleIndex - 1, 0, dependencyElement);
                }
            })
        }
        const declarationIndex = file.findIndex(x => /declarations/.test(x));
        if (information.declarations.length > 0) {
            information.declarations.forEach(declarationElement => {
                if (!file.find(x => x === declarationElement)) {
                    file.splice(declarationIndex + 1, 0, declarationElement);
                }
            })
        }
        const importIndex = file.findIndex(x => /imports/.test(x));
        if (information.imports.length > 0) {
            information.imports.forEach(importElement => {
                if (!file.find(x => x === importElement)) {
                    file.splice(importIndex + 1, 0, importElement);
                }
            })
        }
        const providerIndex = file.findIndex(x => /providers/.test(x));
        if (information.providers.length > 0) {
            information.providers.forEach(providerElement => {
                if (!file.find(x => x === providerElement)) {
                    file.splice(providerIndex + 1, 0, providerElement);
                }
            })
        }
        const bootstrapIndex = file.findIndex(x => /bootstrap/.test(x));
        if (information.bootstrap.length > 0) {
            information.bootstrap.forEach(boostrapElement => {
                if (!file.find(x => x === boostrapElement)) {
                    file.splice(bootstrapIndex + 1, 0, boostrapElement);
                }
            })
        }

        // adding loader
        // const loaderIndex = file.findIndex(x => /DynamicComponentManifest\[]/.test(x));
        // if (pageDetails && pageDetails.length > 0) {
        //     const loaderArray = [];
        //     const pageTemp = [];
        //     pageDetails.forEach(pageElement => {
        //         const componentTemp = `componentId: '${pageElement.value}'`;
        //         const componentRegex = new RegExp(componentTemp);
        //         const pageLoaderIndex = file.findIndex(x => componentRegex.test(x));

        //         if (pageLoaderIndex < 0) {
        //             pageTemp.push(pageElement);
        //         }
        //     })
        //     if (pageTemp.length > 0) {
        //         this.wordpressSupportWorker.renderDetails(Constant.TEMPLATE_PATH, Constant.COMPONENT_LOADER_TEMPLATENAME,
        //             pageTemp, loaderArray, false);
        //         this.wordpressSupportWorker.renderDetails(Constant.TEMPLATE_PATH, Constant.COMPONENT_FACTORY_TEMPLATENAME,
        //             pageTemp, this.appComponentFactory, false);
        //     }
        //     console.log('loaderIndex values are ----  ', loaderIndex, ' appComponentFactory ', this.appComponentFactory);
        //     if (this.appComponentFactory.length > 0) {
        //         this.modifyAppComponent(applicationPath);
        //     }

        //     console.log('after set the loader component details are --- ', loaderArray);
        //     if (loaderArray.length > 0) {
        //         file.splice(loaderIndex + 1, 0, loaderArray.join(''));
        //     }
        // }

        this.acousticSupportWorker.writeStaticFile(applicationPath, Constant.APP_MODULE_FILENAME,
            file.join(`\n`), (response) => { })
    }


    // modify app ts component file
    public modifyAppComponent(applicationPath) {
        const file = this.acousticSupportWorker.readFile(applicationPath, Constant.APP_COMPONENT_TS_FILENAME);
        // console.log('readed file details are ---  ', file);
        const index = file.findIndex(x => /.*loadComponent\(\).*{/.test(x));
        console.log('app component modify index are -----  ', index, '  appComponentFactory  ', this.appComponentFactory);
        if (this.appComponentFactory.length > 0 && index > -1) {
            file.splice(index + 1, 0, this.appComponentFactory.join(''));
            this.acousticSupportWorker.writeStaticFile(applicationPath, Constant.APP_COMPONENT_TS_FILENAME,
                file.join(`\n`), (response) => { this.appComponentFactory = []; })
        }
    }



    // package.json file
    public modifyPackageFile(applicationPath, information) {
        const file = this.acousticSupportWorker.readFile(applicationPath, Constant.PACKAGE_JSON_FILENAME);
        const index = file.findIndex(x => /router/.test(x));
        if (index) {
            information.forEach(element => {
                const splitted = element.split(":");
                const regExpression = new RegExp(splitted[0]);
                if (file.findIndex(x => regExpression.test(x)) < 0) {
                    file.splice(index, 0, element);
                }

            })
        }
        this.acousticSupportWorker.writeStaticFile(applicationPath, Constant.PACKAGE_JSON_FILENAME,
            file.join(`\n`), (response) => { })
    }


    // style.scss file
    public modifyGlobalStyles(applicationPath, information) {
        let file = this.acousticSupportWorker.readFile(applicationPath, Constant.STYLE_SCSS_FILENAME);
        if (information.import.length > 0) {
            file.splice(1, 0, information.import.join('\n'));
        }
        if (information.others.length > 0) {
            file = file.concat(information.others);
        }
        this.acousticSupportWorker.writeStaticFile(applicationPath, Constant.STYLE_SCSS_FILENAME,
            file.join(`\n`), (response) => { })
    }
}