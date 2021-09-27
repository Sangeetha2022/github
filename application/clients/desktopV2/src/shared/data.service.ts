import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEntity } from 'src/app/project-component/interface/Entity';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private projectInfoSource = new BehaviorSubject<any>({});
  currentProjectInfo = this.projectInfoSource.asObservable();

      // all entity details
      private allEntitySource = new BehaviorSubject<IEntity[]>([]);
      currentAllEntityInfo = this.allEntitySource.asObservable();

   // set project details
   setProjectInfo(details: any) {
   this.projectInfoSource.next(details);
  }
     // set all entity details
     setAllEntity(entities: IEntity[]) {
      this.allEntitySource.next(entities);
  }
}
