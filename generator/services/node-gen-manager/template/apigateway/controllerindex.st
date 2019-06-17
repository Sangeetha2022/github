controllerindex(object) ::= <<
$if(object)$$object:{dependency | export * from "./$dependency.className$Controller";};separator="\n"$$endif$
>>