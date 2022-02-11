import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatetagsComponent } from './createtags.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './rendered/button-rendered/button-renderer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule,
        AgGridModule.withComponents([]),
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: CreatetagsComponent },
        ])
    ],
    declarations: [
        CreatetagsComponent,
    ],
    entryComponents: [
        ButtonRendererComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CreatetagsModule { }