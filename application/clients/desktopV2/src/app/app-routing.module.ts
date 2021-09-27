import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EntityFieldComponent } from './project-component/entity-field/entity-field.component';
import { FeatureDetailsComponent } from './project-component/feature-details/feature-details.component';
import { EntityManagerComponent } from './project-component/project-component.component';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'templates',
    loadChildren: () => import('./template-screen/template-screen.module').then(m => m.TemplateScreenModule)
  },
  {
    path: 'desktopscreen',
    loadChildren: () => import('./screen-designer/screen-designer.module').then(m => m.ScreenDesignerModule)
  },
  { path: 'project-component', component: EntityManagerComponent },
  { path: 'feature-details', component: FeatureDetailsComponent },
  { path: 'entity-field', component: EntityFieldComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
