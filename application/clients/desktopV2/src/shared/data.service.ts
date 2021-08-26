import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private projectInfoSource = new BehaviorSubject<any>({});
  currentProjectInfo = this.projectInfoSource.asObservable();

   // set project details
   setProjectInfo(details: any) {
   this.projectInfoSource.next(details);
  }
}
