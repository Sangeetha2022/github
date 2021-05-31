connector_admin_component_module(modules) ::= <<
$if(modules.importDependency)$$modules.importDependency:{name | import { $name.dependencyName$ \} from '$name.dependencyPath$';};separator="\n"$$endif$

@NgModule({
  imports: [$\n$$if(modules.imports)$$modules.imports:{name | $name$};separator=",\n"$$\n$$endif$],
  declarations: [$\n$$if(modules.declarations)$$modules.declarations:{name | $name$};separator=",\n"$$\n$$endif$]$if(modules.exports)$,$endif$
  $if(modules.exports)$exports: [$\n$$modules.exports:{name | $name$};separator=",\n"$$\n$]$endif$
})
export class $modules.className$Module { }
>>