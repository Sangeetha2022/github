modify_app_routing(routing) ::= <<
$if(routing.importDependency)$$routing.importDependency:{name | $name$};separator="\n"$$endif$

const routes: Routes = [
  $if(routing.path)$$routing.path:{name | $name$};separator=",\n"$$\n$$endif$
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

>>