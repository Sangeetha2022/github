import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
import * as socketIo from 'socket.io-client';

@Injectable()
export class ProjectsService {
  public project_Id = null;
  private socket;
  constructor(private http: HttpClient, private api: ApiService, private restapi: SharedService) {
  }

  addProject(proj, logId): Observable<any> {
    return this.api.post(this.restapi.Apigateway + Constants.saveProject + `?log_id=${logId}`, proj);
  }

  getProjectByUserId(UserId, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByUserId}/${UserId}?log_id=${logId}`);
  }

  getProjectByAll(UserId, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByAll}?log_id=${logId}`);
  }

  deleteProjectFlowByProjectId(projectId, logId): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteProjectFlowByProjectId}/${projectId}?log_id=${logId}`);
  }

  deleteProject(id, logId): Observable<any> {
    return this.api.delete(this.restapi.Apigateway + Constants.deleteProject + id + `?log_id=${logId}`);
  }

  createDefaultEntity(projectId: String, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultEntity}/?projectId=${projectId}&log_id=${logId}`);
  }

  createDefaultFeature(projectId: String, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.defaultFeature}/?projectId=${projectId}&log_id=${logId}`);
  }

  createDefaultScreens(projectId: String, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultScreens}/?projectId=${projectId}&`);
  }

  createDefaultMenu(projectId: String, primaryLanguage: String, secondaryLanguage: String, logId: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultMenu}/?projectId=${projectId}&primaryLanguage=${primaryLanguage}&secondaryLanguage=${secondaryLanguage}&log_id=${logId}`);
  }

  updateProjectById(projectId: String, projectDetails: any, logId: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateProjectById}/${projectId}` + `?log_id=${logId}`, projectDetails);
  }

  getProjectById(projectId: String, logId: any): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectById}/${projectId}` + `?log_id=${logId}`);
  }

  getGepTemplate(templateName, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateByName}?template_name=${templateName}&log_id=${logId}`);
  }

  addProjectTemplate(body, logId): Observable<any> {
    return this.api.post(`${this.restapi.Apigateway}${Constants.addProjectTemplate}?log_id=${logId}`, body);
  }

  // websocket connections

  public initSocket(): void {
    this.socket = socketIo(this.restapi.Apigateway);
  }

  public onEvent(event: String): Observable<any> {
    return new Observable<String>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public generateProject(projectgen, logId) {
    return this.http.post(`${this.restapi.Apigateway}${Constants.projectSocket}/${projectgen.project_id}` + `?log_id=${logId}`, projectgen);
  }

  public cloneProject(projectgen, logId) {
    var data = this.http.get(`${this.restapi.Apigateway}${Constants.clonedApplication}/${projectgen.project_id}` + `/user/${projectgen.user_id}` + `?log_id=${logId}`);
    return data;
  }

  // socket
  public getProjectNotify(project_id): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('gen_notify_' + project_id, (data) => {
        console.log("socket data",data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public generateProjectSocket(projectgen): void {
    this.socket.emit('gen_notify', projectgen);
  }

  getAllNotifyProject(project_id, logId): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getAllNotifyProject}/${project_id}` + `?log_id=${logId}`);
  }

  getAllUserNotify(user_id, logId): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getAllUserNotify}/${user_id}?log_id=${logId}`);
  }

  // importSharedServiceYaml(): Observable<any> {
  //   return this.api.post(`${this.restapi.Apigateway}${Constants.sharedAppImport}`)
  // }

  importSharedServiceYaml(fileToUpload: File, user_id): Observable<any> {
    const endpoint = `${this.restapi.Apigateway}${Constants.sharedAppImport}/${user_id}`;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    // console.log("formdata", formData)
    // console.log("filetoupload", fileToUpload)
    fetch(endpoint, {
      method: 'POST',
      body: formData
    })
    return this.api.post(endpoint, formData);
  }
}
