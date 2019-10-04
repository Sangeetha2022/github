
//local
const appUrl = "http://localhost";
const generationUrl = "http://localhost";

//kubernetes
// const appUrl = "http://gep-dev-app.gep-dev-201902.svc.cluster.local";
// const generationUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
// app 
export const projectUrl = appUrl + ":3003";
export const entityUrl = appUrl + ":3005";
export const screenUrl = appUrl + ":3004";
export const featureUrl = appUrl + ":3006";
export const flowUrl = appUrl + ":3001";
export const microUrl = appUrl + ":3002";
export const menuUrl = appUrl + ":3011";
export const templateUrl = appUrl + ":3012";
export const loginUrl = appUrl + ":3007";
export const camundaUrl = appUrl + ":3008";
export const proxyUrl = appUrl + ":3009";
export const adminUrl = appUrl + ":3010";
export const customConnectorUrl = appUrl + ":3013";
export const deleteUrl = appUrl + ":3014";


// generation
export const projectGenUrl = generationUrl + ":5000";
export const configUrl = generationUrl + ":5001";
export const codeGenUrl = generationUrl + ":5008";
export const backendGenUrl = generationUrl + ":5009";
export const datastoreGenUrl = generationUrl + ":5010";
export const mongoGenUrl = generationUrl + ":5011";
export const nodeGenUrl = generationUrl + ":5012";
export const frontendGenUrl = generationUrl + ":5013";
export const angularGenUrl = generationUrl + ":5014";
export const angularTemplateGenUrl = generationUrl + ":5015";
export const githubUrl = generationUrl + ":5016";
export const authgenUrl = generationUrl + ":5017";
