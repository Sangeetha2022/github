modify_app_module(modules) ::= <<
$if(modules.importDependency)$$modules.importDependency:{name | $name$};separator="\n"$$endif$

@NgModule({
  declarations: [$\n$$if(modules.declarations)$$modules.declarations:{name | $name$};separator=",\n"$$\n$$endif$],
  imports: [$\n$$if(modules.imports)$$modules.imports:{name | $name$};separator=",\n"$$\n$$endif$],
  providers: [$\n$$if(modules.providers)$$modules.providers:{name | $name$};separator=",\n"$$\n$$endif$],
  bootstrap: [AppComponent]
})
export class $modules.className$Module { }
>>