env(projectdetails) ::= <<
CAMUNDA_URL=http://camundasvc:8002
CAMUNDAPOD_URL=http://camunda:8080
SECURITYURL=http://securitymanager:8003
AUTHPROXYURL=http://authproxy:8001
ADMINURL=http://adminmanager:8004
APIGATEWAY=http://apigateway:8000
MONGO_DB_URL=mongodb://admin:password@mongo:27017/$projectdetails.project_name$?authSource=admin
$if(projectdetails.custom_node)$$projectdetails.custom_node:{custom_node | 
$custom_node.uppername$=http://$custom_node.name$:$custom_node.port$
};separator=""$$endif$
>>