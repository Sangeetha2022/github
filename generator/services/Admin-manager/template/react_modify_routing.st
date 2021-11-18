react_modify_routing(routing) ::= <<
$if(routing.importDependency)$$routing.importDependency:{name | $name$};separator="\n"$$endif$

let routes: any = [
  $if(routing.path)$$routing.path:{name | $name$};separator=",\n"$$\n$$endif$
];

export default routes;

>>