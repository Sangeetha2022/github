component_module(modules) ::= <<
$if(modules.importDependency)$$modules.importDependency:{name | import { $name.dependencyname$ \} from '$name.dependencyPath$';};separator="\n"$$endif$

@NgModule({
  imports: [$if(modules.imports)$$\n$$modules.imports$$\n$$endif$],
  declarations: [$if(modules.declarations)$$\n$$modules.declarations$$\n$$endif$]$if(modules.exports)$,$endif$,
  $if(modules.exports)$exports: [$\n$$modules.exports$$\n$],$endif$
  $if(modules.entryComponents)$entryComponents: [$\n$$modules.entryComponents$$\n$],$endif$
})
export class $modules.className$Module { }
>>