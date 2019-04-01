import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { FlowManagerComponent } from './flow-manager/flow-manager.component';
import { ComponentFlowsComponent } from './component-flows/component-flows.component';
import { DesktopScreenComponent } from './screen-designer/desktop-screen/desktop-screen.component';
import { EntityManagerComponent } from './project-component/project-component.component';
import { EntityFieldComponent } from './project-component/entity-field/entity-field.component';
import { ConfigManagerComponent } from './config-manager/config-manager.component';
import { AvailableConnectorComponent } from './available-connector/available-connector.component';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ConsentscreenComponent } from './consentscreen/consentscreen.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FeatureDetailsComponent } from './project-component/feature-details/feature-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'consent', component: ConsentscreenComponent},
  { path: 'callback', component: ProjectsComponent},
  { path: 'project', component: ProjectsComponent },
  { path: 'flow-component', component: ComponentFlowsComponent },
  { path: 'flow-manager', component: FlowManagerComponent },
  { path: 'available-connector', component: AvailableConnectorComponent },
  { path: 'config-manager', component: ConfigManagerComponent },
  { path: 'desktopscreen', component: DesktopScreenComponent },
  { path: 'project-component', component: EntityManagerComponent },
  { path: 'entity-field', component: EntityFieldComponent },

  // { path: '', redirectTo: 'project', pathMatch: 'full' },
  // { path: '**', redirectTo: 'project', pathMatch: 'full' },

  { path: 'feature-details', component: FeatureDetailsComponent },
  // { path: '', redirectTo: 'project', pathMatch: 'full' },
  // { path: '**', redirectTo: 'project', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
