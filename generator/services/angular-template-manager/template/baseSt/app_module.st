app_module(modules) ::= <<
$if(modules.importDependency)$$modules.importDependency:{name | import { $name.dependencyname$ \} from '$name.dependencyPath$';};separator="\n"$$endif$

@NgModule({
  declarations: [$if(modules.declarations)$$\n$$modules.declarations$$\n$$endif$],
  imports: [$if(modules.imports)$$\n$$modules.imports$$\n$$endif$],
  providers: [$if(modules.providers)$$\n$$modules.providers$$\n$$endif$],
  bootstrap: [$if(modules.bootstrap)$$\n$$modules.bootstrap$$\n$$endif$]
})
export class $modules.className$Module { }

>>