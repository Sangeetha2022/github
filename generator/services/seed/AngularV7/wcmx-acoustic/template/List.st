List(listobject) ::= <<
<div class="$listobject.listcss$">
    <h2 class="align">$listobject.listheading$</h2>
    <div class="row">
        $if(listobject)$$listobject.listtype:{value |
            <div class="$value.gridclass$">
                <div>
                    <h2>$value.header$</h2>
                    <img class="$value.imageclass$" src="assets/img/$value.image$" >
                    $value.description$
                    <button type="button" class="btn btn-primary">$value.button$</button>
                </div>
            </div> 
        };separator="\n"$$endif$
    </div>
</div>
>>