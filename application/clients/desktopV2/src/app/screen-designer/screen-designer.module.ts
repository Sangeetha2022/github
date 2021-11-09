import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
import { DesktopScreenComponent } from './desktop-screen/desktop-screen.component';
 import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
 import { NgxSpinnerModule } from 'ngx-spinner';
import { ScreenDesignerRoutingModule } from './screen-designer-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [DesktopScreenComponent],
  imports: [
     CommonModule,
     FormsModule,
     CKEditorModule,
     ReactiveFormsModule,
     NgxSpinnerModule,
     ScreenDesignerRoutingModule,
     AgGridModule.withComponents([]),
  ]
})
export class ScreenDesignerModule { }
