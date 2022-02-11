import { Request } from 'express';
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
  AuthGenService,
  FrontendGenManagerService
} from '../apiservices/index';
import { Common } from '../config/Common';
export class CodeGenerationService {

  private featureService = new FeatureManagerService();
  private entityService = new EntityManagerService();
  private backendService = new BackendGenManagerService();
  private flowService = new FlowManagerService();
  private authGenService = new AuthGenService();
  private frontendGenService = new FrontendGenManagerService();
  private NODE_PORT_NUMBER = 8010;
  private APIGATEWAY_PORT_NUMBER = 8000;
  private LOCALHOST = 'localhost';

  // folderName
  private APPLICATION_FOLDERNAME = 'application';
  private CLIENT_FOLDERNAME = 'client';
  private SERVICE_FOLDERNAME = 'services';
  private DEFAULT_SERVICE_FOLDERNAME = 'default_services';
  private CUSTOM_SERVICE_FOLDERNAME = 'custom_services';
  // private DESKTOP_FOLDERNAME = 'web';
  // private MOBILE_FOLDERNAME = 'mobile';


  // private api
  // private microFlowService = new MicroFlowManagerService();
  // private clientObj: any = {
  //   name: '',
  //   defaultHumanLanguage: '',
  //   otherHumanLanguage: '',
  //   projectPath: '',
  //   clientLanguage: '',
  //   clientFramework: '',
  //   features: []
  // };
  // private backendObj: any = {  // private backendObj: any = {

  //   name: '',
  //   defaultHumanLanguage: '',
  //   otherHumanLanguage: '',
  //   projectPath: '',
  //   serverLanguage: '',
  //   serverFramework: '',
  //   serverDatabase: '',
  //   features: []
  // };
  // private clientArray: any[] = [];
  // private backendArray: any[] = [];
  featureDetails: any;
  private nodeResponse: any[] = [];
  extfeatureresponse: any = {
    type: '',
    value: ''
  };

  public async createProject(req: Request, callback: CallableFunction) {
    const projectId = req.query.projectId;
    const projectDetails = req.body;
    // const auth_templatepath = req.body.authorizationtemppath;
    console.log('--------projectdetails0-----', projectDetails);
    this.nodeResponse = [];
    let projectPath = `${projectDetails.projectGenerationPath}/${projectDetails.project_unique_id}`;
    console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
    // this.createFolders(`../../../../../generatedcode/${projectDetails.name}`);
    const isPathCreated = Common.createFolders(projectPath);
    projectPath += `/${this.APPLICATION_FOLDERNAME}`;
    Common.createFolders(projectPath);
    const applicationServicePath = `${projectPath}/${this.SERVICE_FOLDERNAME}`;
    console.log("applicationServicePath------------->", applicationServicePath);
    Common.createFolders(applicationServicePath);
    try {
      console.log('i am auth ******---->>', projectPath);
      const auth = await this.authGenPath(projectId, `${applicationServicePath}/${this.DEFAULT_SERVICE_FOLDERNAME}`,
      projectDetails.templateLocation.authTemplatePath,
      projectDetails.templateLocation.authorizationTempPath, projectDetails.name).catch(error => {
        console.log('cannot able to create the auth files');
      });
      console.log('auth', auth);
      let authJSON = null;
      if (auth) {
        authJSON = JSON.parse(auth.toString());
      }
      console.log('-------auth gen manager------ ', authJSON);
      console.log('-------auth gen manager---body--- ', authJSON.body);
      console.log('-------auth gen manager---body-constructor-- ', (authJSON.body.constructor === Array));
      if (authJSON.body.constructor === Array) {
        this.nodeResponse = authJSON.body;
      }
    } catch {
      console.log('auth generation manager microservices might be down #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    }
    console.log('path @!!!!!!!!!!!!!!!!!!!!!!! ------ ', isPathCreated);
    if (!isPathCreated) {
      return callback('code generation path may not be exist', 400);
    }
    const features = await this.getFeatures(projectId);
    const FeatureJSON = JSON.parse(features.toString());

    // generate template with basic auth 
    const templateObj = {
      projectId: projectId,
      sharedUrl: this.LOCALHOST,
      apigatewayPortNumber: this.APIGATEWAY_PORT_NUMBER,
      projectGenerationPath: `${projectPath}/${this.CLIENT_FOLDERNAME}`,
      seedTemplatePath: projectDetails.templateLocation.authTemplatePath,
      authTemplatePath: projectDetails.templateLocation.authorizationTempPath,
      project: projectDetails,
      feature: FeatureJSON
    }
    // angular template
    try {
      await this.frontendTemplateProject(templateObj);
    } catch {
      console.log('cannot able to create the angular template');
    }
    // ionic template
    try {
      await this.frontendIonicTemplateProject(templateObj);
    } catch {
      console.log('cannot able to create the ionic template');
    }
    // get feature by projectId
    console.log('before getting project features ');
    console.log('get feature by project id are ------  ', features, '  length   ', FeatureJSON.body.length);
    if (FeatureJSON.body != undefined && FeatureJSON.body.length === 0) {
      console.log('cannot able to find its features based on this project', 400);
      const backendAdminManagerResponse = await this.adminBackendManager(features, projectId, `${applicationServicePath}/${this.DEFAULT_SERVICE_FOLDERNAME}`, projectDetails.templateLocation.adminManagerTemplatePath).catch(
        err => {
          console.log('cannot able to geneate the Admin Manager services');

        })
      console.log('-------backend adminManager response without features----', backendAdminManagerResponse);

    }
    try {
      asyncLoop(FeatureJSON.body, async (featureElement, next) => {
        console.log('feature element async loop --------  ', featureElement);
        // console.log('starting feature each ovjes area--11----  ', featureElement, ' each feature length  ', featureElement.entities.length);
        if (featureElement === undefined) {
          next();
        } else {
          const feature = {
            id: '',
            name: '',
            description: '',
            flows: [],
            entities: [],
            applicationPort: 0,
            projectGenerationPath: `${applicationServicePath}/${this.CUSTOM_SERVICE_FOLDERNAME}`,
            project: projectDetails,
            externalfeatureconfig: {
              featurename: '',
              featuretype: '',
              externalfeatureconfig_id: '',
            }
          }
          feature.id = featureElement._id;
          feature.name = featureElement.name;
          feature.description = featureElement.description;
          if (featureElement.type === 'external') {
            feature.externalfeatureconfig.featurename = featureElement.name;
            feature.externalfeatureconfig.featuretype = featureElement.type;
            feature.externalfeatureconfig.externalfeatureconfig_id = featureElement.externalfeatureconfig;
          }
          const flows = await this.getProjectFlows(featureElement.flows).catch(err => { console.log('cannot able to get the flows') });
          // console.log('flows response rae -11----  ', flows);
          if (flows) {
            feature.flows = JSON.parse(JSON.stringify(flows)).body;
          }
          console.log('-----featureelements------', featureElement.entities.length);
          if (featureElement.entities.length > 0) {
            asyncLoop(featureElement.entities, async (featureEntity, entityNext) => {
              console.log('each feature entity ---33---  ', featureEntity);
              const entity = await this.getEntityById(featureEntity.entityId);
              let entityObject: any = JSON.parse(entity.toString()).body;
              entityObject.entity_type = featureEntity.entityType;
              console.log('each feature entity ----3.2111---  ', entity);
              feature.entities.push(entityObject);
              entityNext();
            }, async (entityErr) => {
              if (entityErr) {
                console.log('entity error first ');
              } else {
                try {
                  console.log('async loop complated -44--- ', feature);
                  feature.applicationPort = this.NODE_PORT_NUMBER;
                  const backendResponse = await this.backendGenProject(feature).catch(
                    err => {
                      console.log('cannot able to geneate the backend node services');
                    }
                  );
                  const backendAdminManagerResponse = await this.adminBackendManager(features, projectId, `${projectPath}/${this.SERVICE_FOLDERNAME}`, projectDetails.templateLocation.adminManagerTemplatePath).catch(
                    err => {
                      console.log('cannot able to geneate the Admin Manager services');

                    }
                  )
                  console.log('-------backend adminManager response----', backendAdminManagerResponse);
                  this.increaseBackendPortNumber();
                  console.log('backend response in code gen -------', backendResponse);
                  console.log('backend response in code gen ------', util.inspect(backendResponse, { showHidden: true, depth: null }));
                  let temp;
                  temp = JSON.parse(JSON.stringify(backendResponse)).body.body;
                  console.log('after temp bodu bvalue are ----- ', temp, ' ---typeof----  ', typeof temp);
                  // if(temp != undefined) {
                  //   console.log('entering into if conditin');
                  //   temp = temp.body;
                  // } else if (temp != undefined && temp.code == 500) {
                  //   console.log('entering into else if conditin');
                  //   callback();
                  //   // throw new Error('cannot able to get the data from node generator');
                  //   // callback(temp);
                  // } else {
                  //   console.log('entering into else conditin');
                  //   callback();
                  //   // throw new Error('cannot able to get the data from node generator');
                  //   // callback();
                  // }
                  console.log('after if executed')
                  // with entities generate the frontend screens
                  const frontendObj = {
                    projectGenerationPath: `${projectPath}/${this.CLIENT_FOLDERNAME}`,
                    projectId: projectId,
                    feature: feature,
                    project: projectDetails,
                    nodeResponse: null
                  }
                  if (temp != undefined && temp.length > 0 && typeof temp !== 'string') {
                    this.nodeResponse.push(temp[0]);
                    frontendObj.nodeResponse = temp[0];
                  }
                  console.log('nodeResponse for each features ----  ', util.inspect(this.nodeResponse, { showHidden: true, depth: null }));
                  // front generation manager
                  const frontendResponse = await this.frontendGenProject(frontendObj).catch(err => {
                    console.log('cannot able to generate the frontend component for each screens');
                  });
                  console.log('get response from frontend feature screens with entities');
                  next();
                } catch (err1) {
                  console.log('errr111111111111111111111111');
                  console.log('errr111111111111111111111111 ---- ', err1);
                  console.error('something went wrong in code generation manager after getting the response from backend generation manager', 400);
                }
              }
            })            
            /** The below else if condition is for generating the external features to understand them please check the issue #604 
            * in github and also please speak with Dan Castillo before changing this part of code Dev Kishan Dec 10th 2020 */
          } else if (featureElement.type === 'external') {
            console.log('-----coming here for external feature', feature);
            const extfeaturebackendResponse = await this.backendGenProject(feature).catch(
              err => {
                console.log('cannot able to geneate the backend node services');
              }
            );
            this.extfeatureresponse.type = featureElement.type;
            this.extfeatureresponse.value = extfeaturebackendResponse['body'].body.value;
            this.nodeResponse.push(this.extfeatureresponse);
            console.log('------External feature backend code generation response-----', extfeaturebackendResponse['body'].body.value);
            next();
          }else {
            // without entities generate the frontend screens
            const frontendObj = {
              projectGenerationPath: `${projectPath}/${this.CLIENT_FOLDERNAME}`,
              projectId: projectId,
              feature: feature,
              project: projectDetails,
              nodeResponse: null
            }
            console.log('generate the feature screen without entities ----  ');
            // front generation manager
            const frontendResponse = await this.frontendGenProject(frontendObj).catch(err => {
              console.log('cannot able to generate the frontend component for each screens');
            });
            console.log('get response from frontend feature screens without entities');
            next();
          }
        }
      }, async (err) => {
        if (err) {
          console.log('err in loop are ---- ', err);
        } else {
          console.log('all featuers are completed ----  ', util.inspect(this.nodeResponse, { showHidden: true, depth: null }));
          // this.increaseBackendPortNumber();
          const temp = {
            projectPath: projectPath,
            applicationPort: this.APIGATEWAY_PORT_NUMBER,
            projectGenerationPath: `${applicationServicePath}/${this.CUSTOM_SERVICE_FOLDERNAME}`,
            project: projectDetails,
            feature: FeatureJSON,
            nodeResponse: this.nodeResponse
          }
          console.log('code generation apigateway services before create gateway are ----- ', temp);
          await this.generateApiGateway(temp).catch(err => {
            console.log('cannot able to generate the api gateway node services');
          });
          callback(this.nodeResponse);
        }
      })
    } catch (err) {
      console.log('error in code generation manager --1111 main-- ');
      console.log('error in code generation manager ---- ', err);
      callback('something went wrong in code generation manager', 400);
    }
  }

  getFeatures(projectId) {
    return new Promise(resolve => {
      this.featureService.getFeatureByProjectId(projectId, (data) => {
        resolve(data);
      })
    });
  }

  getProjectFlows(flowIDs) {
    return new Promise(resolve => {
      this.flowService.getProjectFlows(flowIDs, (data) => {
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

  backendGenProject(details) {
    return new Promise(resolve => {
      this.backendService.BackendGenProject(details, (data) => {
        resolve(data);
      })
    })
  }

  frontendGenProject(details) {
    return new Promise(resolve => {
      this.frontendGenService.FrontendGenProject(details, (data) => {
        resolve(data);
      })
    })
  }

  frontendTemplateProject(details) {
    return new Promise(resolve => {
      this.frontendGenService.FrontendTemplateProject(details, (data) => {
        resolve(data);
      })
    })
  }

  frontendIonicTemplateProject(details) {
    return new Promise(resolve => {
      this.frontendGenService.FrontendIonicTemplateProject(details, (data) => {
        resolve(data);
      })
    })
  }

  generateApiGateway(details) {
    return new Promise(resolve => {
      this.backendService.generateApiGateway(details, (data) => {
        resolve(data);
      })
    })
  }

  authGenPath(projectId, projectGenerationPath, authPath, auth_templatepath, projectName) {
    return new Promise(resolve => {
      this.authGenService.authPath(projectId, projectGenerationPath, authPath, auth_templatepath, projectName, (data) => {
        resolve(data)
      })
    })
  }

  adminBackendManager(feature, projectId, projectGenerationPath, seedpath) {
    const admindata = {
      feature: feature,
      projectId: projectId,
      projectgenpath: projectGenerationPath,
      seed: seedpath
    };
    return new Promise(resolve => {
      this.backendService.backendAdminManager(admindata, (data) => {
        resolve(data);
      })
    })
  }
  increaseBackendPortNumber() {
    this.NODE_PORT_NUMBER++;
  }
}