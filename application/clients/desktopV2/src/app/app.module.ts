import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {HomepageComponent} from './homepage/homepage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {TranslateLoader,TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationHandler,MissingTranslationHandlerParams} from '@ngx-translate/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/shared/shared.service';
import { SignupComponent } from './signup/signup.component';
import { ProjectComponent } from './project/project.component';


export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
      return JSON.stringify(params);
    }
  }
  export function httpLoaderfactory(http:HttpClient){
    return new TranslateHttpLoader(http);
  }

@NgModule({
  declarations: 
  [
     AppComponent,
     HomepageComponent,
     HeaderComponent,
     FooterComponent,
     LoginComponent,
     SignupComponent,
     ProjectComponent,
  ],
  imports: 
  [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpLoaderfactory,
        deps:[HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
    }), 
    LoggerModule.forRoot(environment.logging)
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})

export class AppModule {

}
