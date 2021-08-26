import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { SignupComponent } from './signup/signup.component';
import { TemplateScreenComponent } from './template-screen/template-screen.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'templates', component: TemplateScreenComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
