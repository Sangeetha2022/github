component_css(object) ::= <<
// Custom css added //
.wordpressalignment {
    padding: 6em;
    text-align: left;
    margin-right: 1em;
    margin-bottom: 2em;
}

@media only screen and (max-width : 320px) and (max-height : 570px) {
    .wordpressalignment {
		padding: 2em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}

@media only screen and (min-width : 375px) and (max-width : 812px) {
    .wordpressalignment {
		padding: 2em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}

@media only screen and (min-width : 375px) and (max-width : 812px) and (orientation : portrait) {
    .wordpressalignment {
		padding: 2em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}

@media only screen and (min-width : 375px) and (max-width : 667px) {
    .wordpressalignment {
		padding: 2em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}

@media only screen and (min-width : 414px) and (max-width : 736px) and (orientation : landscape) {
    .wordpressalignment {
		padding: 2em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}

@media only screen and (min-width : 414px) and (max-width : 736px) and (orientation : portrait) {
    .wordpressalignment {
		padding: 2em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}


@media only screen and (min-width: 768px) and (max-width: 1024px) {
    .wordpressalignment {
		padding: 0em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }

}


@media only screen and (min-width: 834px) and (max-width: 1112px) {
    .wordpressalignment {
		padding: 0em;
		margin-left: 0em;
		margin-right: 0em;	
        text-align: left;
        margin-bottom: 2em;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
    .wordpressalignment {
        padding-top: 15em;
        margin-left: 7em;
        margin-right: 0em;
        text-align: left;
        margin-bottom: 2em;
    }
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation:portrait) {
    .wordpressalignment {
        padding-top: 15em;
        margin-left: 7em;
        margin-right: 0em;
        text-align: left;
        margin-bottom: 2em;
    }
}

// Wordpress css added below //
$if(object.tag)$$object.tag:{name | $name$};separator="\n"$$endif$
>>