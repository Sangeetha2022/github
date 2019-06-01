import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateScreenComponent } from './template-screen.component';
import { TemplateScreenService } from './template-screen.service';

@NgModule({
  declarations: [
    TemplateScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TemplateScreenComponent
  ],
  providers: [
    TemplateScreenService
  ]
})
export class TemplateScreenModule { }
