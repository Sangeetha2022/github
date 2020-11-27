import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from '../app.interceptor';
import { I18NextModule } from 'angular-i18next';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFlowsComponent } from './component-flows.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ComponentFlowsComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    I18NextModule.forRoot(),
    NgxSpinnerModule
  ],
  exports: [
    ComponentFlowsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
  ],
})
export class ComponentFlowsModule { }
