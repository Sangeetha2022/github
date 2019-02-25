import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from '../app.interceptor';
import { I18NextModule } from 'angular-i18next';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule } from '@angular/material';
import { ConnectorManagerComponent } from './connector-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../_services';
import { ModalComponent } from '../_directives';

@NgModule({
  declarations: [
    ConnectorManagerComponent,
    ModalComponent
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
  ],
  exports: [
    ConnectorManagerComponent
  ],
  providers: [
    ModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
  ],
})
export class ConnectorManagerModule { }
