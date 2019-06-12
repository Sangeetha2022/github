route(routeObj) ::= <<
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
$if(routeObj.description.screen)$$routeObj.description.screen:{robj | import  $robj$ from './$robj$/$robj$.component';$"\n"$}$$endif$
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  $if(routeObj.description.screen)$$routeObj.description.screen:{robj | { path: '$robj$', component: $robj$Component \},$"\n"$}$$endif$
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

>>