


export class Constants {

    public static appUrl: String;
    public static generationUrl: String;

    //app - declaration 
    public static projectUrl: String;
    public static entityUrl: String;
    public static screenUrl: String;
    public static featureUrl: String;
    public static flowUrl: String;
    public static microUrl: String;
    public static menuUrl: String;
    public static templateUrl: String;
    public static loginUrl: String;
    public static camundaUrl: String;
    public static proxyUrl: String;
    public static adminUrl: String;
    public static customConnectorUrl: String;
    public static deleteUrl: String;
    public static sharedUrl: String;


    //generator - declaration
    public static projectGenUrl: String;
    public static configUrl: String;
    public static codeGenUrl: String;
    public static backendGenUrl: String;
    public static datastoreGenUrl: String;
    public static mongoGenUrl: String;
    public static nodeGenUrl: String;
    public static frontendGenUrl: String;
    public static angularGenUrl: String;
    public static angularTemplateGenUrl: String;
    public static githubUrl: String;
    public static authgenUrl: String;
    public static swaggerGenUrl: String;
    // public static apiGatewayURL: String;

    constructor() {
        this.getURL();
    }

    public getURL() {

        switch (process.env.localname) {

            case process.env.name: Constants.appUrl = process.env.localUrl;
                Constants.generationUrl = process.env.localUrl;
                // app 
                Constants.projectUrl = process.env.projectmanager + ":3003";
                Constants.entityUrl = process.env.entitymanager + ":3005";
                Constants.screenUrl = process.env.screenmanager + ":3004";
                Constants.featureUrl = process.env.featuremanager + ":3006";
                Constants.flowUrl = process.env.flowmanager + ":3001";
                Constants.microUrl = process.env.microflowmanager + ":3002";
                Constants.menuUrl = process.env.menubuildermanager + ":3011";
                Constants.templateUrl = process.env.templatemanager + ":3012";
                Constants.loginUrl = process.env.securitymanager + ":3007";
                Constants.camundaUrl = process.env.camundasvc + ":3008";
                Constants.proxyUrl = process.env.authproxy + ":3009";
                Constants.adminUrl = Constants.appUrl + ":3010";
                Constants.customConnectorUrl = Constants.appUrl + ":3013";
                Constants.deleteUrl = process.env.deletemanager + ":3014";
                Constants.sharedUrl = Constants.appUrl + ":3050";

                //generator
                Constants.projectGenUrl = process.env.generationmanager + ":5000";
                Constants.configUrl = process.env.configmanager + ":5001";
                Constants.codeGenUrl = process.env.codegenmanager + ":5008";
                Constants.backendGenUrl = process.env.backendgenmanager + ":5009";
                Constants.datastoreGenUrl = process.env.datastoremanager + ":5010";
                Constants.mongoGenUrl = process.env.mongogenmanager + ":5011";
                Constants.nodeGenUrl = process.env.nodegenmanager + ":5012";
                Constants.frontendGenUrl = process.env.frontgenmanager + ":5013";
                Constants.angularGenUrl = process.env.angulargenmanager + ":5014";
                Constants.angularTemplateGenUrl = process.env.angtemplatemanager + ":5015";
                Constants.githubUrl = process.env.githubmanager + ":5016";
                Constants.authgenUrl = process.env.authgenmanager + ":5017";
                Constants.swaggerGenUrl = process.env.swaggergenmanager + ":5020";

                break;

            default: Constants.appUrl = process.env.liveappUrl;
                Constants.generationUrl = process.env.livegenerationUrl;

                // app 
                Constants.projectUrl = Constants.appUrl + ":3003";
                Constants.entityUrl = Constants.appUrl + ":3005";
                Constants.screenUrl = Constants.appUrl + ":3004";
                Constants.featureUrl = Constants.appUrl + ":3006";
                Constants.flowUrl = Constants.appUrl + ":3001";
                Constants.microUrl = Constants.appUrl + ":3002";
                Constants.menuUrl = Constants.appUrl + ":3011";
                Constants.templateUrl = Constants.appUrl + ":3012";
                Constants.loginUrl = Constants.appUrl + ":3007";
                Constants.camundaUrl = Constants.appUrl + ":3008";
                Constants.proxyUrl = Constants.appUrl + ":3009";
                Constants.adminUrl = Constants.appUrl + ":3010";
                Constants.customConnectorUrl = Constants.appUrl + ":3013";
                Constants.deleteUrl = Constants.appUrl + ":3014";
                Constants.sharedUrl = Constants.appUrl + ":3050";

                //generator
                Constants.projectGenUrl = Constants.generationUrl + ":5000";
                Constants.configUrl = Constants.generationUrl + ":5001";
                Constants.codeGenUrl = Constants.generationUrl + ":5008";
                Constants.backendGenUrl = Constants.generationUrl + ":5009";
                Constants.datastoreGenUrl = Constants.generationUrl + ":5010";
                Constants.mongoGenUrl = Constants.generationUrl + ":5011";
                Constants.nodeGenUrl = Constants.generationUrl + ":5012";
                Constants.frontendGenUrl = Constants.generationUrl + ":5013";
                Constants.angularGenUrl = Constants.generationUrl + ":5014";
                Constants.angularTemplateGenUrl = Constants.generationUrl + ":5015";
                Constants.githubUrl = Constants.generationUrl + ":5016";
                Constants.authgenUrl = Constants.generationUrl + ":5017";
                Constants.swaggerGenUrl = Constants.generationUrl + ":5020";

                break;
        }
    }
}



// //local
// // const appUrl = "http://localhost";
// // const generationUrl = "http://localhost";

// //kubernetes
// const appUrl = "http://gep-dev-app.gep-dev-201902.svc.cluster.local";
// const generationUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
// // app 
// export const projectUrl = appUrl + ":3003";
// export const entityUrl = appUrl + ":3005";
// export const screenUrl = appUrl + ":3004";
// export const featureUrl = appUrl + ":3006";
// export const flowUrl = appUrl + ":3001";
// export const microUrl = appUrl + ":3002";
// export const menuUrl = appUrl + ":3011";
// export const templateUrl = appUrl + ":3012";
// export const loginUrl = appUrl + ":3007";
// export const camundaUrl = appUrl + ":3008";
// export const proxyUrl = appUrl + ":3009";
// export const adminUrl = appUrl + ":3010";
// export const customConnectorUrl = appUrl + ":3013";
// export const deleteUrl = appUrl + ":3014";


// // generation
// export const projectGenUrl = generationUrl + ":5000";
// export const configUrl = generationUrl + ":5001";
// export const codeGenUrl = generationUrl + ":5008";
// export const backendGenUrl = generationUrl + ":5009";
// export const datastoreGenUrl = generationUrl + ":5010";
// export const mongoGenUrl = generationUrl + ":5011";
// export const nodeGenUrl = generationUrl + ":5012";
// export const frontendGenUrl = generationUrl + ":5013";
// export const angularGenUrl = generationUrl + ":5014";
// export const angularTemplateGenUrl = generationUrl + ":5015";
// export const githubUrl = generationUrl + ":5016";
// export const authgenUrl = generationUrl + ":5017";
