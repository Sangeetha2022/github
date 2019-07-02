component(object) ::= <<
    $if(object)$$object.name.lower:{value | 
    import{Component, Inject, OnInit\}from '@angular/core';
    import{ Router, NavigationEnd \} from '@angular/router';
    @Component({
        selector: 'app-$value$',
        templateUrl: './$value$.component.html',
        styleUrls: ['./$value$.component.css']
    \}\)
     };separator="\n"$$endif$
     $if(object)$$object.name.upper:{value |
    export class $value$ implements OnInit{

    \}
    };separator="\n"$$endif$
   
>>