build_script(project_name,base_path) ::= <<
#!bin/bash

APIGATEWAYCODE='../../application/services/apigateway/'
APIGATEWAYIMAGENAME='$project_name$-apigateway:1.0'

CAMUNDACODE='../camunda/'
CAMUNDAIMAGENAME='$project_name$-camunda:1.0'

AUTHPROXYCODE='../authproxy/'
AUTHPROXYIMAGENAME='$project_name$-authproxy:1.0'

SECURITYCODE='../securitymanager/'
SECURITYIMAGENAME='$project_name$-security:1.0'

ADMINCODE='../adminmanager/'
ADMINIMAGENAME='$project_name$-admin:1.0'

DESKTOPCODE='../../client/desktop/$project_name$/'
DESKTOPIMAGENAME='$project_name$-desktop:1.0'

echo "Started to build docker images for pod...."

build_apigateway_image () {

cd \$APIGATEWAYCODE
docker build -t \$APIGATEWAYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image $project_name$-apigateway:1.0 build successfully loading into kind it take a while..."
    kind load docker-image \$APIGATEWAYIMAGENAME
    echo "\$APIGATEWAYIMAGENAME is successfully loaded into kind"
else
    echo "image $project_name$-apigateway:1.0 build failed"
fi

}

build_camunda_image () {

cd \$CAMUNDACODE
docker build -t \$CAMUNDAIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image $project_name$-camunda:1.0 build successfully loading into kind it take a while..."
    kind load docker-image \$CAMUNDAIMAGENAME
    echo "\$CAMUNDAIMAGENAME is successfully loaded into kind"
else
    echo "image $project_name$-camunda:1.0 build failed"
fi

}

build_authproxy_image () {

cd \$AUTHPROXYCODE
docker build -t \$AUTHPROXYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image $project_name$-authproxy:1.0 build successfully loading into kind it take a while..."
    kind load docker-image \$AUTHPROXYIMAGENAME
    echo "\$AUTHPROXYIMAGENAME is successfully loaded into kind"
else
    echo "image $project_name$-authproxy:1.0 build failed"
fi

}

build_security_image () {

cd \$SECURITYCODE
docker build -t \$SECURITYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image $project_name$-security:1.0 build successfully loading into kind it take a while..."
    kind load docker-image \$SECURITYIMAGENAME
    echo "\$SECURITYIMAGENAME is successfully loaded into kind"
else
    echo "image $project_name$-security:1.0 build failed"
fi

}

build_admin_image () {

cd \$ADMINCODE
docker build -t \$ADMINIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image \$ADMINIMAGENAME build successfully loading into kind it take a while..."
    kind load docker-image \$ADMINIMAGENAME
    echo "\$ADMINIMAGENAME is successfully loaded into kind"
else
    echo "image \$ADMINIMAGENAME build failed"
fi

}

build_appbuilder_image () {

cd \$DESKTOPCODE
npm install
ng build
docker build -t \$DESKTOPIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image $project_name$-desktop:1.0 build successfully loading into kind it take a while..."
    kind load docker-image \$DESKTOPIMAGENAME
    echo "\$DESKTOPIMAGENAME is successfully loaded into kind"
else
    echo "image $project_name$-desktop:1.0 build failed"
fi

}

build_apigateway_image
build_camunda_image
build_authproxy_image
build_security_image
build_admin_image
build_appbuilder_image

>>