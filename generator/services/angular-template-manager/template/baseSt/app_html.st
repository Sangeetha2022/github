app_html(apphtmlCode) ::= <<
$if(apphtmlCode)$$apphtmlCode:{object | <$object.name$$if(object.isHeaderFooter)$ *ngIf="headerFooter"$endif$></$object.name$>};separator="\n"$$endif$
>>