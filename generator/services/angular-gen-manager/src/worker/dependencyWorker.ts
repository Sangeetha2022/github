import * as fs from 'fs';
import { DependencySupportWorker } from '../supportworker/dependencySupportWorker';
import { Constant } from '../config/Constant';

export class DependencyWorker {
    private dependencySupportWorker = new DependencySupportWorker();



    // app.routing file
    public modifyAppRouteFile(applicationPath, information) {
        const file = this.dependencySupportWorker.readFile(applicationPath, Constant.APP_ROUTING_FILENAME);
        console.log('after read app routing file are -----  ', file);
        const importIndex = file.findIndex(x => /const.*routes\:\s+Routes/.test(x));
        const pathIndex = file.findIndex(x => /];/.test(x));
        console.log('app routing file importIndex ---- ', importIndex, ' --pathIndex-- ', pathIndex);
        if (information.importDependency.length > 0) {
            information.importDependency.forEach((dependencyElement, elementIndex) => {
                file.splice(importIndex - 1, 0, dependencyElement);
                file.splice(pathIndex - 1, 0, information.routePath[elementIndex]);
            })
        }
        console.log('insert dependency app routing file are -----  ', file.join(`\n`));
        this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.APP_ROUTING_FILENAME,
            file.join(`\n`), (response) => { })
    }

    // app.module.ts file
    public modifyAppModuleFile(applicationPath, information) {
        const file = this.dependencySupportWorker.readFile(applicationPath, Constant.APP_MODULE_FILENAME);
        console.log('after read app module file are -----  ', file);
        const moduleIndex = file.findIndex(x => /@NgModule/.test(x));
        console.log('moduleIndex ---- ', moduleIndex);
        if (information.importDependency.length > 0) {
            information.importDependency.forEach(dependencyElement => {
                file.splice(moduleIndex - 1, 0, dependencyElement);
            })
        }
        const declarationIndex = file.findIndex(x => /declarations/.test(x));
        console.log('declarationIndex ---- ', declarationIndex);
        if (information.declarations.length > 0) {
            information.declarations.forEach(declarationElement => {
                file.splice(declarationIndex + 1, 0, declarationElement);
            })
        }
        const importIndex = file.findIndex(x => /imports/.test(x));
        console.log('importIndex ---- ', importIndex);
        if (information.imports.length > 0) {
            information.imports.forEach(importElement => {
                file.splice(importIndex + 1, 0, importElement);
            })
        }
        const providerIndex = file.findIndex(x => /providers/.test(x));
        console.log('providerIndex ---- ', providerIndex);
        if (information.providers.length > 0) {
            information.providers.forEach(providerElement => {
                file.splice(providerIndex + 1, 0, providerElement);
            })
        }
        const bootstrapIndex = file.findIndex(x => /bootstrap/.test(x));
        console.log('bootstrapIndex ---- ', bootstrapIndex);
        if (information.bootstrap.length > 0) {
            information.bootstrap.forEach(boostrapElement => {
                file.splice(bootstrapIndex + 1, 0, boostrapElement);
            })
        }
        console.log('insert other dependency app module file are -----  ', file.join(`\n`));
        this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.APP_MODULE_FILENAME,
            file.join(`\n`), (response) => { })
    }

    // package.json file
    public modifyPackageFile(applicationPath, information) {
        const file = this.dependencySupportWorker.readFile(applicationPath, Constant.PACKAGE_JSON_FILENAME);
        console.log('after read package json file are -----  ', file);
        const index = file.findIndex(x => /router/.test(x));
        if (index) {
            information.forEach(element => {
                const splitted = element.split(":");
                console.log('index a splitString ----  ', splitted[0]);
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
        console.log('modify global stlyes are ------  ', applicationPath);
        console.log('modify global stlyes information are ------  ', information);
        let file = this.dependencySupportWorker.readFile(applicationPath, Constant.STYLE_SCSS_FILENAME);
        console.log('readded files are -----  ', file);
        if (information.import.length > 0) {
            file.splice(1, 0, information.import.join('\n'));
        }
        if (information.others.length > 0) {
            file = file.concat(information.others);
        }
        // const index = file.findIndex(x => /router/.test(x));
        // if (index) {
        //     information.forEach(element => {
        //         const splitted = element.split(":");
        //         console.log('index a splitString ----  ', splitted[0]);
        //         const regExpression = new RegExp(splitted[0]);
        //         if (file.findIndex(x => regExpression.test(x)) < 0) {
        //             file.splice(index, 0, element);
        //         }

        //     })
        // }
        this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.STYLE_SCSS_FILENAME,
            file.join(`\n`), (response) => { })
    }
}