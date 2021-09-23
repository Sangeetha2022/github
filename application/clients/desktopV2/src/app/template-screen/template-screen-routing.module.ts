import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateScreenComponent } from './template-screen.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateScreenRoutingModule { }
