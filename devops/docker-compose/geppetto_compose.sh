#!bin/bash

DMN='../../application/services/Camunda/Gep_authorize.dmn'

DESKTOPCODE='../../../geppettotest/application/clients/desktop'

COMPOSEPATH='../../../devops/docker-compose/'

ENVPATH='../../.env'

SEED='../../generator/services/seed'


while getopts :cdrs option
do
    case "$option" in
    c)  
         echo "Creating new docker images and containers"
         cd $DESKTOPCODE
         npm install
         npm uninstall node-sass
         npm install --save-dev node-sass
         npm uninstall @angular-devkit/build-angular
         npm install @angular-devkit/build-angular@0.12.4
         # if directory is exist
         [ -d "$(pwd)/dist" ] && rm -rf dist
         ng build
         docker build -t geppettoapp/geppettotest-desktop:1.0 .
         docker run --name geppettoapp -d -p 5050:80 geppettoapp/geppettotest-desktop:1.0
         sleep 10
         echo "UI build is done..."

         cd $COMPOSEPATH
         docker-compose up -d --build 
         sleep 50
         curl -i -X POST -H "Content-Type: multipart/form-data" -F "data=@$DMN" -F "deployment-name=gep_authorize" -F "enable-duplicate-filtering=true" -F "deploy-changed-only=true" http://localhost:8080/engine-rest/deployment/create
         echo "uploading the seed file....."
         sleep 30
         docker exec codegenmanager sh -c "mkdir /geppetto/generated-code; mkdir /geppetto/template;"
         sleep 20
         docker cp $SEED codegenmanager:/geppetto/template/
         echo "seed file copied"
         echo "Process completed"
         ;;
    d)
         echo "Now Deleting all containers and images"
         docker-compose down -v --rmi all 
         echo "Process completed"
         ;;
    r)
         echo "Now Re-starting the stopped containers"
         docker-compose start
         sleep 35
         echo "Process completed"
         ;;
    s)
         echo "Now stopping the running containers"
         docker-compose stop
         echo "Process completed"
         ;;
    *)
        echo "Hmm, an invalid option was received. the valid option are."
        echo "Flag c - To Create new containers and images."
        echo "Flag d - To Delete all the containers and images."
        echo "Flag r - To Restart the stopped containers."
        echo "Flag s - To Stop the running containers."
        echo "Here's the usage statement:"
        echo ""
        echo "bash geppetto_compose.sh -c (or) bash geppetto_compose.sh -d (or) bash geppetto_compose.sh -r (or) bash geppetto_compose.sh -s"
       
        ;;
        esac
done

echo ""
echo "These are the usage options for help."
echo "Flag c - To Create new containers and images."
echo "Flag d - To Delete all the containers and images."
echo "Flag r - To Restart the stopped containers."
echo "Flag s - To Stop the running containers."
echo "Here's the usage statement:"
echo ""
echo "bash geppetto_compose.sh -c (or) bash geppetto_compose.sh -d (or) bash geppetto_compose.sh -r (or) bash geppetto_compose.sh -s"
