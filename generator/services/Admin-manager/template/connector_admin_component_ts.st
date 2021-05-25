component_ts(object) ::= <<
$if(object.importDependency)$$object.importDependency:{name | import { $name.dependencyName$ \} from '$name.dependencyPath$';};separator="\n"$$endif$
$if(object.thirdpartyDependency)$$object.thirdpartyDependency:{name | import { $name.dependencyName$\} from '$name.dependencyPath$';};separator="\n"$$endif$
$if(object.importComponent)$$object.importComponent:{name | import { $name.classname$ \} from '$name.path$';};separator="\n"$$endif$
$if(object.importAsteriskDependency)$$object.importAsteriskDependency:{name | import $name.dependencyName$ from '$name.dependencyPath$';};separator="\n"$$endif$

$if(object.scriptVariable)$$object.scriptVariable:{name | declare var $name$: any;};separator="\n"$$endif$
@Component({
  selector: 'app-$object.folderName$',
  templateUrl: './$object.folderName$.component.html',
  styleUrls: ['./$object.folderName$.component.scss'],
})
export class $object.className$Component implements OnInit {
$if(object.componentVariable)$
$object.componentVariable:{name | $name$;};separator="\n"$
$endif$
  constructor(
$if(object.componentConstructorParams)$$object.componentConstructorParams:{name | $name$};separator=",\n"$$endif$
  ) { }

  ngOnInit() {
    $if(object.componentOnInit)$$object.componentOnInit:{name | $name$;};separator="\n"$$endif$
  }

$if(object.componentMethod)$$object.componentMethod:{name | $name$};separator="\n"$$endif$

}
>>
