component_loader(object) ::=<<
$if(object)$$object:{component | {
    componentId: '$component.value$',
    path: '$component.value$', // some globally-unique identifier, used internally by the router
    loadChildren: () => import('./$component.value$/$component.value$.module').then(m => m.$component.componentName$Module)
  \},};separator="\n"$$endif$
>>