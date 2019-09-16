import * as componentDependency from '../assets/componentDependency';
import { Constant } from '../config/Constant';

export class ElementRouteWorker {
    
    public checkGpRoute(routeObj, componentObject) {
        console.log('check gp route list are ---- ', routeObj);
        console.log('check componentObject list are ---- ', componentObject);
        routeObj.forEach(routeElement => {
            switch (routeElement.action) {
                case 'parent':
                    const parentTemp = componentDependency.component.find(x => x.name == Constant.ROUTER_DEPENDENCY_NAME);
                    this.setComponentHeader(parentTemp, componentObject);
                    this.setConstructorParams(parentTemp, componentObject);
                    this.setParentRoute(parentTemp, routeElement, componentObject)
                    break;
                case 'child':
                    const childTemp = componentDependency.component.find(x => x.name == Constant.ACTIVATEDROUTER_DEPENDENCY_NAME);
                    this.setComponentHeader(childTemp, componentObject);
                    this.setConstructorParams(childTemp, componentObject);
                    this.setChildRoute(childTemp, routeElement, componentObject);
                    console.log('after set child values are -----   ', componentObject);
                    break;
                default:
                    break;
            }
        })
    }

    private setComponentHeader(temp, componentObject) {
        componentObject.importDependency = componentObject.importDependency.concat(temp.componentDependencies);
    };

    private setConstructorParams(temp, componentObject) {
        temp.componentConstructor.forEach(paramElement => {
            const tempParams = `${Constant.PRIVATE_ACCESS_MODIFIER} ${paramElement.variableName}: ${paramElement.dependencyName}`;
            if (!componentObject.componentConstructorParams.find(x => x == tempParams)) {
                componentObject.componentConstructorParams.push(tempParams);
            }
        });
    };

    private setParentRoute(temp, routeElement, componentObject) {
        console.log('setParentRoute are ---- ', temp);
        let tempMethod = '';
        switch (routeElement.route.routeType) {
            case 'queryParameter':
                tempMethod = `${routeElement.route.methodName}(queryId) {`;
                tempMethod += `\nthis.${temp.componentConstructor[0].variableName}.navigate(['/${routeElement.route.screenName}'], { queryParams: { 'id': queryId } });`;
                tempMethod += `\n}`;
                componentObject.componentMethod.push(tempMethod);
                break;
            default:
                // none and default are same method
                tempMethod = `${routeElement.route.methodName}() {`;
                tempMethod += `\nthis.${temp.componentConstructor[0].variableName}.navigate(['/${routeElement.route.screenName}']);`;
                tempMethod += `\n}`;
                componentObject.componentMethod.push(tempMethod);
                break;
        }
    }

    private setChildRoute(temp, routeElement, componentObject) {
        let tempMethod = '';
        console.log('set child route temp are -----------  ', temp);
        console.log('set child route routeElement are -----------  ', routeElement);
        console.log('set child route componentObject are -----------  ', componentObject);
        switch (routeElement.route.routeType) {
            case 'queryParameter':
                tempMethod = `this.${temp.componentConstructor[0].variableName}`;
                tempMethod += `\n .queryParams`;
                tempMethod += `\n .subscribe(params => {`;
                tempMethod += `\n this.${Constant.QUERY_VARIABLE_NAME}${Constant.IDVARIABLE} = params.id;`;
                tempMethod += `\n this.${routeElement.route.screenFlowName}();`;
                tempMethod += `\n})`;
                componentObject.componentOnInit.push(tempMethod);

                // calling component method from ngOnInit method in same file --> future use
                // const callMethod = `\n    this.${routeElement.route.screenFlowName}(this.${Constant.QUERY_VARIABLE_NAME}${Constant.IDVARIABLE})`;
                // componentObject.componentOnInit.push(callMethod);

                // component variables 
                componentObject.componentVariable.push(`${Constant.QUERY_VARIABLE_NAME}${Constant.IDVARIABLE}: ${Constant.STRING_DATATYPE}`)
                break;
            default:
                // none and default are same method
                break;
        }
    }
}