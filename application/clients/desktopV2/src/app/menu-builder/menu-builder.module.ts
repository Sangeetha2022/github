import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { MenuBuilderComponent } from './menu-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeDragComponent } from './tree-drag/tree-drag.component';
import { TreeDragService } from './tree-drag/tree-drag.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule
({
  declarations: 
  [
    MenuBuilderComponent,
    TreeDragComponent
  ],
  imports: 
  [
    AgGridModule.withComponents([]),
    BrowserModule,
    FormsModule,
    MatExpansionModule,
    DragDropModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    I18NextModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    NgxSpinnerModule
  ],
  exports:
  [
    MenuBuilderComponent,
    TreeDragComponent
  ],
  providers: 
  [
    TreeDragService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class MenuBuilderModule { }
