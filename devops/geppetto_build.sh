#!bin/bash

APPLICATION='/geppettotest'

CUSTOMSERVICEPATH='../application/services'

GENERATORSERVICEPATH='../../generator/services'

mongodbPATH='../../../../devops/local/docker/mongodb.js'
DMN='../application/services/Camunda/Gep_authorize.dmn'
DESKTOPCODE='../../../geppettotest/application/clients/desktop'
DESKTOPIMAGENAME='geppettoapp/geppettotest-desktop:1.0'
ENVFILE='../../../.env'

echo "Started to build docker images...."

build_appbuilder_image () {
echo $PWD
cd $DESKTOPCODE
npm install
npm uninstall node-sass
npm install --save-dev node-sas
npm uninstall @angular-devkit/build-angular
npm install @angular-devkit/build-angular@0.12.4
# if directory is exist
[ -d "$(pwd)/dist" ] && rm -rf dist
ng build
docker build -t $DESKTOPIMAGENAME .
if [ $? -eq 0 ]; then
    docker rm -f geppettoapp
    docker run --name geppettoapp -d -p 5050:80 geppettoapp/geppettotest-desktop:1.0
    echo "$DESKTOPIMAGENAME is successfully up"
    # sleep 5
    # docker cp $mongodbPATH mongodb:/data/db/
    # docker exec -ti mongodb mongodb quoteomatictest /data/db/mongodb.js
else
    echo "Image $DESKTOPIMAGENAME-desktop:1.0 failed to up."
fi
}

build_standaloneservices(){
    docker network rm geppetto
    docker network create geppetto
    docker rm -f mongodb
    docker rm -f camunda
    docker run -d --name mongodb -p 27018:27017 --network=geppetto geppettotest/mongo-local:april2020 
    docker run -d --name camunda -p 8080:8080 --network=geppetto geppettotest/camunda-local:april2020 
    sleep 5
    curl -i -X POST -H "Content-Type: multipart/form-data" -F "data=@$DMN" -F "deployment-name=gep_authorize" -F "enable-duplicate-filtering=true" -F "deploy-changed-only=true" http://localhost:8080/engine-rest/deployment/create
}


build_customservices(){


cd $CUSTOMSERVICEPATH


cd featuremanager
docker build -t featuremanager .
if [ $? -eq 0 ]; then
    docker rm -f featuremanager
    docker run --name featuremanager -d -p 3006:3006 --env-file=$ENVFILE --network=geppetto featuremanager 
    echo "featuremanager is successfully up"
    cd ..
else
    echo "Image featuremanager failed to up."
fi


cd entitymanager
docker build -t entitymanager .
if [ $? -eq 0 ]; then
    docker rm -f entitymanager
    docker run --name entitymanager -d -p 3005:3005 --env-file=$ENVFILE --network=geppetto entitymanager 
    echo "entitymanager is successfully up"
    cd ..
else
    echo "Image entitymanager failed to up."
fi



cd flowmanager
docker build -t flowmanager .
if [ $? -eq 0 ]; then
    docker rm -f flowmanager
    docker run --name flowmanager -d -p 3001:3001 --env-file=$ENVFILE --network=geppetto flowmanager 
    echo "flowmanager is successfully up"
    cd ..
else
    echo "Image flowmanager failed to up."
fi



cd microflowmanager
docker build -t microflowmanager .
if [ $? -eq 0 ]; then
    docker rm -f microflowmanager
    docker run --name microflowmanager -d -p 3002:3002 --env-file=$ENVFILE --network=geppetto microflowmanager 
    echo "microflowmanager is successfully up"
    cd ..
else
    echo "Image microflowmanager failed to up."
fi



cd menubuildermanager
docker build -t menubuildermanager .
if [ $? -eq 0 ]; then
    docker rm -f menubuildermanager
    docker run --name menubuildermanager -d -p 3011:3011 --env-file=$ENVFILE --network=geppetto menubuildermanager 
    echo "menubuildermanager is successfully up"
    cd ..
else
    echo "Image menubuildermanager failed to up."
fi



cd screenmanager
docker build -t screenmanager .
if [ $? -eq 0 ]; then
    docker rm -f screenmanager
    docker run --name screenmanager -d -p 3004:3004 --env-file=$ENVFILE --network=geppetto screenmanager 
    echo "screenmanager is successfully up"
    cd ..
else
    echo "Image screenmanager failed to up."
fi



cd securitymanager
docker build -t securitymanager .
if [ $? -eq 0 ]; then
    docker rm -f securitymanager
    docker run --name securitymanager -d -p 3007:3007 --env-file=$ENVFILE --network=geppetto securitymanager 
    echo "securitymanager is successfully up"
    cd ..
else
    echo "Image securitymanager failed to up."
fi



cd Camunda
docker build -t camundasvc .
if [ $? -eq 0 ]; then
    docker rm -f camundasvc
    docker run --name camundasvc -d -p 3008:3008 --env-file=$ENVFILE --network=geppetto camundasvc 
    echo "camundasvc is successfully up"
    cd ..
else
    echo "Image camundasvc failed to up."
fi



cd Auth-Proxy
docker build -t authproxy .
if [ $? -eq 0 ]; then
    docker rm -f authproxy
    docker run --name authproxy -d -p 3009:3009 --env-file=$ENVFILE --network=geppetto authproxy 
    echo "authproxy is successfully up"
    cd ..
else
    echo "Image authproxy failed to up."
fi



cd templatemanager
docker build -t templatemanager .
if [ $? -eq 0 ]; then
    docker rm -f templatemanager
    docker run --name templatemanager -d -p 3012:3012 --env-file=$ENVFILE --network=geppetto templatemanager 
    echo "templatemanager is successfully up"
    cd ..
else
    echo "Image templatemanager failed to up."
fi



cd apigateway
docker build -t apigateway .
if [ $? -eq 0 ]; then
    docker rm -f apigateway
    docker run --name apigateway -d -p 3000:3000 --env-file=$ENVFILE --network=geppetto apigateway 
    echo "apigateway is successfully up"
    cd ..
else
    echo "Image apigateway failed to up."
fi



cd projectmanager
docker build -t projectmanager .
if [ $? -eq 0 ]; then
    docker rm -f projectmanager
    docker run --name projectmanager -d -p 3003:3003 --env-file=$ENVFILE --network=geppetto projectmanager 
    echo "projectmanager is successfully up"
    cd ..
else
    echo "Image projectmanager failed to up."
fi



cd deletetmanager
docker build -t deletemanager .
if [ $? -eq 0 ]; then
    docker rm -f deletemanager
    docker run --name deletemanager -d -p 3014:3014 --env-file=$ENVFILE --network=geppetto deletemanager 
    echo "deletemanager is successfully up"
    cd ..
else
    echo "Image deletemanager failed to up."
fi

}

build_generatorservices(){

cd $GENERATORSERVICEPATH

cd github-manager
docker build -t githubmanager .
if [ $? -eq 0 ]; then
    docker rm -f githubmanager
    docker run --name githubmanager -d -p 5016:5016 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto githubmanager
    echo "githubmanager is successfully up"
    cd ..
else
    echo "Image githubmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd screen-gen-manager
docker build -t screengenmanager .
if [ $? -eq 0 ]; then
    docker rm -f screengenmanager
    docker run --name screengenmanager -d -p 5003:5003 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto screengenmanager
    echo "screengenmanager is successfully up"
    cd ..
else
    echo "Image screengenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd mongo-gen-manager
docker build -t mongogenmanager .
if [ $? -eq 0 ]; then
    docker rm -f mongogenmanager
    docker run --name mongogenmanager -d -p 5011:5011 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto mongogenmanager
    echo "mongogenmanager is successfully up"
    cd ..
else
    echo "Image mongogenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd Admin-manager
docker build -t admingenmanager .
if [ $? -eq 0 ]; then
    docker rm -f admingenmanager
    docker run --name admingenmanager -d -p 5018:5018 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto admingenmanager
    echo "admingenmanager is successfully up"
    cd ..
else
    echo "Image admingenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd node-gen-manager
docker build -t nodegenmanager .
if [ $? -eq 0 ]; then
    docker rm -f nodegenmanager
    docker run --name nodegenmanager -d -p 5012:5012 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto nodegenmanager
    echo "nodegenmanager is successfully up"
    cd ..
else
    echo "Image nodegenmanager failed to up."
fi
-
cd $GENERATORSERVICEPATH

cd datastore-manager
docker build -t datastoremanager .
if [ $? -eq 0 ]; then
    docker rm -f datastoremanager
    docker run --name datastoremanager -d -p 5010:5010 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto datastoremanager
    echo "datastoremanager is successfully up"
    cd ..
else
    echo "Image datastoremanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd infrastructure-manager
docker build -t inframanager .
if [ $? -eq 0 ]; then
    docker rm -f inframanager
    docker run --name inframanager -d -p 5004:5004 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto inframanager
    echo "inframanager is successfully up"
    cd ..
else
    echo "Image inframanager failed to up."
fi


cd $GENERATORSERVICEPATH

cd generation-manager
docker build -t generationmanager .
if [ $? -eq 0 ]; then
    docker rm -f generationmanager
    docker run --name generationmanager -d -p 5000:5000 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto  generationmanager
    echo "generationmanager is successfully up"
    cd ..
else
    echo "Image generationmanager failed to up."
fi


cd $GENERATORSERVICEPATH

cd frontend-gen-manager
docker build -t frontgenmanager .
if [ $? -eq 0 ]; then
    docker rm -f frontgenmanager
    docker run --name frontgenmanager -d -p 5013:5013 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto  frontgenmanager
    echo "frontgenmanager is successfully up"
    cd ..
else
    echo "Image frontgenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd backend-gen-manager
docker build -t backendgenmanager .
if [ $? -eq 0 ]; then
    docker rm -f backendgenmanager
    docker run --name backendgenmanager -d -p 5009:5009 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto  backendgenmanager
    echo "backendgenmanager is successfully up"
    cd ..
else
    echo "Image backendgenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd angular-gen-manager
docker build -t angulargenmanager .
if [ $? -eq 0 ]; then
    docker rm -f angulargenmanager
    docker run --name angulargenmanager -d -p 5014:5014 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto  angulargenmanager
    echo "angulargenmanager is successfully up"
    cd ..
else
    echo "Image angulargenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd angular-template-manager
docker build -t angtemplatemanager .
if [ $? -eq 0 ]; then
    docker rm -f angtemplatemanager
    docker run --name angtemplatemanager -d -p 5015:5015 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto angtemplatemanager
    echo "angtemplatemanager is successfully up"
    cd ..
else
    echo "Image angtemplatemanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd configurationmanager
docker build -t configmanager .
if [ $? -eq 0 ]; then
    docker rm -f configmanager
    docker run --name configmanager -d -p 5001:5001 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto configmanager
    echo "configmanager is successfully up"
    cd ..
else
    echo "Image configmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd auth-gen-manager
docker build -t authgenmanager .
if [ $? -eq 0 ]; then
    docker rm -f authgenmanager
    docker run --name authgenmanager -d -p 5017:5017 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto  authgenmanager
    echo "authgenmanager is successfully up"
    cd ..
else
    echo "Image authgenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd code-gen-manager
docker build -t codegenmanager .
if [ $? -eq 0 ]; then
    docker rm -f codegenmanager
    docker run --name codegenmanager -d -p 5008:5008 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto  codegenmanager
    echo "codegenmanager is successfully up"
    cd ..
else
    echo "Image codegenmanager failed to up."
fi

cd $GENERATORSERVICEPATH

cd ionic-manager
docker build -t ionicmanager .
if [ $? -eq 0 ]; then
    docker rm -f ionicmanager
    docker run --name ionicmanager -d -p 5019:5019 -v generated-code:/geppetto/ --env-file=$ENVFILE --network=geppetto ionicmanager
    echo "ionicmanager is successfully up"
    cd ..
    echo $PWD
else
    echo "Image ionicmanager failed to up."
fi

}


build_standaloneservices
build_customservices
build_generatorservices
build_appbuilder_image


