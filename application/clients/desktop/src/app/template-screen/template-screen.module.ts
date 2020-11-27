import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateScreenComponent } from './template-screen.component';
import { TemplateScreenService } from './template-screen.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    TemplateScreenComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    TemplateScreenComponent
  ],
  providers: [
    TemplateScreenService
  ]
})
export class TemplateScreenModule { }
