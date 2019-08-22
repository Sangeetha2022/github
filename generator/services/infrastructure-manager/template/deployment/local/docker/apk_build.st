apk_build(project_name,base_path)::= <<
#!bin/bash

PROJECTPATH='../../../application/client/mobile/android/'
APKPATH='platforms/android/app/build/outputs/apk/debug'

PROJECTNAME='$project_name$'

APITOKEN='4G66wZx1EqiPc8FFZsBlWoR0vHeztFOj'
EMAIL='youremail@gmail.com'

build_apk(){

cd "\$PROJECTPATH\$PROJECTNAME"

cordova platform add android
if [ \$? -eq 0 ]; then
    echo "android platform added sucessfully..!!"
else
    echo "android platform already added..!!"
fi

cordova build android --device
    if [ \$? -eq 0 ]; then
        echo "android build success..!!"
    else
        echo "android build failed..!!"
    fi

}

upload_apk(){

echo "uploading app file to installr..!!"

cd \$APKPATH

UPLOADRESPONSE=`curl -H "X-InstallrAppToken: \$APITOKEN"  https://www.installrapp.com/apps.json -F "qqfile=@app-debug.apk" -F 'releaseNotes=These are the release notes for apk app'`
APPID=`echo \$UPLOADRESPONSE | jq -r .appData.id`

echo "app file uploaded appId : \$APPID"

echo "sending email notification..!!"

EMAILRESPONSE=`curl -H "X-InstallrAppToken: \$APITOKEN" https://www.installrapp.com/apps/\$APPID/builds/latest/team.json -F "notify=\$EMAIL"`
EMAILSTATUS=`echo \$EMAILRESPONSE | jq -r .result`

echo "email status:\$EMAILSTATUS"
echo "Check you e-mail for apk from installr...!"
}

get_code
build_apk
upload_apk

>>