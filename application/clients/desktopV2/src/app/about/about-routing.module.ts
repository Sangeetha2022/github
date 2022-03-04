import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpensourceComponent } from './opensource/opensource.component';

const routes: Routes = [{path:'opensource', component:OpensourceComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
