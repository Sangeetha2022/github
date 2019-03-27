import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
import * as socketIo from 'socket.io-client';

@Injectable()
export class ProjectsService {

  private subject: Subject<any>;
  private socket;
  constructor(private http: HttpClient, private router: Router, private api: ApiService, private restapi: SharedService) {
  }

  addProject(proj): Observable<any> {
    return this.api.post(this.restapi.projbaseUrl + Constants.addProjectUrl, proj);
  }

  getMyAllProjects(): Observable<any> {
    return this.api.get(this.restapi.projbaseUrl + Constants.getAllMyProjecturl);
  }

  deleteProject(id): Observable<any> {
    return this.api.delete(this.restapi.projbaseUrl + Constants.deleteMyProjectUrl + id);
  }

  createProjectDefaults(projectId: String): Observable<any> {
    return this.api.get(`${this.restapi.entityUrl}${Constants.addProjectDefaults}/?projectId=${projectId}`);
  }

  updateProjectById(projectId: String, projectDetails: any): Observable<any> {
    return this.api.put(`${this.restapi.projbaseUrl}${Constants.updateProjectById}/${projectId}`, projectDetails);
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
