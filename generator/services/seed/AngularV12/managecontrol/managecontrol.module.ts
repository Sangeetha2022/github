import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManagecontrolComponent } from './managecontrol.component';
import { I18NextModule } from 'angular-i18next';


@NgModule({
  declarations: [
    ManagecontrolComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ManagecontrolComponent },
    ]),
    I18NextModule.forRoot()
  ]
})
export class ManagecontrolModule { }
