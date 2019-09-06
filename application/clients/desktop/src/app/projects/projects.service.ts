import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
import * as socketIo from 'socket.io-client';

@Injectable()
export class ProjectsService {

  private socket;
  constructor(private http: HttpClient, private api: ApiService, private restapi: SharedService) {
  }

  landingpage(body): Observable<any> {
    return this.api.post(this.restapi.loginUrl + '/authorize', body);
  }

  addProject(proj): Observable<any> {
    return this.api.post(this.restapi.Apigateway + Constants.addProjectUrl, proj);
  }

  getMyAllProjects(UserId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllMyProjecturl}/?UserId=${UserId}`);
  }

  deleteProject(id): Observable<any> {
    return this.api.delete(this.restapi.Apigateway + Constants.deleteMyProjectUrl + id);
  }

  createProjectDefaults(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.addProjectDefaults}/?projectId=${projectId}`);
  }

  createDefaultScreens(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.screenUrl}${Constants.addProjectScreenDefault}/?projectId=${projectId}`);
  }

  createDefaultMenu(projectId: String, primaryLanguage: String, secondaryLanguage: String): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.api.get(`${this.restapi.Apigateway}${Constants.defaultMenu}/?projectId=${projectId}&primaryLanguage=${primaryLanguage}&secondaryLanguage=${secondaryLanguage}`);
  }

  updateProjectById(projectId: String, projectDetails: any): Observable<any> {
    return this.api.put(`${this.restapi.Apigateway}${Constants.updateProjectById}/${projectId}`, projectDetails);
  }

  getProjectById(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectById}/${projectId}`);
  }

  // websocket connections

  public initSocket(): void {
    this.socket = socketIo(this.restapi.genmanagerUrl);
  }

  public onEvent(event: String): Observable<any> {
    return new Observable<String>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public generateProject(projectgen) {
    return this.http.post(this.restapi.genmanagerUrl + '/generate/' + projectgen.project_id, projectgen);
  }

  // socket
  public getProjectNotify(project_id) {
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

  getAllNotifyProject(project_id) {
    return this.http.get(this.restapi.genmanagerUrl + '/projectgen/project/' + project_id);
  }

  getAllUserNotify(user_id) {
    return this.http.get(this.restapi.genmanagerUrl + '/projectgen/user/' + user_id);
  }


}
