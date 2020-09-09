geppetto_compose(projectdetails) ::= <<
#!bin/bash

MONGOPATH='../docker/mongo.js'

# DMN='../../../application/services/default_services/camunda/Gep_authorize2.dmn'

DESKTOPCODE='../../../application/client/desktop/$projectdetails.project_name$'

COMPOSEPATH='../../../../devops/local/docker-compose/'

ACOUSTICSPATH='../../../services/custom_services/wcmx-acoustic/'

CDNMANAGER='../cdn-manager/'

ENVPATH='../../.env'


while getopts :cdrs option
do
    case "\$option" in
    c)  
         echo "Creating new docker images and containers"
         cd \$DESKTOPCODE
         docker build -t $projectdetails.project_name$ui .
         docker run --name $projectdetails.project_name$ui --restart=unless-stopped -d -p 5055:5000 -v applicationnew:/app $projectdetails.project_name$ui
         sleep 15
         echo "UI build is done..."

         cd \$ACOUSTICSPATH
         echo "Building acoustic node...."
         docker build -t acousticmanager .
         docker run --name acousticmanager --restart=unless-stopped -d -p 3015:3015 -v applicationnew:/code --env-file=\$ENVPATH acousticmanager
         cd \$CDNMANAGER
         docker build -t cdnmanager .
         docker run --name cdnmanager --restart=unless-stopped -d -p 3111:3111 -v applicationnew:/code --env-file=\$ENVPATH --link acousticmanager cdnmanager
         cd \$COMPOSEPATH
         docker-compose up -d --build
     #     sleep 30
     #     curl -i -X POST -H "Content-Type: multipart/form-data" -F "data=@\$DMN" -F "deployment-name=gep_authorize" -F "enable-duplicate-filtering=true" -F "deploy-changed-only=true" http://localhost:8080/engine-rest/deployment/create
         echo "uploading the mongo script....."
         sleep 50
         docker cp \$MONGOPATH mongo:/data/db/
         docker exec -ti mongo mongo -u admin -p 'password' --authenticationDatabase 'admin' quoteomatictest /data/db/mongo.js
         sleep 10
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

>>
