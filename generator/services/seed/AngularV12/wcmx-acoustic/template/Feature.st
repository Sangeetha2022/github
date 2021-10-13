Feature(featureobject) ::= <<
<div class="row">
  <div class="$featureobject.gridclass$">
    <div class="$featureobject.blockclass$">
      <h1 class="$featureobject.headerclass$">$featureobject.header$</h1>
      $featureobject.description$
      <button type="button" class="$featureobject.buttonclass$"> $featureobject.button$ </button>
    </div>
  </div>
  <div class="$featureobject.gridclass$">
    <p>
      <img class="$featureobject.imageclass$" src="assets/img/$featureobject.image$">
    </p>
  </div>
</div>
>>