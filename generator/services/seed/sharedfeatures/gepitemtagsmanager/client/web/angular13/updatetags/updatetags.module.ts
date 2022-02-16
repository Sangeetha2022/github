import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatetagsComponent } from './updatetags.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './rendered/button-rendered/button-renderer.component';



@NgModule({
  declarations: [
    UpdatetagsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UpdatetagsComponent },
    ])
  ],
  entryComponents: [
    ButtonRendererComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdatetagsModule { }
