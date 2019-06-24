import { Request } from 'mongoose';
import * as asyncLoop from 'node-async-loop';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

import {
  FeatureManagerService,
  FlowManagerService,
  EntityManagerService,
  BackendGenManagerService,
  MicroFlowManagerService,

} from '../apiservices/index';
import { AuthGenService } from '../apiservices/authGenservice';
import { resolve } from 'url';

export class CodeGenerationService {

  private featureService = new FeatureManagerService();
  private entityService = new EntityManagerService();
  private backendService = new BackendGenManagerService();
  private flowService = new FlowManagerService();
  private microFlowService = new MicroFlowManagerService();
  private authGenService = new AuthGenService ()
  private clientObj: any = { 
    name: '',
    defaultHumanLanguage: '',
    otherHumanLanguage: '',
    projectPath: '',
    clientLanguage: '',
    clientFramework: '',
    features: []
  };
  private backendObj: any = {
    name: '',
    defaultHumanLanguage: '',
    otherHumanLanguage: '',
    projectPath: '',
    serverLanguage: '',
    serverFramework: '',
    serverDatabase: '',
    features: []
  };
  private clientArray: any[] = [];
  private backendArray: any[] = [];
  featureDetails: any;

  public async createProject(req: Request, callback: CallableFunction) {
    console.log("i am coming--->>>>")
    const projectId = req.query.projectId;
    const projectDetails = req.body;
    const projectPath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`;
    console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
    // this.createFolders(`../../../../../generatedcode/${projectDetails.name}`);
      const auth  = await this.authGenPath(projectId,projectDetails);
      console.log('i am auth ******---->>', auth)
    this.createFolders(projectPath);
    // get feature by projectId
    const features = await this.getFeatures(projectId);
    const FeatureJSON = JSON.parse(features.toString());
    console.log('get feature by project id are ------  ', features, '  length   ', FeatureJSON.body.length);
    asyncLoop(FeatureJSON.body, async (featureElement, next) => {
     
      console.log('starting feature each ovjes area--11----  ', featureElement, ' each feature length  ', featureElement.entities.length);
      const feature = {
        name: '',
        description: '',
        flows: [],
        entities: [],
        project: projectDetails
      }
      feature.name = featureElement.name;
      feature.description = featureElement.description;
      const flows = await this.getFlows(featureElement.flows);
      console.log('flows response rae -11----  ', flows);
      console.log('flows response rae --22---  ', JSON.parse(JSON.stringify(flows)).body);
      feature.flows = JSON.parse(JSON.stringify(flows)).body;
      
      // const entity = await this.getEntityById();
      if (featureElement.entities.length > 0) {
        console.log('entering into if condition 22 ');
        // featureElement.entities.forEach(async element => {
        //      const entity = await this.getEntityById(element.entityId);
        //      next();
        //      console.log('entities id of values are ------ ', entity);
        // });
        asyncLoop(featureElement.entities, async (featureEntity, entityNext) => {
          console.log('each feature entity ---33---  ', featureEntity);
          const entity = await this.getEntityById(featureEntity.entityId);
          console.log('each feature entity ----3.2111---  ', entity);
          feature.entities.push(JSON.parse(entity.toString()).body)
          // featureElement.entitiesItem.push(JSON.parse(entity.toString()));
          // console.log('each featureelemnt 2.88888 ---- ', featureElement);
          entityNext();
        }, async (entityErr) => {
          if (entityErr) {

          } else {
            console.log('async loop complated -44--- ', feature);
            const backendResponse = await this.backendGenProject(feature);
            console.log('backend response in code gen ------- - ', backendResponse);
            next();
          }
        }) // featu // featureElement.entities.forEach(async element => {
          //      const entity = await this.getEntityById(element.entityId);
          //      next();
          //      console.log('entities id of values are ------ ', entity);
          // });reElement.entities.forEach(async element => {
          //      const entity = await this.getEntityById(element.entityId);
          //      next();
          //      console.log('entities id of values are ------ ', entity);
          // });
      }
       else {
        next();
      }
      console.log('ending of loop ');
    }, (err) => {
      if (err) {

      } else {
        console.log('all featuers are completed');
        
        callback();
      }
      
    })


    callback()
  }

  getFeatures(projectId) {
    return new Promise(resolve => {
      this.featureService.getFeatureByProjectId(projectId, (data) => {
        resolve(data);
      })
    });
  }

  getFlows(flowIDs) {
    return new Promise(resolve => {
      this.flowService.getFlows(flowIDs, (data) => {
        resolve(data);
      })
    })
  }

  getFlowsByLanguage(flowIDs, language) {
    return new Promise(resolve => {
      this.flowService.getFlowsByLanguage(flowIDs, language, (data) => {
        resolve(data);
      })
    })
  }

  getEntityById(entityId) {
    return new Promise(resolve => {
      this.entityService.getEntityById(entityId, (data) => {
        resolve(data);
      })
    });
  }

  backendGenProject(data) {
    return new Promise(resolve => {
      this.backendService.BackendGenProject(data, (data) => {
        resolve(data);
      })
    })
  }

  authGenPath(projectId,projectDetails){
    console.log('i am auth gennnn--->>>')
    return new Promise(resolve => {
      this.authGenService.authPath(projectId , projectDetails , (data) => {
        resolve(data)
      })
    })
  }

  

  createFolders(pathElement) {
    // if (!fs.existsSync(path.join(__dirname, pathElement))) {
    //   fs.mkdirSync(path.join(__dirname, pathElement))
    // }
    if (pathElement) {
      fs.mkdirSync(pathElement)
    }
  };
}

//   public async createProjectCode(req: Request, callback: CallableFunction) {
//     const projectId = req.query.projectid;
//     const projectDetails = req.body;
//     const projectPath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`;
//     console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
//     // this.createFolders(projectPath);

//     // client object
//     this.clientObj.name = projectDetails.name;
//     this.clientObj.defaultHumanLanguage = projectDetails.defaultHumanLanguage;
//     this.clientObj.otherHumanLanguage = projectDetails.otherHumanLanguage;
//     this.clientObj.projectPath = projectPath;
//     this.clientObj.clientLanguage = projectDetails.clientLanguage;
//     this.clientObj.clientFramework = projectDetails.clientFramework;

//     // backend object
//     this.backendObj.name = projectDetails.name;
//     this.backendObj.defaultHumanLanguage = projectDetails.defaultHumanLanguage;
//     this.backendObj.otherHumanLanguage = projectDetails.otherHumanLanguage;
//     this.backendObj.projectPath = projectPath;
//     this.backendObj.serverLanguage = projectDetails.serverLanguage;
//     this.backendObj.serverFramework = projectDetails.serverFramework;
//     this.backendObj.serverDatabase = projectDetails.serverDatabase;

//     // get features based on project id
//     const features = await this.getFeatures(projectId);
//     console.log('get all featurea rea --22222--- ', features);

//     if (features !== undefined && features !== null) {
//       const featureJSON = JSON.parse(features.toString());
//       let count = 0;
//       asyncLoop(featureJSON, async (featureElement, next1) => {
//         featureElement = featureElement.value.reduce(function (obj, item) {
//           obj[item.key] = item.value;
//           return obj;
//         });
//         count++;
//         let clientFeatures = {
//           featureName: '',
//           flows: []
//         };
//         let backendFeatures = {
//           featureName: '',
//           flows: []
//         };
//         clientFeatures['featureName'] = backendFeatures['featureName'] = featureElement.feature_id.name;
//         // this.clientArray.push({'featureName': featureElement.feature_id.name});
//         // this.backendArray.push({'featureName': featureElement.feature_id.name});
//         if (featureElement.feature_id.api_mang_file !== null && featureElement.feature_id.front_mang_file !== null && featureElement.feature_id.backed_mang_file !== null) {
//           this.featureDetails = await this.getDetailsByFeatureId(featureElement.feature_id._id);
//         } else {
//           this.featureDetails = await this.getAllFeatureFlowByFeatureId(featureElement.feature_id._id);
//         }
//         const featureDetailsJSON = JSON.parse(this.featureDetails.toString());
//         console.log('detaials are ----1111-- ', featureDetailsJSON);
//         asyncLoop(featureDetailsJSON, async (flowElement, next2) => {
//           flowElement.value.map((data) => {
//             console.log(" = = = > > ", data)
//             flowElement = data;
//           })

//         //  ` asyncLoop(flowElement.value, async (flowElementValue,next3)=>{
//         //     console.log('i am the data u need',flowElementValue)
//         //   })`
//           // flowElement = flowElement.value.reduce(function (obj, item) {
//           //   obj[item.key] = item.value;
//           //   console.log('obj ++++++++',obj)
//           //   return obj;
//           // });
//           console.log('detaials are ----1111496294692-- ', flowElement.value);
//           if (flowElement !== undefined) {
//             let clientFlowDetails = {
//               name: '',
//               screenName: '',
//               type: '',
//               actionOnData: '',
//               createWithDefaultActivity: '',
//               description: '',
//               flowComponents: []
//             };
//             let backendFlowDetails = {
//               name: '',
//               screenName: '',
//               type: '',
//               actionOnData: '',
//               createWithDefaultActivity: '',
//               description: '',
//               flowComponents: []
//             };
//             // flows details
//             clientFlowDetails.name = backendFlowDetails.name = flowElement.flow.name;
//             clientFlowDetails.screenName = backendFlowDetails.screenName = flowElement.flow.screenName;
//             clientFlowDetails.type = backendFlowDetails.type = flowElement.flow.type;
//             clientFlowDetails.actionOnData = backendFlowDetails.actionOnData = flowElement.flow.actionOnData;
//             clientFlowDetails.createWithDefaultActivity = backendFlowDetails.createWithDefaultActivity = flowElement.flow.create_with_default_activity;
//             clientFlowDetails.description = backendFlowDetails.description = flowElement.flow.description;
//             console.log('flowElement.flow.name', flowElement.flow.name);
//             const tempFlow = await this.getFlowsByName(flowElement.flow.name);
//             const tempFlowJSON = JSON.parse(tempFlow.toString());
//             console.log(' temp flow json --22222222222--- ', util.inspect(tempFlowJSON, { showHidden: true, depth: null }));
//             console.log(' temp flow component name --33333--- ', tempFlowJSON.flow_comp_seq);
//             // const microFlow = await this.getFlowsByName(flowElement.flow.name);
//             // const microFlowJSON = JSON.parse(microFlow.toString());

//             let clientMicroFlowComponent = [];
//             let backendMicroFlowComponent = [];
//             if (tempFlowJSON.status !== 404 && tempFlowJSON !== undefined) {
//               console.log('entering into if condition')
//               asyncLoop(tempFlowJSON.flow_comp_seq, async (microFlowElement, next3) => {
//                 if (microFlowElement !== undefined) {
//                   let microFlowDetails = {
//                     name: '',
//                     type: '',
//                     sequence_id: '',
//                     description: '',
//                     default_connector: [],
//                     componentName: '',
//                     microFlows: []
//                   }
//                   const microFlow = await this.getMicroFlowByName(microFlowElement.component_name);
//                   const microFlowJSON = JSON.parse(microFlow.toString());
//                   console.log('microflow name == 4444 ----- ', util.inspect(microFlowJSON, { showHidden: true, depth: null }))
//                   if (microFlowElement.type === 'server') {
//                     microFlowDetails.name = microFlowElement.label;
//                     microFlowDetails.sequence_id = microFlowElement.sequence_id;
//                     microFlowDetails.type = microFlowElement.type;
//                     microFlowDetails.description = microFlowElement.description;
//                     microFlowDetails.componentName = microFlowElement.component_name;
//                     microFlowDetails.default_connector = microFlowElement.default_connector;
//                     microFlowDetails.microFlows = microFlowJSON;
//                     backendFlowDetails.flowComponents.push(microFlowDetails);
//                   } else if (microFlowElement.type === 'client') {
//                     microFlowDetails.name = microFlowElement.label;
//                     microFlowDetails.sequence_id = microFlowElement.sequence_id;
//                     microFlowDetails.type = microFlowElement.type;
//                     microFlowDetails.description = microFlowElement.description;
//                     microFlowDetails.componentName = microFlowElement.component_name;
//                     microFlowDetails.default_connector = microFlowElement.default_connector;
//                     microFlowDetails.microFlows = microFlowJSON;
//                     clientFlowDetails.flowComponents.push(microFlowDetails);
//                   } else {
//                     console.log('microflows cannot able to find');

//                   }
//                 }
//                 next3()
//               }, (err3) => {
//                 if (err3) {

//                 } else {
//                   clientFeatures.flows.push(clientFlowDetails);
//                   backendFeatures.flows.push(backendFlowDetails);
//                   next2();
//                 }
//               })
//             } else {
//               next2();
//             }
//           } else {
//             next2();
//           }
//         }, (err2) => {
//           if (err2) {

//           } else {
//             this.clientObj.features.push(clientFeatures);
//             this.backendObj.features.push(backendFeatures);
//             next1();
//           }
//         })
//         // const flows = await this.getFlowsByName(featureDetailsJSON[0].name);
//         // const flowsJSON = JSON.parse(flows.toString());
//         // console.log('detaials are ----2222-- ', count, '  ---  ', flowsJSON, ' --- ', flowsJSON.length);
//         // const microFlow = await this.getMicroFlowByName(flowsJSON.component_name);
//         // const microFlowJSON = JSON.parse(microFlow.toString());
//         // console.log('detaials are ----3333-- ', count, '  ---  ', microFlowJSON);

//       }, (err1) => {
//         if (err1) {

//         } else {
//           console.log('final callbacks are --@#$%%^^^-- ');
//           console.log('final callbacks are --clientfeatures-- ', util.inspect(this.clientObj, { showHidden: true, depth: null }));
//           console.log('final callbacks are --backendObject-- ', util.inspect(this.backendObj, { showHidden: true, depth: null }));
//           callback('success');
//         }
//       })
//       //  await featureJson.forEach(async featureElement => {
//       //     const featureDetail = await this.getDetailsByFeatureId(featureElement._id);
//       //     console.log('each feate details are ----- ', featureElement._id, ' -- ', featureDetail);
//       //   })
//     } else {
//       callback('features are empty for this project id is ', projectId);
//     }

//   }

//   getFeatures(projectId) {
//     return new Promise(resolve => {
//       this.featureService.getFeatureByProjectId(projectId, (data) => {
//         resolve(data);
//       })
//     });
//   }

//   getDetailsByFeatureId(featureId) {
//     return new Promise(resolve => {
//       this.featureService.getDetailByFeatureId(featureId, (data) => {
//         resolve(data);
//       })
//     })
//   }
//   getAllFeatureFlowByFeatureId(featureId) {
//     return new Promise(resolve => {
//       this.featureService.getAllFeatureFlowByFeatureId(featureId, (data) => {
//         resolve(data);
//       })
//     })
//   }

//   getFlowsByName(flowname) {
//     return new Promise(resolve => {
//       this.flowService.getFlowByName(flowname, (data) => {
//         resolve(data);
//       })
//     })
//   }

//   getMicroFlowByName(microFlowName) {
//     return new Promise(resolve => {
//       this.microFlowService.getMicroFlowByName(microFlowName, (data) => {
//         resolve(data);
//       })
//     })
//   }


// }



// // old don't delete


// // public async createProjectCode(req: Request, callback: CallableFunction) {
// //   const projectId = req.query.projectid;
// //   const projectDetails = req.body;
// //   const projectPath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`;
// //   console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
// //   // this.createFolders(projectPath);
// //   const features = await this.getFeatures(projectId);
// //   console.log('get all featurea rea --22222--- ', features);
// //   if (features !== undefined && features !== null) {
// //     const featureJSON = JSON.parse(features.toString());
// //     console.log('featurea json are ------------ ', featureJSON);
// //     let count = 0;
// //     asyncLoop(featureJSON, async (featureElement, next1) => {
// //       count++;
// //       const featureDetails = await this.getDetailsByFeatureId(featureElement.feature_id._id);
// //       const featureDetailsJSON = JSON.parse(featureDetails.toString());
// //       console.log('detaials are ----1111-- ', count, '  ---  ', util.inspect(featureDetailsJSON, { showHidden: true, depth: null }), '  --- ', featureDetailsJSON.length);
// //       asyncLoop(featureDetailsJSON, async (flowElement, next2) => {
// //         if (flowElement !== undefined) {
// //           const tempFlow = await this.getFlowsByName(flowElement.flow.name);
// //           const tempFlowJSON = JSON.parse(tempFlow.toString());
// //           console.log(' temp flow json --22222222222--- ', util.inspect(tempFlowJSON, { showHidden: true, depth: null }));
// //           next2();
// //         } else {
// //           next1();
// //         }
// //       }, (err2) => {
// //         if (err2) {

// //         } else {

// //         }
// //       })
// //       // const flows = await this.getFlowsByName(featureDetailsJSON[0].name);
// //       // const flowsJSON = JSON.parse(flows.toString());
// //       // console.log('detaials are ----2222-- ', count, '  ---  ', flowsJSON, ' --- ', flowsJSON.length);
// //       // const microFlow = await this.getMicroFlowByName(flowsJSON.component_name);
// //       // const microFlowJSON = JSON.parse(microFlow.toString());
// //       // console.log('detaials are ----3333-- ', count, '  ---  ', microFlowJSON);

// //     }, (err1) => {
// //       if (err1) {

// //       } else {
// //         console.log('final callbacks are ---- ');
// //         callback('success');
// //       }
// //     })
// //     //  await featureJson.forEach(async featureElement => {
// //     //     const featureDetail = await this.getDetailsByFeatureId(featureElement._id);
// //     //     console.log('each feate details are ----- ', featureElement._id, ' -- ', featureDetail);
// //     //   })
// //   } else {
// //     callback('features are empty for this project id is ', projectId);
// //   }

// // }