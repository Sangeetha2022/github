#!/bin/bash


BASEPATH='/var/jenkins_home/workspace'
WORKSPACE='/apk_build'
CODEPATH='/firstApp'
PROJECTNAME='firstApp'

GITURL='https://tharanirajan:tharanigithub3@github.com/TharaniRajan/firstApp.git'

#installr
APITOKEN='4G66wZx1EqiPc8FFZsBlWoR0vHeztFOj'
EMAIL='dan.gile@yahoo.com'

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

build_apk(){

cd "$BASEPATH$WORKSPACE$CODEPATH"


ionic cordova platform add android
if [ $? -eq 0 ]; then
    echo "android platform added sucessfully!"
    ionic cordova build android --device
    if [ $? -eq 0 ]; then
        echo "android build success!"
    else
        echo "android build failed!"
    fi
else
    echo "add android platform failed!"
fi

}

upload_apk(){

echo "uploading app file to installr.."

cd 'platforms/android/app/build/outputs/apk/debug'

UPLOADRESPONSE=`curl -H "X-InstallrAppToken: $APITOKEN"  https://www.installrapp.com/apps.json -F "qqfile=@app-debug.apk" -F 'releaseNotes=These are the release notes for apk app'`
APPID=`echo $UPLOADRESPONSE | jq -r .appData.id`

echo "app file uploaded appId : $APPID"

echo "sending email notification.."

EMAILRESPONSE=`curl -H "X-InstallrAppToken: $APITOKEN" https://www.installrapp.com/apps/$APPID/builds/latest/team.json -F "notify=$EMAIL"`
EMAILSTATUS=`echo $EMAILRESPONSE | jq -r .result`

echo "email status:$EMAILSTATUS"
}

get_code
build_apk
upload_apk