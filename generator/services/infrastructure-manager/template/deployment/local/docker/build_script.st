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

HELMPATH = '../../../../devops/'

echo "Started to build docker images for pod...."

build_apigateway_image () {

cd \$APIGATEWAYCODE
docker build -t \$APIGATEWAYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "Image \$APIGATEWAYIMAGENAME build successfully, Now loading into KIND its take a while..."
    kind load docker-image \$APIGATEWAYIMAGENAME
    echo "\$APIGATEWAYIMAGENAME is successfully loaded into kind"
else
    echo "Image \$APIGATEWAYIMAGENAME build failed"
fi

}

build_camunda_image () {

cd \$CAMUNDACODE
docker build -t \$CAMUNDAIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "Image \$CAMUNDAIMAGENAME build successfully, Now loading into KIND its take a while..."
    kind load docker-image \$CAMUNDAIMAGENAME
    echo "\$CAMUNDAIMAGENAME is successfully loaded into kind"
else
    echo "Image \$CAMUNDAIMAGENAME build failed"
fi

}

build_authproxy_image () {

cd \$AUTHPROXYCODE
docker build -t \$AUTHPROXYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "Image \$AUTHPROXYIMAGENAME build successfully, Now loading into KIND its take a while..."
    kind load docker-image \$AUTHPROXYIMAGENAME
    echo "\$AUTHPROXYIMAGENAME is successfully loaded into kind"
else
    echo "Image \$AUTHPROXYIMAGENAME build failed"
fi

}

build_security_image () {

cd \$SECURITYCODE
docker build -t \$SECURITYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "Image \$SECURITYIMAGENAME build successfully, Now loading into KIND its take a while..."
    kind load docker-image \$SECURITYIMAGENAME
    echo "\$SECURITYIMAGENAME is successfully loaded into kind"
else
    echo "Image \$SECURITYIMAGENAME build failed"
fi

}

build_admin_image () {

cd \$ADMINCODE
docker build -t \$ADMINIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "Image \$ADMINIMAGENAME build successfully, now loading into KIND its take a while..."
    kind load docker-image \$ADMINIMAGENAME
    echo "\$ADMINIMAGENAME is successfully loaded into kind"
else
    echo "Image \$ADMINIMAGENAME build failed"
fi

}

build_appbuilder_image () {

cd \$DESKTOPCODE
npm install
npm rebuild node-sass
ng build
docker build -t \$DESKTOPIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "Image \$DESKTOPIMAGENAME build successfully,Now loading into KIND its take a while..."
    kind load docker-image \$DESKTOPIMAGENAME
    echo "\$DESKTOPIMAGENAME is successfully loaded into kind"
else
    echo "Image \$DESKTOPIMAGENAME build failed"
fi

}

helm_install () {

cd \$HELMPATH
helm install --dry-run --debug ./helm
helm install --name helm ./helm
if [ \$? -eq 0 ]; then
    echo "App Deployment is Done,do port-forward to access your app in browser"
else
    echo "App deployment is Failed, there is a problem with helm charts"
fi

}

build_apigateway_image
build_camunda_image
build_authproxy_image
build_security_image
build_admin_image
build_appbuilder_image
helm_install

>>