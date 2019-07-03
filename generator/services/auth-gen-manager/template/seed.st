seed(object)   ::= <<
    $if(object)$$object:{value | 
    export const resources = [{"resources":"$value$"],\}
    };separator="\n"$$endif$
>>