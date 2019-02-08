import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// import {flow,flow_component,generation_flow,micro_flow} from '../generation-flows/generation-flows.model'
import { IFlow } from '../flow-manager/interface/flow';
import { IFlowComponent } from './interface/flowComponents';
// import { IGenerateFlow } from '../flow-manager/interface/generationFlow';
import { IMicroFlow } from './interface/microFlow';
import { IGenerateFlow } from '../flow-manager/interface/generationFlow';
import { SharedService } from 'src/shared/shared.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ComponentFlowsService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient, private restapi:SharedService) {

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
    const url = `${this.restapi.mflowbaseUrl}/microflow/getbycomp/${name}`;
    return this.http.get<IMicroFlow>(url).pipe(
      tap(_ => console.log(`fetched project flow component=${name}`)),
      catchError(this.handleError<IMicroFlow>(`getFlowComp name=${name}`))
    );
  }

  updateFlow(flowObject: IFlow): Observable<any> {
    return this.http.put(this.restapi.flowbaseUrl + '/flow/update', flowObject);
  }
  updateFlowComp(flowObject: IFlowComponent): Observable<any> {
    return this.http.put(this.restapi.flowbaseUrl + '/flow_component/update', flowObject);
  }

  addFlowComp(flowObject): Observable<IFlowComponent> {
    console.log('i am in service');
    return this.http.post<IFlowComponent>(this.restapi.flowbaseUrl + '/flow_component/save', flowObject, httpOptions).pipe(
      tap((tapFlowObject: IFlowComponent) => console.log(`added project w/ id=${tapFlowObject}`)),
      catchError(this.handleError<IFlowComponent>('addGenFlow'))
    );
  }
  addGenFlow(flowObject): Observable<IGenerateFlow> {
    console.log('i am in service');
    return this.http.put<IGenerateFlow>(this.restapi.flowbaseUrl+ '/generation_flow/update', flowObject, httpOptions).pipe(
      tap((tapFlowObject: IGenerateFlow) => console.log(`added project w/ id=${tapFlowObject}`)),
      catchError(this.handleError<IGenerateFlow>('addGenFlow'))
    );
  }

  addMicroFlow(flowObject): Observable<IFlowComponent> {
    return this.http.post<IFlowComponent>(this.restapi.mflowbaseUrl + '/microflow/save', flowObject, httpOptions).pipe(
      tap((tapFlowObject: IFlowComponent) => console.log(`added project w/ id=${tapFlowObject}`)),
      catchError(this.handleError<IFlowComponent>('addGenFlow'))
    );
  }
}
