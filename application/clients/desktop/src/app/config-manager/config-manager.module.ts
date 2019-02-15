import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigManagerComponent } from './config-manager.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from '../app.interceptor';

@NgModule({
  declarations: [ConfigManagerComponent],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class ConfigManagerModule { }
