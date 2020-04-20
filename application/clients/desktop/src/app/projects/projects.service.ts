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

  addProject(proj): Observable<any> {
    return this.api.post(this.restapi.Apigateway + Constants.saveProject, proj);
  }

  getProjectByUserId(UserId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByUserId}/${UserId}`);
  }


  deleteProjectFlowByProjectId(projectId): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteProjectFlowByProjectId}/${projectId}`);
  }

  deleteProject(id): Observable<any> {
    return this.api.delete(this.restapi.Apigateway + Constants.deleteProject + id);
  }

  createDefaultEntity(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultEntity}/?projectId=${projectId}`);
  }

  createDefaultScreens(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultScreens}/?projectId=${projectId}`);
  }

  createDefaultMenu(projectId: String, primaryLanguage: String, secondaryLanguage: String): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.api.get(`${this.restapi.Apigateway}${Constants.createDefaultMenu}/?projectId=${projectId}&primaryLanguage=${primaryLanguage}&secondaryLanguage=${secondaryLanguage}`);
  }

  updateProjectById(projectId: String, projectDetails: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateProjectById}/${projectId}`, projectDetails);
  }

  getProjectById(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectById}/${projectId}`);
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

  public generateProject(projectgen) {
    return this.http.post(`${this.restapi.Apigateway}${Constants.projectSocket}/${projectgen.project_id}`, projectgen);
  }

  // socket
  public getProjectNotify(project_id): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('gen_notify_' + project_id, (data) => {
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

  getAllNotifyProject(project_id): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getAllNotifyProject}/${project_id}`);
  }

  getAllUserNotify(user_id): Observable<any> {
    return this.http.get(`${this.restapi.Apigateway}${Constants.getAllUserNotify}/${user_id}`);
  }

  // importSharedServiceYaml(): Observable<any> {
  //   return this.api.post(`${this.restapi.Apigateway}${Constants.sharedAppImport}`)
  // }

  importSharedServiceYaml(fileToUpload: File,user_id): Observable<any> {
    const endpoint = `${this.restapi.Apigateway}${Constants.sharedAppImport}/${user_id}`;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    console.log("formdata",formData)
    console.log("filetoupload",fileToUpload)
    fetch(endpoint + 'fileKey', {
      method: 'POST',
      body: formData
    })
    return this.api.post(endpoint,formData);
}
}
