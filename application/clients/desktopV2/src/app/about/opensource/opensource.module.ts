import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from '../about-routing.module';
import { AboutComponent } from '../about.component';
import { TranslateModule } from '@ngx-translate/core';
import { OpensourceComponent } from '../opensource/opensource.component';



@NgModule({
  declarations: [AboutComponent,OpensourceComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    TranslateModule
  ],
  exports: [
    OpensourceComponent
  ]
})
export class OpensourceModule { }
