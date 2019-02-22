import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigManagerComponent } from './config-manager.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from '../app.interceptor';
import { I18NextModule } from 'angular-i18next';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfigManagerComponent],
  imports: [
    AgGridModule.withComponents([]),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    I18NextModule.forRoot(),    
  ],
  exports: [
    ConfigManagerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
  ],
})
export class ConfigManagerModule { }
