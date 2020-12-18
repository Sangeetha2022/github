admin_html(html) ::= <<
    <div class="card cardmobile">
      <div class="card-header">
        <h2>$html.externalfeaturename$</h2>
      </div>
      <div class="card-body">
        <img class="adminimg" src="assets/img/$html.imagename$" routerLink="/$html.routevalue$">
      </div>
    </div>
>>