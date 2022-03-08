env(projectdetails,uuid) ::= <<
CAMUNDAPOD_URL=http://camunda-$uuid$:8080
SECURITYURL=http://securitymanager-$uuid$:8003
SYSTEMCREDENTIALMANAGERURL=http://systemcredentialmanager-$uuid$:8005
AUTHPROXYURL=http://authproxy-$uuid$:8001
ADMINURL=http://adminmanager-$uuid$:8004
CAMUNDAURL=http://camundasvc-$uuid$:8002
GCAMURL=http://gcam-$uuid$:8007
APIGATEWAY=http://apigateway-$uuid$:8000
VAULT_URL=http://vault-$uuid$:8200
VAULT_TOKEN=vault-geppetto-2021
MONGO_DB_URL=mongodb://admin:password@mongo-$uuid$:27017/$projectdetails.project_name$?authSource=admin
$if(projectdetails.custom_node)$$projectdetails.custom_node:{custom_node | 
$custom_node.uppername$URL=http://$custom_node.name$-$uuid$:$custom_node.port$
};separator=""$$endif$
>>