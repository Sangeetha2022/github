import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from '../app.interceptor';
import { HeaderLanguageComponent } from './header-controls/header.language.component';
import { HeaderComponent } from './header/header.component';
import { I18NextModule } from 'angular-i18next';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HeaderLanguageComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    I18NextModule.forRoot(),
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
  exports: [
    HeaderLanguageComponent,
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class NavigationModule { }
