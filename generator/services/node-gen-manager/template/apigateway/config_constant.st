config_constant(object) ::= <<
$if(object.constantArray)$$object.constantArray:{dependency | export const $dependency.nodeName$ = '$dependency.httpProxy$://$dependency.httpUrl$:$dependency.httpPort$';};separator="\n"$$endif$
>>