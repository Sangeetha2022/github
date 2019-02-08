import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, ITranslationService, defaultInterpolationFormat,
I18NEXT_NAMESPACE } from 'angular-i18next'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationRef, LOCALE_ID } from '@angular/core';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';
import { ValidationMessageModule } from 'angular-validation-message';
import { I18NextValidationMessageModule } from 'angular-validation-message-i18next';
import { HeaderLanguageComponent } from './header-controls/header.language.component';
import sprintf from 'i18next-sprintf-postprocessor';
import { ProjectsService } from './projects/projects.service';
import { AppComponentService } from './app.component.service';
// import { FlowManagerComponent } from './flow-manager/flow-manager.component';
import {AgGridModule} from "ag-grid-angular";
// import { GeneratonFlowsService } from './generation-flows/generaton-flows.service';
import { ComponentFlowsComponent } from './component-flows/component-flows.component';
import { ComponentFlowsService } from './component-flows/component-flows.service';

import {MatButtonModule} from '@angular/material/button';
import { FlowManagerComponent } from './flow-manager/flow-manager.component';
import { SharedService } from 'src/shared/shared.service';


const i18nextOptions = {
  whitelist: ['en', 'ta', 'es'],
  fallbackLng: ['en', 'ta', 'es'],
  debug: true, // set debug?
  returnEmptyString: false,
  ns: [
    'translation',
    'validation',
    'error'
  ],
  interpolation: {
  format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
 // backend plugin options
  backend: {
  allowMultiLoading: true,
    loadPath: function (langs, ns) {
      return 'assets/locales/{{lng}}/{{ns}}.json';
    }

  },
};

export function appInit(i18next: ITranslationService) {
  return () => {
    const promise: Promise<I18NextLoadResult> = i18next
      .use(i18nextXHRBackend)
      .use(i18nextLanguageDetector)
      .use(sprintf)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HeaderLanguageComponent,
    ComponentFlowsComponent,
    FlowManagerComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    I18NextModule.forRoot(),
    ValidationMessageModule,
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    I18NextValidationMessageModule,
  ],
  providers: [
    AppComponentService,
    ProjectsService,
    ComponentFlowsService,
    I18N_PROVIDERS,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
}
