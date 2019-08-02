import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { SharedService } from 'src/shared/shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuBuilderService {

  constructor(
    private api: ApiService, private restapi: SharedService

  ) { }

  createMenu(menu: any): Observable<any> {
    return this.api.post(this.restapi.menuUrl + '/menu/save', menu);
  }

  getMenuBuilderByProjectId(id): Observable<any> {
    return this.api.get(this.restapi.menuUrl + '/menu/getbyprojectid/' + id);

  }
  updateMenuById(id, menu): Observable<any> {
    return this.api.put(this.restapi.menuUrl + '/menu/update/' + id, menu);
  }

  updateMenubyProject(id, menu) {
    return this.api.put(this.restapi.menuUrl + '/menu/updatemenubyproject/' + id, menu);
  }
}
