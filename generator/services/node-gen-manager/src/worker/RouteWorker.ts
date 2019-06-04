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
        console.log('Routes worker start --- ', flowDetail);
        console.log('Routes worker entityElement value ----->>>>  ', entityElement);
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpStart(RoutesObj);
        this.gpVariableStatement(RoutesObj);
        this.flowRouting();
        console.log('final create Routes values are -----   ', this.tempRoutes);
        return this.tempRoutes;
    }

    generateRouteFile(projectGenerationPath, templateLocationPath, Routes) {
        console.log('projectGenerationPath in Routes worker ---- ', projectGenerationPath);
        console.log('templateLocationPath in Routes worker ---- ', templateLocationPath);
        console.log('Routes worker ---- ', util.inspect(Routes, { showHidden: true, depth: null }));
    //    const RoutesPath = `${projectGenerationPath}/src/Routes`;
        Routes.forEach(RoutesElement => {
            routeSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, RoutesElement, (response) => {
                console.log('file generated and saved')
            })
        });
    }


    gpStart(RoutesObj) {
        this.tempRoutes.GpStart.dependencies = [];
        // default
        // const tempImport.dependencyName.findIndex();
        console.log(`RoutesObjcec are om count ${this.count} `, RoutesObj);
        // const mongoPathIndex = RoutesObj.import.dependencies.findIndex(x => x.path == `mongoose`);
        // // const entityPathIndex = RoutesObj.import.dependencyPath.findIndex(x => x == `../models/${this.entitySchema.fileName}`);
        // if (mongoPathIndex < 0) {
        //     // tempImport.dependencyName.push(`* as mongoose`);
        //     // tempImport.dependencyPath.push(`mongoose`);
        //     const tempImport = {
        //         name: '',
        //         path: ''
        //     }
        //     tempImport.name = `* as mongoose`;
        //     tempImport.path = `mongoose`;
        //     this.tempRoutes.GpStart.dependencies.push(tempImport);
        // }

        const controllerIndex = RoutesObj.import.dependencies.findIndex(x => x.path == `../controller/${this.entitySchema.fileName}Controller`);
        if (controllerIndex < 0) {
            // tempImport.dependencyName.push(`{ ${this.entitySchema.modelName} }`);
            console.log(`entityPath inded ar e------  count ${this.count} `, controllerIndex, '  -----  ', `../controller/${this.entitySchema.fileName}Controller`);
            // tempImport.dependencyPath.push(`../models/${this.entitySchema.fileName}`);
            const tempImport = {
                name: '',
                path: ''
            }
            tempImport.name = `{ ${this.entitySchema.fileName}Controller }`;
            tempImport.path = `../controller/${this.entitySchema.fileName}Controller`;
            this.tempRoutes.GpStart.dependencies.push(tempImport);
        }

        // this.importEntitySchema(tempImport, null, 'import');
        // this.tempRoutes.GpStart = tempImport;
        this.count++;
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

        // this.importEntitySchema(null, tempVariable, 'variable');
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ==11=== ', this.entitySchema.modelName);
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ===22== ', RoutesObj.variable.insideClass.parentName);
        const insideClassIndex = RoutesObj.variable.insideClass.findIndex(x => x.parentName == `new ${this.entitySchema.fileName}Controller()`);
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ===33== ', insideClassIndex);
        if (insideClassIndex < 0) {
            const temp = {
                variableName: '',
                parentName: ''
            }
            temp.variableName = `${this.entitySchema.fileName}: ${this.entitySchema.fileName}Controller`;
            temp.parentName = `new ${this.entitySchema.fileName}Controller()`;
            // tempVariable.insideClass.variableName.push(this.entitySchema.fileName);
            // tempVariable.insideClass.parentName.push(this.entitySchema.modelName);
            this.tempRoutes.GpVariable.insideClass.push(temp);
        }

    }

    flowRouting() {
        this.tempRoutes.function.methodName = '';
        this.tempRoutes.function.variableName = '';
        this.tempRoutes.function.routeUrl = '';
        this.tempRoutes.function.apiAction = '';
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/save`;
                this.tempRoutes.function.apiAction = `post`;
                this.tempRoutes.function.methodName = this.flowDetail.actionOnData;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpSearch':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/get/:id`;
                this.tempRoutes.function.apiAction = `get`;
                this.tempRoutes.function.methodName = this.flowDetail.actionOnData;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpUpdate':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/update`;
                this.tempRoutes.function.apiAction = `put`;
                this.tempRoutes.function.methodName = this.flowDetail.actionOnData;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpDelete':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/delete/:id`;
                this.tempRoutes.function.apiAction = `delete`;
                this.tempRoutes.function.methodName = this.flowDetail.actionOnData;
                this.tempRoutes.function.variableName = this.entitySchema.fileName;
                break;
            case 'GpGetAllValues':
                this.tempRoutes.function.routeUrl = `/${this.entitySchema.fileName}/get`;
                this.tempRoutes.function.apiAction = `get`;
                this.tempRoutes.function.methodName = this.flowDetail.actionOnData;
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