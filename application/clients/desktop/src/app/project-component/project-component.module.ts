import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'; // <-- NgModel lives here
// HttpClient
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { EntityManagerComponent } from './project-component.component';
import { EntityFieldComponent } from './entity-field/entity-field.component';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatDialogModule, MatSelectModule,
  MatIconModule,
  MatRadioModule,
  MatCheckboxModule,
  MatTreeModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ButtonRendererComponent } from './entity-field/rendered/button-renderer/button-renderer.component';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { FieldPopupModalComponent } from './entity-field/field-popup-modal/field-popup-modal.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ConnectorManagerModule } from '../techarchitecture-manager/techarchitecture-manager.module';
import { ToastrModule } from 'ngx-toastr';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';
// import { FileSelectDirective } from 'ng2-file-upload';
import { MenuBuilderModule } from '../menu-builder/menu-builder.module';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ScreenPopupComponent } from './screen-popup/screen-popup.component';
import { EntityModelComponent } from './entitypopup-model/entitypop-up/entitypop-up.component';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { FlowTreeComponent } from './feature-details/flow-tree/flow-tree.component';
import { FlowTreeService } from './feature-details/flow-tree/flow-tree.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    EntityManagerComponent,
    EntityFieldComponent,
    PopupModelComponent,
    ButtonRendererComponent,
    FieldPopupModalComponent,
    FeatureDetailsComponent,
    // FileSelectDirective,
    ScreenPopupComponent,
    EntityModelComponent,
    FlowTreeComponent,
    EditPopupComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ConnectorManagerModule,
    MenuBuilderModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    CKEditorModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    AgGridModule.withComponents([]),
    NgxSpinnerModule,
    FileUploadModule
  ],
  entryComponents: [
    ButtonRendererComponent,
    PopupModelComponent,
    ScreenPopupComponent,
    FieldPopupModalComponent,
    EntityModelComponent,
    EditPopupComponent,
  ],
  providers: [
    FlowTreeService,

  ],
  exports: [
    EntityManagerComponent,
  ],
})
export class ProjectComponentModule { }
