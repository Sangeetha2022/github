import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import {
  I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, ITranslationService, defaultInterpolationFormat,
  I18NEXT_NAMESPACE
} from 'angular-i18next';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationRef, LOCALE_ID } from '@angular/core';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';
import { ValidationMessageModule } from 'angular-validation-message';
import { I18NextValidationMessageModule } from 'angular-validation-message-i18next';
import sprintf from 'i18next-sprintf-postprocessor';
import { ProjectsService } from './projects/projects.service';
import { AppComponentService } from './app.component.service';
import { AgGridModule } from 'ag-grid-angular';
import { ComponentFlowsService } from './component-flows/component-flows.service';
import {
  MatButtonModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatSidenavModule, MatTabsModule, MatSelectModule, MatRadioModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlowManagerComponent } from './flow-manager/flow-manager.component';
import { SharedService } from 'src/shared/shared.service';
import { AppInterceptor } from './app.interceptor';
import { ApiService } from './config/api.service';
import { FlowManagerService } from './flow-manager/flow-manager.service';
import { ScreenDesignerModule } from './screen-designer/screen-designer.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProjectComponentModule } from './project-component/project-component.module';
import { ConfigManagerModule } from './config-manager/config-manager.module';
import { NavigationModule } from './navigation/navigation.module';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentFlowsModule } from './component-flows/component-flows.module';
import { AvailableConnectorComponent } from './available-connector/available-connector.component';
import { LoginComponent } from './login/login.component';
import { ConsentscreenComponent } from './consentscreen/consentscreen.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginService } from './login/loginservice.service';
import { Consentservice } from './consentscreen/consentservice.service';
import { HomepageService } from './homepage/homepage.service';
import { LandingService } from './landingpage/landingservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FeatureDetailsService } from './project-component/feature-details/feature-details.service';
import { MenuBuilderModule } from './menu-builder/menu-builder.module';
// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular-6-social-login';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ProfilesettingsComponent } from './user/profilesettings/profilesettings.component';
import { TemplateScreenComponent } from './template-screen/template-screen.component';
import { TemplateScreenModule } from './template-screen/template-screen.module';

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

// @ts-ignore
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

export function getAuthserviceConfgis() {

  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('888021930791-c0iahj760dsmnua9bfh92hab55kbthi6.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('879601898877087')
    }

  ]);
  return config;
}


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
    FlowManagerComponent,
    AvailableConnectorComponent,
    LoginComponent,
    ConsentscreenComponent,
    HomepageComponent,
    LandingpageComponent,
    AdminComponent,
    UserComponent,
    ProfilesettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    ComponentFlowsModule,
    FormsModule,
    ProjectComponentModule,
    TemplateScreenModule,
    ReactiveFormsModule,
    I18NextModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    ValidationMessageModule,
    DragDropModule,
    MatIconModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatSidenavModule,
    ScreenDesignerModule,
    I18NextValidationMessageModule,
    MatExpansionModule,
    MatFormFieldModule,
    ConfigManagerModule,
    NavigationModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    CKEditorModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MenuBuilderModule,
    SocialLoginModule

  ],
  providers: [
    ApiService,
    FeatureDetailsService,
    AppComponentService,
    ProjectsService,
    FlowManagerService,
    ComponentFlowsService,
    I18N_PROVIDERS,
    SharedService,
    LoginService,
    Consentservice,
    HomepageService,
    LandingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthserviceConfgis
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) { }
}
