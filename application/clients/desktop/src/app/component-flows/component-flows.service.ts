import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// import {flow,flow_component,generation_flow,micro_flow} from '../generation-flows/generation-flows.model'
// import { IFlow } from '../flow-manager/interface/flow';
// import { IFlowComponent } from '../flow-manager/interface/flowComponent';
// import { IGenerateFlow } from '../flow-manager/interface/generationFlow';
import { IMicroFlow } from './interface/microFlow';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const getMFByName = 'http://localhost:3002/microflow/getbycomp';

@Injectable({
  providedIn: 'root'
})

export class ComponentFlowsService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient) {

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  getMicroFlowByName(name: string): Observable<IMicroFlow> {

    const url = `${getMFByName}/${name}`;
    return this.http.get<IMicroFlow>(url).pipe(
      tap(_ => console.log(`fetched project flow component=${name}`)),
      catchError(this.handleError<IMicroFlow>(`getFlowComp name=${name}`))
    );
  }
}
