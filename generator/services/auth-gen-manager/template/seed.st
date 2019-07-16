seed(object)   ::= <<
export const resourcetypes = 
    $if(object)$$object:{value | 
    [{"resources":"$value$"],\}
    };separator="\n"$$endif$
>>