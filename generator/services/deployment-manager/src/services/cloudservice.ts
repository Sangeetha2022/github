import { Request } from 'express';
import { DeploymentManagerService } from '../apiservices/awsDeployementManagerService';
export class CloudService {

  deploymentService = new DeploymentManagerService();

  public async createProject(req: Request, callback: CallableFunction) {
    const details = req.body;
    try {
      if (details.deploymentType.label === 'AWS' && details.deploymentTarget.label === 'Live') {
        console.log('AWS cloud infrastructure is selected and live deployment', details)
        const mongo = await this.aws_deployment(details);
        callback(mongo);
      }
      else if (details.deploymentType.label === 'AWS' && details.deploymentTarget.label === 'Local Machine') {
        console.log('AWS cloud infrastructure is selected and local machine deployment', details)
        const mongo = await this.aws_deployment_local(details);
        callback(mongo);

      }
    } catch (error) {
      callback('Something went wrong in deployment manager microservices', error);
    }
  }

  // for aws live
  aws_deployment(details) {
    return new Promise(resolve => {
      this.deploymentService.aws_deployment_live(details, (data) => {
        console.log('Here the data form aws_deployment_manager', data)
        resolve(data);
      })
    })
  }
  // for aws local
  aws_deployment_local(details) {
    return new Promise(resolve => {
      this.deploymentService.aws_deployment_local(details, (data) => {
        console.log('Here the data form aws_deployment_manager', data)
        resolve(data);
      })
    })
  }
}