import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class ProjectsService {

  private subject: Subject<any>;
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

}