import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
@Injectable
({
  providedIn: 'root'
})

export class ProjectService 
{
  constructor(private http: HttpClient, private api: ApiService, private restapi: SharedService) { }
  addProject(proj:any, logId:string): Observable<any> 
  {
    return this.api.post(this.restapi.Apigateway + Constants.saveProject + `?log_id=${logId}`, proj);
  }
  getProjectByUserId(UserId:string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByUserId}/${UserId}?log_id=${logId}`);
  }
  getProjectById(projectId: string, logId: string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectById}/${projectId}` + `?log_id=${logId}`);
  }
  getProjectByAll(UserId:string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByAll}?log_id=${logId}`);
  }
  deleteProjectFlowByProjectId(projectId:string, logId:string): Observable<any> 
  {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteProjectFlowByProjectId}/${projectId}?log_id=${logId}`);
  }
  updateProjectById(projectId: String, projectDetails: any, logId: any): Observable<any> 
  {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateProjectById}/${projectId}` + `?log_id=${logId}`, projectDetails);
  }
  deleteProject(id:string, logId:string): Observable<any> 
  {
    return this.api.delete(this.restapi.Apigateway + Constants.deleteProject + id + `?log_id=${logId}`);
  }
  createDefaultEntity(projectId: string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultEntity}/?projectId=${projectId}&log_id=${logId}`);
  }
  createDefaultFeature(projectId: string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.defaultFeature}/?projectId=${projectId}&log_id=${logId}`);
  }
  createDefaultScreens(projectId: string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultScreens}/?projectId=${projectId}&`);
  }
  getGepTemplate(templateName:string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateByName}?template_name=${templateName}&log_id=${logId}`);
  }
  createDefaultMenu(projectId: String, primaryLanguage: String, secondaryLanguage: String, logId: any): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultMenu}/?projectId=${projectId}&primaryLanguage=${primaryLanguage}&secondaryLanguage=${secondaryLanguage}&log_id=${logId}`);
  }
  addProjectTemplate(body:any, logId:string): Observable<any> 
  {
    return this.api.post(`${this.restapi.Apigateway}${Constants.addProjectTemplate}?log_id=${logId}`, body);
  }
  saveManyProjectFlow(data:any, logId:string): Observable<any> 
  {
    return this.api.post(`${this.restapi.Apigateway}${Constants.saveManyProjectFlow}` + `?log_id=${logId}`, data);
  }
  updateFeature(feature: any, logId:string): Observable<any> 
  {
    console.log('calling the updatefeature')
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateFeature}?log_id=${logId}`, feature);
  }
  Updatefeaturedetailsentity(featureid: any, entitydetails: any, logId: any): Observable<any> 
  {
    return this.http.put(`${this.restapi.Apigateway}${Constants.featureUpdateEntity}${featureid}?log_id=${logId}`, entitydetails);
  }
  createSefScreens(projectId: String, featureId: String, data: any,  logId:string): Observable<any> 
  {
    return this.api.post(`${this.restapi.Apigateway}${Constants.createSefScreens}/?projectId=${projectId}&log_id=${logId}&featureId=${featureId}`, data);
  }
  getAllFlows(logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllFlow}?log_id=${logId}`);
  }
  public cloneProject(projectgen:any, logId:string) 
  {
    var data = this.http.get(`${this.restapi.Apigateway}${Constants.clonedApplication}/${projectgen.project_id}` + `/user/${projectgen.user_id}` + `?log_id=${logId}`);
    return data;
  }
}
