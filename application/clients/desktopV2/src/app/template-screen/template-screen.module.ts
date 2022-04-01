import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateScreenRoutingModule } from './template-screen-routing.module';
import { TemplateScreenComponent } from './template-screen.component';


@NgModule
({
  declarations: [TemplateScreenComponent],
  imports: 
  [
    CommonModule,
    TemplateScreenRoutingModule
  ]
})

export class TemplateScreenModule { }
