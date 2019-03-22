component_ts(className, folderName,
 importDependency, importComponent,
 componentVariable, componentConstructorParams, componentOnInit, componentMethod) ::= <<
import { Component, OnInit } from '@angular/core';
$if(importDependency)$$importDependency:{name | import { $name.dependencyname$ \} from '$name.dependencyPath$';};separator="\n"$$endif$
$if(importComponent)$$importComponent:{name | import { $name.classname$ \} from '$name.path$';};separator="\n"$$endif$

@Component({
  selector: 'app-$folderName$',
  templateUrl: './$folderName$.component.html',
  styleUrls: ['./$folderName$.component.scss']
})
export class $className$Component implements OnInit {
$if(componentVariable)$
$componentVariable:{name |public $name$;};separator="\n"$
$endif$
  constructor(
$if(componentConstructorParams)$$componentConstructorParams:{name | $name$};separator="\n"$$endif$
  ) { }

  ngOnInit() {
    $if(componentOnInit)$$componentOnInit:{name | $name$;};separator="\n"$$endif$
  }

     $if(componentMethod)$$componentMethod:{name | $name$};separator="\n"$$endif$

}

>>