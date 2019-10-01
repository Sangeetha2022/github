import * as fs from 'fs';
import { DependencySupportWorker } from '../supportworker/dependencySupportWorker';
import { Constant } from '../config/Constant';

export class DependencyWorker {
    private dependencySupportWorker = new DependencySupportWorker();



    // app.routing file
    public modifyAppRouteFile(applicationPath, information) {
        const file = this.dependencySupportWorker.readFile(applicationPath, Constant.APP_ROUTING_FILENAME);
        const importIndex = file.findIndex(x => /const.*routes\:\s+Routes/.test(x));
        const pathIndex = file.findIndex(x => /];/.test(x));
        if (information.importDependency.length > 0) {
            information.importDependency.forEach((dependencyElement, elementIndex) => {
                file.splice(importIndex - 1, 0, dependencyElement);
                file.splice(pathIndex - 1, 0, information.routePath[elementIndex]);
            })
        }
        this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.APP_ROUTING_FILENAME,
            file.join(`\n`), (response) => { })
    }

    // app.module.ts file
    public modifyAppModuleFile(applicationPath, information) {
        const file = this.dependencySupportWorker.readFile(applicationPath, Constant.APP_MODULE_FILENAME);
        const moduleIndex = file.findIndex(x => /@NgModule/.test(x));
        if (information.importDependency.length > 0) {
            information.importDependency.forEach(dependencyElement => {
                file.splice(moduleIndex - 1, 0, dependencyElement);
            })
        }
        const declarationIndex = file.findIndex(x => /declarations/.test(x));
        if (information.declarations.length > 0) {
            information.declarations.forEach(declarationElement => {
                file.splice(declarationIndex + 1, 0, declarationElement);
            })
        }
        const importIndex = file.findIndex(x => /imports/.test(x));
        if (information.imports.length > 0) {
            information.imports.forEach(importElement => {
                file.splice(importIndex + 1, 0, importElement);
            })
        }
        const providerIndex = file.findIndex(x => /providers/.test(x));
        if (information.providers.length > 0) {
            information.providers.forEach(providerElement => {
                file.splice(providerIndex + 1, 0, providerElement);
            })
        }
        const bootstrapIndex = file.findIndex(x => /bootstrap/.test(x));
        if (information.bootstrap.length > 0) {
            information.bootstrap.forEach(boostrapElement => {
                file.splice(bootstrapIndex + 1, 0, boostrapElement);
            })
        }
        this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.APP_MODULE_FILENAME,
            file.join(`\n`), (response) => { })
    }

    // package.json file
    public modifyPackageFile(applicationPath, information) {
        const file = this.dependencySupportWorker.readFile(applicationPath, Constant.PACKAGE_JSON_FILENAME);
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
        this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.PACKAGE_JSON_FILENAME,
            file.join(`\n`), (response) => { })
    }

    // style.scss file
    public modifyGlobalStyles(applicationPath, information) {
        let file = this.dependencySupportWorker.readFile(applicationPath, Constant.STYLE_SCSS_FILENAME);
        if (information.import.length > 0) {
            file.splice(1, 0, information.import.join('\n'));
        }
        if (information.others.length > 0) {
            file = file.concat(information.others);
        }
         this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.STYLE_SCSS_FILENAME,
            file.join(`\n`), (response) => { })
    }
}