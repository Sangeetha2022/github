app_html(apphtmlCode) ::= <<
$if(apphtmlCode)$$apphtmlCode:{object | $if(object.isRouter)$<div [ngClass]="isRouteHome ? 'otherpage':'homepage'">$endif$ <$object.name$$if(object.isHeaderFooter)$ *ngIf="headerFooter"$endif$></$object.name$>$if(object.isRouter)$</div>$endif$};separator="\n"$$endif$
>>