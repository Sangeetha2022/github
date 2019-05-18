#!/bin/bash


BASEPATH='/var/jenkins_home/workspace'
WORKSPACE='/first_ipa_build'
CODEPATH='/First_ionic'
PROJECTNAME='First_ionic'

GITURL='https://tharanirajan:tharanigithub3@github.com/TharaniRajan/First_ionic.git'


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

build_ipa(){

cd "$BASEPATH$WORKSPACE$CODEPATH"

if [ ! -d "www" ] ; then
    mkdir www
    cordova platform add ios
    if [ $? -eq 0 ]; then
        echo "ios platform added sucessfully!"
        cordova build ios --device
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
        cordova build ios --device
        if [ $? -eq 0 ]; then
            echo "ios build success!"
        else
            echo "ios build failed!"
        fi
    else
        echo "add ios platform failed!"
    fi
fi

}


get_code
build_ipa