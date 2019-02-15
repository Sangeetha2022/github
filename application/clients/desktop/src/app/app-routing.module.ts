import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { FlowManagerComponent } from './flow-manager/flow-manager.component';
import { ComponentFlowsComponent } from './component-flows/component-flows.component';
import { DesktopScreenComponent } from './screen-designer/desktop-screen/desktop-screen.component';
import { EntityManagerComponent } from './entity-manager/entity-manager.component';
import { EntityFieldComponent } from './entity-manager/entity-field/entity-field.component';
import { ConfigManagerComponent } from './config-manager/config-manager.component';

const routes: Routes = [
  { path: 'project', component: ProjectsComponent },
  { path: 'flow-component', component: ComponentFlowsComponent },
  { path: 'flow-manager', component: FlowManagerComponent },
  { path: 'config-manager', component: ConfigManagerComponent },
  { path: 'desktopscreen', component: DesktopScreenComponent },
  { path: 'entity', component: EntityManagerComponent },
  { path: 'entity-field', component: EntityFieldComponent },
  { path: '', redirectTo: 'project', pathMatch: 'full' },
  { path: '**', redirectTo: 'project', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
