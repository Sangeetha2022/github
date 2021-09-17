import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class ScreenDesignerService {

  constructor(  private http: HttpClient,
    private sharedService: SharedService) { }
  getProjectTemplate(id:any, logId:any) {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getProjectTemplateById}/${id}?log_id=${logId}`);
  }
}
