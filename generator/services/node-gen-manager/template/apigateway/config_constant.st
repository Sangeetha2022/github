config_constant(object) ::= <<
$if(object.constantArray)$$object.constantArray:{dependency | export const $dependency.nodeName$ = process.env.$dependency.nodeName$;};separator="\n"$$endif$
>>