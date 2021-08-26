import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../app/config/Constant';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public isNotReserveWord:boolean=false;
  public reserveWord = Constants.getConstantReservedWords;
  public regexArray: String[] = this.reserveWord.split(',');

  private projectInfoSource = new BehaviorSubject<any>({});
  currentProjectInfo = this.projectInfoSource.asObservable();

  private projectReserveWordSource = new BehaviorSubject<any>({});
  currentProjectReserveWordInfo = this.projectReserveWordSource.asObservable();


  constructor() { }
  checkNamingConvention(details: any) {
    const res = details.match(/^([a-zA-Z]+([a-zA-Z0-9])*)+$/g);
    this.projectInfoSource.next(res);
}

checkReserveWords(details: any) {
    const findReserveWord = this.regexArray.findIndex(resWords => resWords === details);
    if (findReserveWord > -1) {
        this.isNotReserveWord = true;
    } else {
        this.isNotReserveWord = false;
    }
    this.projectReserveWordSource.next(this.isNotReserveWord);

}
}
