app_html(apphtmlCode) ::= <<
$if(apphtmlCode)$$apphtmlCode:{name | <$name$></$name$>};separator="\n"$$endif$
>>