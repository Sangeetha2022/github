import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScreenPopupComponent } from './screen-popup/screen-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EntitypopUpComponent } from './entitypop-up/entitypop-up.component';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';


@NgModule({
  declarations: [
    ScreenPopupComponent,
    EntitypopUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports:[

  ],
  entryComponents: [
    ScreenPopupComponent,
  ],
  providers:[

  ]
})
export class ProjectComponentModule { }
