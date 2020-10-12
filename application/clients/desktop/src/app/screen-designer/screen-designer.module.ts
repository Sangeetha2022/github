import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopScreenComponent } from './desktop-screen/desktop-screen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DesktopScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    CKEditorModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ScreenDesignerModule { }
