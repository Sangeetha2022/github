component_html(object) ::= <<
<h2>$object.className$</h2>
$if(object.tag)$$object.tag:{name | $name$};separator="\n"$$endif$
>>  