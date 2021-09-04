import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopScreenComponent } from './desktop-screen/desktop-screen.component';

const routes: Routes = [
  {
    path: '',
    component: DesktopScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenDesignerRoutingModule { }
