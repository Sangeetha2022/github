index_html(baseTag, scriptTag) ::= <<
<!doctype html>
<html lang="en">
<head>
$if(baseTag)$$baseTag$$endif$
</head>
<body>
  <app-root></app-root>
  $if(scriptTag)$$scriptTag$$endif$
</body>
</html>
>>