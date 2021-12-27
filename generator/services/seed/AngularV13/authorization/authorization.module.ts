import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../user/button-renderer/button-renderer.component';
import { UpdateauthorizationComponent } from './updateauthorization/updateauthorization.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule,
        AgGridModule.withComponents([]),
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: AuthorizationComponent },
        ])
    ],
    declarations: [
        AuthorizationComponent,
        UpdateauthorizationComponent,
    ],
    // entryComponents: [
    //     ButtonRendererComponent
    // ]
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthorizationModule { }