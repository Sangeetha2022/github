env(projectdetails) ::= <<
CAMUNDA_URL=http://camundasvc:3008
CAMUNDAPOD_URL=http://camunda:8080
SECURITYURL=http://securitymanager:3007
AUTHPROXYURL=http://authproxy:3009
ADMINURL=http://adminmanager:3010
CAMUNDAURL=http://camundasvc:3008
TEMPLATE_MANAGER=http://templatemanager:8002
APIGATEWAY=http://apigateway:3000
MONGO_DB_URL=mongodb://admin:password@mongo:27017/$projectdetails.project_name$?authSource=admin
$if(projectdetails.custom_node)$$projectdetails.custom_node:{custom_node | 
$custom_node.uppername$=http://$custom_node.name$:$custom_node.port$
};separator=""$$endif$
>>