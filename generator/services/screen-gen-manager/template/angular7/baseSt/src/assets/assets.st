assets(asset) ::= <<
$if(asset)$$asset:{name | $name$;};separator="\n"$$endif$
>>