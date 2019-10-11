modify_nginx_conf(object) ::= <<
    location ^~ /$object.url$ {
    rewrite /$object.url$/(.*) /\$1  break;
    proxy_pass https://$object.url$;
    }
>>