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
  AuthGenService
} from '../apiservices/index';
import { Common } from '../config/Common';

export class CodeGenerationService {

  private featureService = new FeatureManagerService();
  private entityService = new EntityManagerService();
  private backendService = new BackendGenManagerService();
  private flowService = new FlowManagerService();
  private authGenService = new AuthGenService ();
  private applicationPort = 8000;
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

  public async createProject(req: Request, callback: CallableFunction) {
    const projectId = req.query.projectId;
    const projectDetails = req.body;
    const projectPath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`;
    console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
    // this.createFolders(`../../../../../generatedcode/${projectDetails.name}`);
    const isPathCreated = Common.createFolders(projectPath);
    const auth  = await this.authGenPath(projectId,projectDetails);
    console.log('i am auth ******---->>', auth)
    console.log('path @!!!!!!!!!!!!!!!!!!!!!!! ------ ', isPathCreated);
    if(!isPathCreated) {
     return callback('code generation path may not be exist', 400);
    }
    // get feature by projectId
    const features = await this.getFeatures(projectId);
    const FeatureJSON = JSON.parse(features.toString());
    this.nodeResponse = [];
    console.log('get feature by project id are ------  ', features, '  length   ', FeatureJSON.body.length);
    if (FeatureJSON.body != undefined && FeatureJSON.body.length === 0) {
      callback('cannot able to find its features based on this project', 400);
    } else {
      try {
        asyncLoop(FeatureJSON.body, async (featureElement, next) => {

          console.log('starting feature each ovjes area--11----  ', featureElement, ' each feature length  ', featureElement.entities.length);

          const feature = {
            name: '',
            description: '',
            flows: [],
            entities: [],
            applicationPort: 0,
            project: projectDetails
          }
          feature.name = featureElement.name;
          feature.description = featureElement.description;
          const flows = await this.getFlows(featureElement.flows);
          console.log('flows response rae -11----  ', flows);
          console.log('flows response rae --22---  ', JSON.parse(JSON.stringify(flows)).body);
          feature.flows = JSON.parse(JSON.stringify(flows)).body;

          if (featureElement.entities.length > 0) {
            console.log('entering into if condition 22 ');
            asyncLoop(featureElement.entities, async (featureEntity, entityNext) => {
              console.log('each feature entity ---33---  ', featureEntity);
              const entity = await this.getEntityById(featureEntity.entityId);
              console.log('each feature entity ----3.2111---  ', entity);
              feature.entities.push(JSON.parse(entity.toString()).body)
              entityNext();
            }, async (entityErr) => {
              if (entityErr) {
                console.log('entity error first ');
              } else {
                try {
                  console.log('async loop complated -44--- ', feature);
                  feature.applicationPort = this.applicationPort;
                  const backendResponse = await this.backendGenProject(feature);
                  this.increaseBackendPortNumber();
                  console.log('backend response in code gen ------- - ', backendResponse);
                  console.log('backend response in code gen ------  ', util.inspect(backendResponse, { showHidden: true, depth: null }));
                  let temp;
                  temp = JSON.parse(JSON.stringify(backendResponse)).body.body;
                  console.log('after temp bodu bvalue are ----- ', temp);
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
                  // this.nodeResponse.push(temp[0]);
                  console.log('nodeResponse for each features ----  ', util.inspect(this.nodeResponse, { showHidden: true, depth: null }));
                  next();
                } catch (err1) {
                  console.log('errr111111111111111111111111');
                  console.log('errr111111111111111111111111 ---- ', err1);
                  callback('something went wrong in code generation manager after getting the response from backend generation manager', 400);
                }
              }
            })
          } else {
            next();
          }
          console.log('ending of loop ');
        }, (err) => {
          if (err) {
            console.log('err in loop are ---- ', err);
          } else {
            console.log('all featuers are completed ----  ', util.inspect(this.nodeResponse, { showHidden: true, depth: null }));
            // this.increaseBackendPortNumber();
            const temp = {
              projectPath: projectPath,
              applicationPort: this.applicationPort,
              project: projectDetails,
              nodeResponse: this.nodeResponse
            }
            this.generateApiGateway(temp);
            callback('code generation completed');
          }
        })
      } catch (err) {
        console.log('error in code generation manager --1111 main-- ');
        console.log('error in code generation manager ---- ', err);
        callback('something went wrong in code generation manager', 400);
      }
    }

    // callback()
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

  backendGenProject(details) {
    return new Promise(resolve => {
      this.backendService.BackendGenProject(details, (data) => {
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

  authGenPath(projectId,projectDetails){
    console.log('i am auth gennnn--->>>')
    return new Promise(resolve => {
      this.authGenService.authPath(projectId , projectDetails , (data) => {
        resolve(data)
      })
    })
  }

  increaseBackendPortNumber() {
    this.applicationPort++;
  }
}