import * as util from 'util';
import { RouteSupportWorker } from '../supportworker/RouteSupportWorker';

let routeSupportWorker = new RouteSupportWorker();
export class RouteWorker {


    private tempRoutes = {
        GpStart: {
            dependencies: []
        },
        GpVariable:
        {
            insideClass: [],
            outsideClass: []
        },
        gpConnector: {},
        function: {
            routeUrl: '',
            apiAction: '',
            methodName: '',
            variableName: ''
        }
    }
    private flowDetail;
    private entitySchema;
    count = 0;

    createRoutes(flowDetail, entityElement, RoutesObj) {
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpStart(RoutesObj);
        this.gpVariableStatement(RoutesObj);
        this.flowRouting();
        return this.tempRoutes;
    }

    generateRouteFile(projectGenerationPath, templateLocationPath, Routes)   {
        const temp = {
            import: {
                dependencies: []
            },
            variable: {
                insideClass: [],
                outsideClass: []
            },
            flowAction: []
        }
        //    const RoutesPath = `${projectGenerationPath}/src/Routes`;
        Routes.forEach(RoutesElement => {
            RoutesElement.import.dependencies.forEach(dependency => {
                temp.import.dependencies.push(dependency);
            })
            RoutesElement.variable.insideClass.forEach(insideClassElement => {
                temp.variable.insideClass.push(insideClassElement);
            })
            RoutesElement.variable.outsideClass.forEach(outsideClassElement => {
                temp.variable.outsideClass.push(outsideClassElement);
            })
            RoutesElement.flowAction.forEach(flowElement => {
                temp.flowAction.push(flowElement);
            })
            routeSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, temp, (response) => {
                console.log('file generated and saved')
            })
        });
    }

                                                                                                                               
    gpStart(RoutesObj) {
        this.tempRoutes.GpStart.dependencies = [];                                                    
        const controllerIndex = RoutesObj.import.dependencies.findIndex(x => x.path == `../controller/${this.entitySchema.fileName}Controller`);
        if (controllerIndex < 0) {
            const tempImport = {
                name: '',
                path: ''
            }
            tempImport.name = `{ ${this.entitySchema.fileName}Controller }`;
            tempImport.path = `../controller/${this.entitySchema.fileName}Controller`;
            this.tempRoutes.GpStart.dependencies.push(tempImport);
        }
    }

    gpVariableStatement(RoutesObj) {
        this.tempRoutes.GpVariable.insideClass = [];
        this.tempRoutes.GpVariable.outsideClass = [];
        const tempVariable = {
            insideClass: {
                variableName: [],
                parentName: []
            },
            outsideClass: {
                variableName: [],
                parentName: []
            }
        }
        const insideClassIndex = RoutesObj.variable.insideClass.findIndex(x => x.parentName == `new ${this.entitySchema.fileName}Controller()`);
        if (insideClassIndex < 0) {
            const temp = {
                variableName: '',
                parentName: ''
            }
            temp.variableName = `${this.entitySchema.fileName}: ${this.entitySchema.fileName}Controller`;
            temp.parentName = `new ${this.entitySchema.fileName}Controller()`;
            this.tempRoutes.GpVariable.insideClass.push(temp);
        }

    }

    flowRouting() {
        console.log("Routing-------name----------", this.entitySchema)
        this.tempRoutes.function.methodName = '';
        this.tempRoutes.function.variableName = '';
        this.tempRoutes.function.routeUrl = '';
        this.tempRoutes.function.apiAction = '';
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}`;
                this.tempRoutes.function.apiAction = `post`;
                this.tempRoutes.function.methodName = `${this.entitySchema.fileName}_post`;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpSearch':
                // search and getNounById both are same
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/search`;
                this.tempRoutes.function.apiAction = `get`;
                this.tempRoutes.function.methodName = `${this.entitySchema.fileName}_search`;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpUpdate':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}`;
                this.tempRoutes.function.apiAction = `put`;
                this.tempRoutes.function.methodName = `${this.entitySchema.fileName}_put`
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpDelete':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/:id`;
                this.tempRoutes.function.apiAction = `delete`;
                this.tempRoutes.function.methodName = `${this.entitySchema.fileName}_delete`
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpGetAllValues':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}`;
                this.tempRoutes.function.apiAction = `get`;
                this.tempRoutes.function.methodName = `${this.entitySchema.fileName}_get`;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpSearchDetail':
                break;
            case 'GpSearchForUpdate':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/get/update`;
                this.tempRoutes.function.apiAction = `put`;
                this.tempRoutes.function.methodName = this.flowDetail.actionOnData;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpDeleteNounRelationship':
                break;
            case 'GpFileUpload':
                break;
            case 'GpDeleteNounByRelation':
                break;
            case 'GpCancel':
                break;
            case 'GpGetNounFromRelation':
                break;
            case 'GpAppStartup':
                break;
            case 'GpGridExportCSV':
                break;
            case 'GpCreateRelationship':
                break;
            case 'GpRecordVideo':
                break;
            case 'GpGetNounByRelationship':
                break;
            case 'GpTakePhoto':
                break;
            case 'GpCustom':
                break;
            case 'GpGetNounById':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/:id`;
                this.tempRoutes.function.apiAction = `get`;
                this.tempRoutes.function.methodName = `${this.entitySchema.fileName}_getNounById`;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpDeleteByParentId':
                break;
            case 'GpGetNounByParentId':
                break;
            default:
                break;

        }
    }

}