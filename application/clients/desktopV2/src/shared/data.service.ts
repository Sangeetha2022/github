import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEntity } from 'src/app/project-component/interface/Entity';

@Injectable
({
  providedIn: 'root'
})

export class DataService 
{
  constructor() { }

  private projectInfoSource = new BehaviorSubject<any>({});
  currentProjectInfo = this.projectInfoSource.asObservable();

  // all entity details
  private allEntitySource = new BehaviorSubject<IEntity[]>([]);
  currentAllEntityInfo = this.allEntitySource.asObservable();

  // screen agGrid Field binding info
  private agGridInfoSource = new BehaviorSubject<any[]>([]);
  currentAgGridInfoSource = this.agGridInfoSource.asObservable();

  // set project details
  setProjectInfo(details: any) 
  {
      this.projectInfoSource.next(details);
  }

  // set all entity details
  setAllEntity(entities: IEntity[]) 
  {
      this.allEntitySource.next(entities);
  }

  // screen agGrid Field binding info
  setAgGridValue(agGrid: any[]) 
  {
      this.agGridInfoSource.next(agGrid);
  }

  setMenuBuilder(menuDetails: any) 
  {
    this.menuBuilderSource.next(menuDetails);
  }

  setSelectedMenuInfo(details: any) 
  {
    this.selectedMenuInfoSource.next(details);
  }

  // selected menu info
  private selectedMenuInfoSource = new BehaviorSubject<any>({});
  currentSelectedMenuInfo = this.selectedMenuInfoSource.asObservable();

  // menu deatils
  private menuBuilderSource = new BehaviorSubject<any>('');
  currentMenuBuilderSource = this.menuBuilderSource.asObservable();
}
