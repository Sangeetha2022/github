import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { Observable } from 'rxjs';
import { Constants } from '../../config/Constant';

@Injectable
({
  providedIn: 'root'
})

export class FeatureDetailsService 
{
  constructor(private http: HttpClient,private sharedService: SharedService) { }

  getAllWizard(): Observable<any> 
  {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getAllWizard}`);
  }
  deleteWizardById(wizardId:any): Observable<any>
  {
      return this.http.delete(`${this.sharedService.Apigateway}${Constants.deleteWizardById}/${wizardId}`)
  }
  createWizard(wizardData:any):Observable<any>
  {
      return this.http.post(`${this.sharedService.Apigateway}${Constants.createWizard}`,wizardData);
  }
  updateWizardById(wizardData:any):Observable<any>
  {    
    return this.http.put(`${this.sharedService.Apigateway}${Constants.updateWizardById}`,wizardData);
  }
  getWizardById(wizardId:any):Observable<any>
  {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getWizardById}/${wizardId}`);
  }
}