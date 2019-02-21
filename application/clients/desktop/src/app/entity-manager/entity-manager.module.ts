import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
// HttpClient
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { EntityManagerComponent } from './entity-manager.component';
import { EntityFieldComponent } from './entity-field/entity-field.component';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatDialogModule, MatSelectModule,
  MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ButtonRendererComponent } from './entity-field/rendered/button-renderer/button-renderer.component';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { FieldPopupModalComponent } from './entity-field/field-popup-modal/field-popup-modal.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ConnectorManagerModule } from '../connector-manager/connector-manager.module';

@NgModule({
  declarations: [
    EntityManagerComponent,
    EntityFieldComponent,
    PopupModelComponent,
    ButtonRendererComponent,
    FieldPopupModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ConnectorManagerModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    CKEditorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    ButtonRendererComponent,
    PopupModelComponent,
    FieldPopupModalComponent
  ]
})
export class EntityManagerModule { }
