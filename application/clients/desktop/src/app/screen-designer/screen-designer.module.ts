import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopScreenComponent } from './desktop-screen/desktop-screen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DesktopScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScreenDesignerModule { }
