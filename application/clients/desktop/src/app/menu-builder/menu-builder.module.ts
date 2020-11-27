import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, 
  MatIconModule, MatInputModule, MatTreeModule } from '@angular/material';
import { I18NextModule } from 'angular-i18next';
import { MenuBuilderComponent } from './menu-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeDragComponent } from './tree-drag/tree-drag.component';
import { TreeDragService } from './tree-drag/tree-drag.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    MenuBuilderComponent,
    TreeDragComponent
  ],
  imports: [
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
  exports: [
    MenuBuilderComponent,
    TreeDragComponent
  ],
  providers: [
    TreeDragService
  ]
})
export class MenuBuilderModule { }
