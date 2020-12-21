env(projectdetails,uuid) ::= <<
CAMUNDAPOD_URL=http://camunda-$uuid$:8080
SECURITYURL=http://securitymanager-$uuid$:8003
AUTHPROXYURL=http://authproxy-$uuid$:8001
ADMINURL=http://adminmanager-$uuid$:8004
CAMUNDAURL=http://camundasvc-$uuid$:8002
APIGATEWAY=http://apigateway-$uuid$:8000
MONGO_DB_URL=mongodb://admin:password@mongo-$uuid$:27017/$projectdetails.project_name$?authSource=admin
$if(projectdetails.custom_node)$$projectdetails.custom_node:{custom_node | 
$custom_node.uppername$URL=http://$custom_node.name$-$uuid$:$custom_node.port$
};separator=""$$endif$
>>