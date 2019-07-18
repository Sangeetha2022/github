seed(object)   ::= <<
    $if(object)$
    export const resourcetypes = [$\n$$object:{value | 
    {"resources":"$value$"\}
    };separator=",\n"$$\n$]$endif$
>>