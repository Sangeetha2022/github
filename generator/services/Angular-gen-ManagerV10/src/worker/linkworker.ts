import { Constant } from "../config/Constant";

export class LinkWorker {
    // private dependencySupportWorker = new DependencySupportWorker();

    // addComponentLink(applicationPath, templatePath, linkInfo) {
    //     console.log('add component linked info are- ', linkInfo);
    //     const tsFileName = `${linkInfo.screenName}.component.ts`;
    //     const result = this.dependencySupportWorker.readFile(applicationPath, `${linkInfo.screenName}/${tsFileName}`);
    //     console.log('isDependedComponent result are --- ', result)
    //     if (result && result.length > 0) {
    //         console.log('linkinfo if condition')
    //         return this.readOnInit(`${applicationPath}/${linkInfo.screenName}`, tsFileName, linkInfo, result);
    //     } else {
    //         console.log('linkinfo else condition')
    //         return false;
    //     }
    // }

    // readOnInit(applicationPath, fileName, linkInfo, result) {
    //     const index = result.findIndex(x => /ngOnInit()/.test(x));
    //     console.log('readOnInit are -----  ', index, ' linkInfo ', linkInfo, '  result   ', result);
    //     const activatedRoute = component.find(x => x.name === Constant.ACTIVATEDROUTER_DEPENDENCY_NAME);
    //     const routeComponentDependency = `import { ${activatedRoute.componentDependencies[0].dependencyName} } from '${activatedRoute.componentDependencies[0].dependencyPath}';`;
    //     const queryActivatedRoute = `${activatedRoute.componentConstructor[0].variableName}.queryParams`;
    //     const routeConstructorParams = `private ${activatedRoute.name}: ${activatedRoute.componentDependencies[0].dependencyName}`
    //     const constructorRegex = /constructor\(/g;
    //     const bracesRegex = /}/g;
    //     const routeRegex = new RegExp(routeComponentDependency);
    //     const queryRegex = new RegExp(queryActivatedRoute);
    //     const constructorValueRegex = new RegExp(routeConstructorParams);

    //     let queryString = '';
    //     linkInfo.params.forEach(element => {
    //         queryString += `  this.${element.name} = params.${element.name};\n`;
    //     });
    //     if (index > -1) {
    //         const temp = result.slice(index).findIndex(x => bracesRegex.test(x));
    //         console.log('result splice temp are ---- ', result.slice(index + 2), '   ', temp);
    //         const initContent = result.slice(index + 1, index + temp);
    //         const test = result.splice(index + 1, temp - 1);
    //         console.log('testttttttttt =====  ', test);
    //         console.log('routeRegex rr---- ', result.findIndex(x => routeRegex.test(x)), '  initContent ', initContent);
    //         queryString += initContent.join('\n');
    //         if (result.findIndex(x => routeRegex.test(x)) < 0) {
    //             result.splice(1, 0, routeComponentDependency);
    //         }
    //         console.log('queryRegex rr---- ', result.findIndex(x => queryRegex.test(x)));
    //         if (result.findIndex(x => queryRegex.test(x)) < 0) {

    //             result.splice(index + 2, 0, `  this.${queryActivatedRoute}.subscribe(params => {\n ${queryString} \n});`);

    //         }
    //         const constructorParams = result.findIndex(x => constructorRegex.test(x));
    //         console.log('constructorParams ---------   ', constructorParams);
    //         if (constructorParams > -1) {
    //             console.log('entering inside of constparams are -constructorValueRegex-- ', constructorValueRegex, '     ', result.findIndex(x => constructorValueRegex.test(x)))
    //             if (result.findIndex(x => constructorValueRegex.test(x)) < 0) {
    //                 console.log('entered');
    //                 result.splice(constructorParams + 1, 0, `${routeConstructorParams},`);
    //             }
    //         }
    //         this.dependencySupportWorker.writeStaticFile(applicationPath, fileName,
    //             result.join('\n'), (response) => { });
    //         return true;
    //     }

    // }
}