#!/bin/bash


BASEPATH='/Users/administrator/.jenkins/workspace'
WORKSPACE='/ipa_build'
CODEPATH='/firstApp'
PROJECTNAME='firstApp'
CRTLOCATION='/Users/administrator/Documents/IonicTest/output/363e98b5-8a62-4070-9d18-b18dbb5cb7bf.mobileprovision'

GITURL='https://tharanirajan:tharanigithub3@github.com/TharaniRajan/firstApp.git'

#installr
APITOKEN='FuSnJyGnAoKvOi62dPeCGT2UTKUNA3N1'
EMAIL='tharanirajan.thamizhmani@10decoders.in'

get_code(){

cd "$BASEPATH$WORKSPACE"


if [ ! -d "$PROJECTNAME" ] ; then
    echo "running git clone.."
    git clone $GITURL
    if [ $? -eq 0 ]; then
        echo "git clone sucessfull!"
    else
        echo "git clone failed!"
    fi
else
    echo "code exists!"
    cd $PROJECTNAME
    git pull
    if [ $? -eq 0 ]; then
        echo "git pull sucessfull!"
    else
        echo "git pull failed!"
    fi    
fi

}

build_code(){

cd "$BASEPATH$WORKSPACE$CODEPATH"

if [ ! -d "www" ] ; then
    mkdir www
    cordova platform add ios
    if [ $? -eq 0 ]; then
        echo "ios platform added sucessfully!"
        cordova build ios
        if [ $? -eq 0 ]; then
            echo "ios build success!"
        else
            echo "ios build failed!"
        fi
    else
        echo "add ios platform failed!"
    fi
else
    cordova platform add ios
    if [ $? -eq 0 ]; then
        echo "ios platform added sucessfully!"
        cordova build ios
        if [ $? -eq 0 ]; then
            echo "ios build success!"
        else
            echo "ios build failed!"
        fi
    else
        echo "ios platform already added!"
    fi
fi

}

build_ipa(){
cd platforms/ios/build/emulator/

mkdir ./Payload

cp -R "$PROJECTNAME.app" ./Payload

cp $CRTLOCATION Payload/$PROJECTNAME.app/embedded.mobileprovision

zip -qr "$PROJECTNAME.ipa" Payload/

rm -rf ./Payload
}

upload_ipa(){

echo "uploading app file to installr.."

UPLOADRESPONSE=`curl -H "X-InstallrAppToken: $APITOKEN"  https://www.installrapp.com/apps.json -F "qqfile=@$PROJECTNAME.ipa" -F 'releaseNotes=These are the release notes for first app'`
APPID=`echo $UPLOADRESPONSE | jq -r .appData.id`

echo "app file uploaded appId : $APPID"

echo "sending email notification.."

EMAILRESPONSE=`curl -H "X-InstallrAppToken: $APITOKEN" https://www.installrapp.com/apps/$APPID/builds/latest/team.json -F "notify=$EMAIL"`
EMAILSTATUS=`echo $EMAILRESPONSE | jq -r .result`

echo "email status:$EMAILSTATUS"
}

get_code
build_code
build_ipa
upload_ipa