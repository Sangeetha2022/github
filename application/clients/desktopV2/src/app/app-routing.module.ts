import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FeatureDetailsComponent } from './project-component/feature-details/feature-details.component';
import {HomepageComponent} from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { EntityManagerComponent } from './project-component/project-component.component';
import { ProjectComponent } from './project/project.component';
import { SignupComponent } from './signup/signup.component';
import { TemplateScreenComponent } from './template-screen/template-screen.component';
import { DesktopScreenComponent } from './screen-designer/desktop-screen/desktop-screen.component';

const routes: Routes = [
  
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project-component', component: EntityManagerComponent },
  { path: 'feature-details', component: FeatureDetailsComponent },
  { path: 'templates', component: TemplateScreenComponent },
  { path: 'desktopscreen', component: DesktopScreenComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
