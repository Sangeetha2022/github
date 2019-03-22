app_routing_module_ts(importComponent, componentPath) ::= <<
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

$if(importComponent)$$importComponent:{name|import { $name.classname$Component \} from './$name.foldername$/$name.foldername$.component';};separator="\n"$$endif$

const routes: Routes = [
  $if(componentPath)$$componentPath:{name | { path: '$name.path$', component: $name.component$Component \},};separator="\n"$$endif$
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

>>