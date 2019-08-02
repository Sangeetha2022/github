component_css(object) ::= <<
$if(object.tag)$$object.tag:{name | $name$};separator="\n"$$endif$
>>