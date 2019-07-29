component_ts(className, object) ::= <<
$if(object.importDependency)$$object.importDependency:{name | import { $name.dependencyname$ \} from '$name.dependencyPath$';};separator="\n"$$endif$
$if(object.importComponent)$$object.importComponent:{name | import { $name.classname$ \} from '$name.path$';};separator="\n"$$endif$

$if(object.scriptVariable)$$object.scriptVariable:{name | declare var $name$: any;};separator="\n"$$endif$
@Component({
  selector: 'app-$object.folderName$',
  templateUrl: './$object.folderName$.component.html',
  styleUrls: ['./$object.folderName$.component.scss']
})
export class $className$Component implements OnInit {
$if(object.componentVariable)$
$object.componentVariable:{name |public $name$;};separator="\n"$
$endif$
  constructor(
$if(object.componentConstructorParams)$$object.componentConstructorParams:{name | $name$};separator="\n"$$endif$
  ) { }

  ngOnInit() {
    $if(object.componentOnInit)$$object.componentOnInit:{name | $name$;};separator="\n"$$endif$
  }

     $if(object.componentMethod)$$object.componentMethod:{name | $name$};separator="\n"$$endif$

}

>>