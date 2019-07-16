app_routing(routing) ::= <<
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
$if(routing.isAuthImport)$import { AuthGuard } from './auth.guard';$endif$
$if(routing.importComponent)$$routing.importComponent:{name|import { $name.classname$Component \} from './$name.foldername$/$name.foldername$.component';};separator="\n"$$endif$

const routes: Routes = [
  $if(routing.componentPath)$$routing.componentPath:{name | { path: '$name.path$', component: $name.component$Component$if(name.isAuthProtected)$, canActivate: [AuthGuard]$endif$ \},};separator="\n"$$endif$
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

>>