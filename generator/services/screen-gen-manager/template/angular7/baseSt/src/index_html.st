index_html(title,script, stylesheet) ::= <<
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>$title$</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  $if(stylesheet)$$stylesheet:{name | <link rel="stylesheet" href="$name$" />};separator="\n"$$endif$
</head>
<body>
  <app-root></app-root>
</body>
$if(script)$$script:{name | <script src="$name$"></script>};separator="\n"$$endif$
</html>

>>