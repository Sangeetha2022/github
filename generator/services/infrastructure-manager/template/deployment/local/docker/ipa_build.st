ipa_build(project_name,base_path)::= <<
#!/bin/bash

PROJECTPATH='../../../application/client/mobile/ios/'
CRTLOCATION='/Users/administrator/Documents/IonicTest/output/363e98b5-8a62-4070-9d18-b18dbb5cb7bf.mobileprovision'

PROJECTNAME='$project_name$'

#installr
APITOKEN='4G66wZx1EqiPc8FFZsBlWoR0vHeztFOj'
EMAIL='youremail@gmail.com'

build_code(){

cd "\$PROJECTPATH\$PROJECTNAME"

ionic cordova platform add ios
if [ \$? -eq 0 ]; then
    echo "ios platform added sucessfully!"
    npm i -D -E @ionic/app-scripts
    ionic cordova build ios
    if [ \$? -eq 0 ]; then
        echo "ios build success!"
    else
        echo "ios build failed!"
    fi
else
    echo "add ios platform failed!"
fi

}

build_ipa(){
cd platforms/ios/build/emulator/

mkdir ./Payload

cp -R "\$PROJECTNAME.app" ./Payload

cp \$CRTLOCATION Payload/\$PROJECTNAME.app/embedded.mobileprovision

zip -qr "\$PROJECTNAME.ipa" Payload/

rm -rf ./Payload
}

upload_ipa(){

echo "uploading app file to installr.."

UPLOADRESPONSE=`curl -H "X-InstallrAppToken: \$APITOKEN"  https://www.installrapp.com/apps.json -F "qqfile=@\$PROJECTNAME.ipa" -F 'releaseNotes=These are the release notes for first app'`
APPID=`echo \$UPLOADRESPONSE | jq -r .appData.id`

echo "app file uploaded appId : \$APPID"

echo "sending email notification.."

EMAILRESPONSE=`curl -H "X-InstallrAppToken: \$APITOKEN" https://www.installrapp.com/apps/\$APPID/builds/latest/team.json -F "notify=\$EMAIL"`
EMAILSTATUS=`echo \$EMAILRESPONSE | jq -r .result`

echo "email status:\$EMAILSTATUS"
}

build_code
build_ipa
upload_ipa

>>