import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopScreenComponent } from './desktop-screen/desktop-screen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [DesktopScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule
  ]
})
export class ScreenDesignerModule { }
