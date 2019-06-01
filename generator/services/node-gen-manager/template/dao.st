dao(object) ::=  <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
export class $object.entityFileName$Dao {
    constructor() { }

}
>> 