admin_dynamic_html(dynamic_html) ::= <<
<div class="dashboardcard">
  <h2><label>Admin DashBoard</label></h2>
  <div class="accordion indicator-plus-before round-indicator" id="accordionH" aria-multiselectable="true">
    <div class="card m-b-0">
      <div class="card-header collapsed" role="tab" id="headingOneH" href="#userManagement" data-toggle="collapse"
        data-parent="#accordionH" aria-expanded="false" aria-controls="collapseOneH">
        <a class="card-title">{{'source.userManagement' | i18next}}</a>
      </div>
      <div class="collapse" id="userManagement" role="tabpanel" aria-labelledby="headingOneH">
        <div class="card-body">
          <a routerLink="/usermanagement" class="btn btn-primary">{{'source.userManagement' | i18next}}</a>
        </div>
      </div>
      $if(dynamic_html.connectors)$$dynamic_html.connectors:{name | $name$};separator="\n"$$endif$
    </div>
  </div>
</div>
>>