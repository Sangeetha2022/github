#!/bin/bash

BASEPATH='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest'

SYSTEMENTRYCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/clients/desktop'
SYSTEMENTRYIMAGENAME='tharanirajan/gep-dev-appbuilder:1.0'

APIGATEWAYCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/apigateway'
APIGATEWAYIMAGENAME='tharanirajan/gep-dev-apigateway:1.0'


SYSTEMENTRYIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-appbuilder | awk '{print $1 }')
APIGATEWAYIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-apigateway | awk '{print $1 }')


echo "Runing....."


update_code () {

cd $BASEPATH

git pull
if [ $? -eq 0 ]; then
    echo "Code updated sucessfully....."
else
    echo "git pull failed!"
fi

}

delete_if_existing_system_entry () {

if [ ! "$SYSTEMENTRYIMAGE" ];
then
  echo "gep-dev-appbuilder:1.0 Image is not available"
else
  echo "Deleting gep-dev-appbuilder:1.0 Image"
  sudo docker rmi -f $SYSTEMENTRYIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_system_entry () {

cd $SYSTEMENTRYCODE
npm install
ng build
if [ $? -eq 0 ]; then
    sudo docker build -t $SYSTEMENTRYIMAGENAME .
    if [ $? -eq 0 ]; then
        echo "image build sucessfully"
        sudo docker push $SYSTEMENTRYIMAGENAME
        if [ $? -eq 0 ]; then
            echo "image gep-dev-appbuilder:1.0 pushed sucessfully"
        else
            echo "image gep-dev-appbuilder:1.0 push failed"
        fi
    else
        echo "gep-dev-appbuilder:1.0 image build failed"
    fi
else
    echo "ng build failed!"
fi
}

delete_if_existing_apigateway () {

if [ ! "$APIGATEWAYIMAGE" ];
then
  echo "gep-dev-apigateway:1.0 Image is not available"
else
  echo "Deleting gep-dev-apigateway:1.0 Image"
  sudo docker rmi -f $APIGATEWAYIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_apigateway () {

cd $APIGATEWAYCODE

sudo docker build -t $APIGATEWAYIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $APIGATEWAYIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-apigateway:1.0 pushed sucessfully"
    else
        echo "image gep-dev-apigateway:1.0 push failed"
    fi
else
    echo "gep-dev-apigateway:1.0 image build failed"
fi

}



update_code
delete_if_existing_apigateway
build_and_push_image_apigateway
delete_if_existing_system_entry
build_and_push_image_system_entry