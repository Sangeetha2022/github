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
import { ProjentitypopUpComponent } from './projentitypop-up/projentitypop-up.component';
import { DeletefeatpopupComponent } from './deletefeatpopup/deletefeatpopup.component';
import { WizardPopupComponent } from './wizard-popup/wizard-popup.component';
import { ShowscreenPopupComponent } from './showscreen-popup/showscreen-popup.component';
import { EditpositionComponent } from './showscreen-popup/editposition/editposition.component';

@NgModule
({
  declarations: 
  [
    ScreenPopupComponent,
    EntitypopUpComponent,
    EntityFieldComponent,
    FieldPopupModalComponent,
    ProjentitypopUpComponent,
    DeletefeatpopupComponent,
    WizardPopupComponent,
    ShowscreenPopupComponent,
    EditpositionComponent,
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
