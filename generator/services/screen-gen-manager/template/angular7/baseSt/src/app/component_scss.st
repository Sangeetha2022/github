component_scss(style) ::= <<
  $if(style)$$style:{name | $name$};separator="\n"$$endif$
>>