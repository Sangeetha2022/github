import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
// HttpClient
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { EntityManagerComponent } from './entity-manager.component';
import { EntityFieldComponent } from './entity-field/entity-field.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ButtonRendererComponent } from './entity-field/rendered/button-renderer/button-renderer.component';
import { PopupModelComponent } from './popup-model/popup-model.component';


@NgModule({
  declarations: [
    EntityManagerComponent,
    EntityFieldComponent,
    PopupModelComponent,
    ButtonRendererComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    ButtonRendererComponent,
    PopupModelComponent
  ]
})
export class EntityManagerModule { }
