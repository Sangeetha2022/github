app_module_ts(importComponent, importDependency) ::= <<
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
$if(importDependency)$$importDependency:{name | import { $name.dependencyname$ \} from '$name.dependencypath$';};separator="\n"$$endif$
$if(importComponent)$$importComponent:{name | import { $name.classname$Component \} from './$name.foldername$/$name.foldername$.component';};separator="\n"$$endif$

@NgModule({
  declarations: [
    AppComponent,
    $if(importComponent)$$importComponent:{name|$name.classname$Component,};separator="\n"$$endif$
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    $if(importDependency)$$importDependency:{name|$name.modulename$,};separator="\n"$$endif$
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

>>