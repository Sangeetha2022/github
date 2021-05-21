connector_admin_html(html) ::= <<
    <form>
    <div>
        $if(connector_admin_html.connectors)$$connector_admin_html.connectors:{name | $name$};separator="\n"$$endif$
        <div id="template-iba4" class="row">
            <div id="template-iiohv" class="cell form-group">
                <button id="template-ibfdk" class="button btn" (click)="create()">Create</button>
                <button id="template-i8s2n" class="button btn" (click)="cancel()">Cancel</button>
            </div>
        </div>
    </div>

</form>
>>