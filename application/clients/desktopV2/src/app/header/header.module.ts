import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';

@NgModule({
 
  imports: [
    CommonModule,
    HeaderRoutingModule,
    TranslateModule
  ],
  exports:[
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
