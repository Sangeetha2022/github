import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScreenPopupComponent } from './screen-popup/screen-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EntitypopUpComponent } from './entitypop-up/entitypop-up.component';
import { EntityFieldComponent } from './entity-field/entity-field.component';
import { AgGridModule } from 'ag-grid-angular';
import { FieldPopupModalComponent } from './entity-field/field-popup-modal/field-popup-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { ConnectorManagerModule } from '../techarchitecture-manager/techarchitecture-manager.module';

@NgModule
({
  declarations: 
  [
    ScreenPopupComponent,
    EntitypopUpComponent,
    EntityFieldComponent,
    FieldPopupModalComponent,
  ],
  imports: 
  [
    CommonModule,
    ConnectorManagerModule,
    RouterModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    AgGridModule.withComponents([]),
  ],
  exports: [ ],
  entryComponents: 
  [
    ScreenPopupComponent,
  ],
  providers:[  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ProjectComponentModule { }
