import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../config/Constant';
import { Observable } from 'rxjs';

@Injectable
({
  providedIn: 'root'
})

export class TemplateManagerService 
{
  constructor(private api: ApiService, private restapi: SharedService) { }
  getProjectTemplate(projectId: string, logId: string | null): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectTemplate}/${projectId}?log_id=${logId}`);
  }

  updateProjectTemplate(body:any, id:any, logId:string): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.updateProjectTemplate}/${id}?log_id=${logId}`, body);
  }

  getGepTemplate(templateName:string, logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateByName}?template_name=${templateName}&log_id=${logId}`);
  }

  updateProjectById(projectId: String, projectDetails: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateProjectById}/${projectId}` + `?log_id=${logId}`, projectDetails);
  }

  getProjectByUserId(UserId:string, logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByUserId}/${UserId}?log_id=${logId}`);
  }
}