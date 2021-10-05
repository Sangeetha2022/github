import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorManagerComponent } from './techarchitecture-manager.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [ConnectorManagerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    ConnectorManagerComponent
  ],
})
export class ConnectorManagerModule { }
