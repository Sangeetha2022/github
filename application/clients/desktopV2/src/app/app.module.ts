import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {FooterComponent} from './footer/footer.component';
import {LoggerModule} from 'ngx-logger';
import {environment} from 'src/environments/environment';
import {SharedService} from 'src/shared/shared.service';
import {ApiService} from './config/api.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {EntityManagerComponent} from './project-component/project-component.component';
import {FeatureDetailsComponent} from './project-component/feature-details/feature-details.component';
import {ConfigManagerComponent} from './config-manager/config-manager.component';
import {HeaderModule} from './header/header.module';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationHandler,MissingTranslationHandlerParams} from '@ngx-translate/core';
import {ProjectComponentModule} from './project-component/project-component.module';
import {AgGridModule} from 'ag-grid-angular';
import {ConnectorManagerModule} from './techarchitecture-manager/techarchitecture-manager.module';
import {FlowManagerComponent} from './flow-manager/flow-manager.component';
import {MenuBuilderComponent} from './menu-builder/menu-builder.component';
import {TreeDragComponent} from './menu-builder/tree-drag/tree-drag.component';
import {MatTreeModule} from '@angular/material/tree';
import {TemplateManagerComponent} from './template-manager/template-manager.component';
import { AboutModule } from './about/about.module';
export class MyMissingTranslationHandler implements MissingTranslationHandler 
{
  handle(params: MissingTranslationHandlerParams) 
  {
    return JSON.stringify(params);
  }
}

export function httpLoaderfactory(http:HttpClient)
{
  return new TranslateHttpLoader(http);
}

@NgModule
({
  declarations: 
  [
     AppComponent,
     FooterComponent,
     EntityManagerComponent,
     FeatureDetailsComponent,
     ConfigManagerComponent,
     FlowManagerComponent,
     MenuBuilderComponent,
     TreeDragComponent,
     TemplateManagerComponent,
  ],
  imports: 
  [
    ConnectorManagerModule,
    AgGridModule.withComponents([]),
    HeaderModule,
    AboutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatSidenavModule,
    MatFormFieldModule,
    ProjectComponentModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    CKEditorModule,
    LoggerModule.forRoot(environment.logging),
    TranslateModule.forRoot
    ({
      loader:
      {
        provide:TranslateLoader,
        useFactory:httpLoaderfactory,
        deps:[HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
    })
  ],
  providers: [SharedService,ApiService],
  bootstrap: [AppComponent],
})

export class AppModule {}
