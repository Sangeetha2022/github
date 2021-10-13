DynamicList(dynamicobject) ::= <<
<div class="$dynamicobject.containerclass$">
  <h1>$dynamicobject.listTitle$</h1>
  <div class="row">
    <div class="$dynamicobject.gridclass$" *ngFor="let item of quote; let i = index">
      <div *ngIf="i < $dynamicobject.maxItem$">
        <h2>{{item.event}}</h2>
        <p>{{item.description}}</p>
        <button type="button" class="btn btn-primary">Know more</button>
      </div>
    </div>
  </div>
</div>
>>