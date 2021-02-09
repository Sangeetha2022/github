seed(object)   ::= <<
    $if(object)$
    export const resourcetypes = [$\n$$object:{value | 
    {"resources":"$value$", "role":"Guest"\}
    };separator=",\n"$$\n$]$endif$
>>