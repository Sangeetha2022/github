import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationRef, LOCALE_ID } from '@angular/core';
import { ValidationMessageModule } from 'angular-validation-message';
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
import { FooterComponent } from './navigation/footer/footer.component';
import { ValidatorService } from 'src/shared/validator.service';
import { TranslatorModule } from './translator/translator.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FileUploadModule } from 'ng2-file-upload';


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
      provider: new FacebookLoginProvider('1129416623929960')
    }

  ]);
  return config;
}


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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    ComponentFlowsModule,
    FormsModule,
    ProjectComponentModule,
    TemplateScreenModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    ValidationMessageModule,
    DragDropModule,
    MatIconModule,
    // NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatSidenavModule,
    ScreenDesignerModule,
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
    SocialLoginModule,
    TranslatorModule,
    FileUploadModule
  ],
  providers: [
    ApiService,
    AppComponentService,
    ProjectsService,
    FlowManagerService,
    ComponentFlowsService,
    SharedService,
    LoginService,
    Consentservice,
    HomepageService,
    ValidatorService,
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
