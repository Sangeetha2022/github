#!/bin/bash

BASEPATH='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest'

FLOWMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/flowmanager'
FLOWMANAGERIMAGENAME='tharanirajan/gep-dev-flowmanager:1.0'

MICROFLOWMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/microflowmanager'
MICROFLOWMANAGERIMAGENAME='tharanirajan/gep-dev-microflowmanager:1.0'

PROJECTMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/projectmanager'
PROJECTMANAGERIMAGENAME='tharanirajan/gep-dev-projectmanager:1.0'

SCREENMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/screenmanager'
SCREENMANAGERIMAGENAME='tharanirajan/gep-dev-screenmanager:1.0'

ENTITYMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/entitymanager'
ENTITYMANAGERIMAGENAME='tharanirajan/gep-dev-entitymanager:1.0'

FEATUREMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/featuremanager'
FEATUREMANAGERIMAGENAME='tharanirajan/gep-dev-featuremanager:1.0'

SECURITYMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/securitymanager'
SECURITYMANAGERIMAGENAME='tharanirajan/gep-dev-securitymanager:1.0'

CAMUNDAMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/Camunda'
CAMUNDAMANAGERIMAGENAME='tharanirajan/gep-dev-camundamanager:1.0'

PROXYMANAGERCODE='/var/jenkins_home/workspace/gep-dev-system-entry-pod/geppettotest/application/services/Auth-Proxy'
PROXYMANAGERIMAGENAME='tharanirajan/gep-dev-proxymanager:1.0'


FLOWMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-flowmanager | awk '{print $1 }')
MICROFLOWMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-microflowmanager | awk '{print $1 }')
PROJECTMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-projectmanager | awk '{print $1 }')
SCREENMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-screenmanager | awk '{print $1 }')
ENTITYMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-entitymanager | awk '{print $1 }')
FEATUREMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-featuremanager | awk '{print $1 }')
SECURITYMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-securitymanager | awk '{print $1 }')
CAMUNDAMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-camundamanager | awk '{print $1 }')
PROXYMANAGERIMAGE=$(sudo docker images | awk '{ print $1,$2 }' | grep tharanirajan/gep-dev-proxymanager | awk '{print $1 }')

echo "Started build for app pod....."


update_code () {

cd $BASEPATH

git pull
if [ $? -eq 0 ]; then
    echo "Code updated sucessfully....."
else
    echo "git pull failed!"
fi

}

delete_if_existing_flow_manager () {

if [ ! "$FLOWMANAGERIMAGE" ];
then
  echo "gep-dev-flowmanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-flowmanager:1.0 Image"
  sudo docker rmi -f $FLOWMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_flow_manager () {

cd $FLOWMANAGERCODE
sudo docker build -t $FLOWMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $FLOWMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-flowmanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-flowmanager:1.0 push failed"
    fi
else
    echo "gep-dev-flowmanager:1.0 image build failed"
fi

}

delete_if_existing_microflow_manager () {

if [ ! "$MICROFLOWMANAGERIMAGE" ];
then
  echo "gep-dev-microflowmanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-microflowmanager:1.0 Image"
  sudo docker rmi -f $MICROFLOWMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_microflow_manager () {

cd $MICROFLOWMANAGERCODE

sudo docker build -t $MICROFLOWMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $MICROFLOWMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-microflowmanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-microflowmanager:1.0 push failed"
    fi
else
    echo "gep-dev-microflowmanager:1.0 image build failed"
fi

}

delete_if_existing_project_manager () {

if [ ! "$PROJECTMANAGERIMAGE" ];
then
  echo "gep-dev-projectmanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-projectmanager:1.0 Image"
  sudo docker rmi -f $PROJECTMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_project_manager () {

cd $PROJECTMANAGERCODE

sudo docker build -t $PROJECTMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $PROJECTMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-projectmanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-projectmanager:1.0 push failed"
    fi
else
    echo "gep-dev-projectmanager:1.0 image build failed"
fi

}

delete_if_existing_screen_manager () {

if [ ! "$SCREENMANAGERIMAGE" ];
then
  echo "gep-dev-screenmanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-screenmanager:1.0 Image"
  sudo docker rmi -f $SCREENMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_screen_manager () {

cd $SCREENMANAGERCODE

sudo docker build -t $SCREENMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $SCREENMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-screenmanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-screenmanager:1.0 push failed"
    fi
else
    echo "gep-dev-screenmanager:1.0 image build failed"
fi

}

delete_if_existing_entity_manager () {

if [ ! "$ENTITYMANAGERIMAGE" ];
then
  echo "gep-dev-entitymanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-entitymanager:1.0 Image"
  sudo docker rmi -f $ENTITYMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_entity_manager () {

cd $ENTITYMANAGERCODE

sudo docker build -t $ENTITYMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $ENTITYMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-entitymanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-entitymanager:1.0 push failed"
    fi
else
    echo "gep-dev-entitymanager:1.0 image build failed"
fi

}

delete_if_existing_feature_manager () {

if [ ! "$FEATUREMANAGERIMAGE" ];
then
  echo "gep-dev-featuremanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-featuremanager:1.0 Image"
  sudo docker rmi -f $FEATUREMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_feature_manager () {

cd $FEATUREMANAGERCODE

sudo docker build -t $FEATUREMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $FEATUREMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-featuremanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-featuremanager:1.0 push failed"
    fi
else
    echo "gep-dev-featuremanager:1.0 image build failed"
fi

}


delete_if_existing_security_manager () {

if [ ! "$SECURITYMANAGERIMAGE" ];
then
  echo "gep-dev-securitymanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-securitymanager:1.0 Image"
  sudo docker rmi -f $SECURITYMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_security_manager () {

cd $SECURITYMANAGERCODE

sudo docker build -t $SECURITYMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $SECURITYMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-securitymanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-securitymanager:1.0 push failed"
    fi
else
    echo "gep-dev-securitymanager:1.0 image build failed"
fi

}

delete_if_existing_camunda_manager () {

if [ ! "$CAMUNDAMANAGERIMAGE" ];
then
  echo "gep-dev-camundamanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-camundamanager:1.0 Image"
  sudo docker rmi -f $CAMUNDAMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_camunda_manager () {

cd $CAMUNDAMANAGERCODE

sudo docker build -t $CAMUNDAMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $CAMUNDAMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-camundamanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-camundamanager:1.0 push failed"
    fi
else
    echo "gep-dev-camundamanager:1.0 image build failed"
fi

}


delete_if_existing_proxy_manager () {

if [ ! "$PROXYMANAGERIMAGE" ];
then
  echo "gep-dev-proxymanager:1.0 Image is not available"
else
  echo "Deleting gep-dev-proxymanager:1.0 Image"
  sudo docker rmi -f $PROXYMANAGERIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image_proxy_manager () {

cd $PROXYMANAGERCODE

sudo docker build -t $PROXYMANAGERIMAGENAME .
if [ $? -eq 0 ]; then
    echo "image build sucessfully"
    sudo docker push $PROXYMANAGERIMAGENAME
    if [ $? -eq 0 ]; then
        echo "image gep-dev-proxymanager:1.0 pushed sucessfully"
    else
        echo "image gep-dev-proxymanager:1.0 push failed"
    fi
else
    echo "gep-dev-proxymanager:1.0 image build failed"
fi

}


update_code
delete_if_existing_flow_manager
build_and_push_image_flow_manager
delete_if_existing_microflow_manager
build_and_push_image_microflow_manager
delete_if_existing_project_manager
build_and_push_image_project_manager
delete_if_existing_screen_manager
build_and_push_image_screen_manager
delete_if_existing_entity_manager
build_and_push_image_entity_manager
delete_if_existing_feature_manager
build_and_push_image_feature_manager
delete_if_existing_security_manager
build_and_push_image_security_manager
delete_if_existing_camunda_manager
build_and_push_image_camunda_manager
delete_if_existing_proxy_manager
build_and_push_image_proxy_manager