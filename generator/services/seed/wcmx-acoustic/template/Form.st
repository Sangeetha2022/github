Form(formobject) ::= <<
<h1>$formobject.header.value$</h1>
<form>
    $if(formobject)$$formobject.input:{inputname |
      <div class="form-group">
        <label>$inputname.value$</label> 
        <input type="$inputname.elementType$" class="form-control">
      </div>
    };separator="\n"$$endif$
  <button type="submit" class="btn btn-primary">$formobject.button.linkText$</button>
</form>
>>