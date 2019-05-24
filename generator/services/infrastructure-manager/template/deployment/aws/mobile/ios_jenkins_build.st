ios_jenkins_build(project_name,base_path,workspace,code_path,git_url,crt_location,email,api_token) ::= <<
<?xml version='1.1' encoding='UTF-8'?>
<project>
  <actions/>
  <description>Ipa build and push to installr</description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <scm class="hudson.scm.NullSCM"/>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <triggers/>
  <concurrentBuild>false</concurrentBuild>
  <builders>
    <hudson.tasks.Shell>
      <command>#!/bin/bash


BASEPATH=&apos;$base_path$&apos;
WORKSPACE=&apos;$workspace$&apos;
CODEPATH=&apos;$code_path$&apos;
PROJECTNAME=&apos;$project_name$&apos;
CRTLOCATION=&apos;$crt_location$&apos;

GITURL=&apos;$git_url$&apos;

#installr
APITOKEN=&apos;$api_token$&apos;
EMAIL=&apos;$email$&apos;

get_code(){

cd &quot;\$BASEPATH\$WORKSPACE&quot;


if [ ! -d &quot;\$PROJECTNAME&quot; ] ; then
    echo &quot;running git clone..&quot;
    git clone \$GITURL
    if [ \$? -eq 0 ]; then
        echo &quot;git clone sucessfull!&quot;
    else
        echo &quot;git clone failed!&quot;
    fi
else
    echo &quot;code exists!&quot;
    cd \$PROJECTNAME
    git pull
    if [ \$? -eq 0 ]; then
        echo &quot;git pull sucessfull!&quot;
    else
        echo &quot;git pull failed!&quot;
    fi    
fi

}

build_code(){

cd &quot;\$BASEPATH\$WORKSPACE\$CODEPATH&quot;

if [ ! -d &quot;www&quot; ] ; then
    mkdir www
    cordova platform add ios
    if [ \$? -eq 0 ]; then
        echo &quot;ios platform added sucessfully!&quot;
        cordova build ios
        if [ \$? -eq 0 ]; then
            echo &quot;ios build success!&quot;
        else
            echo &quot;ios build failed!&quot;
        fi
    else
        echo &quot;add ios platform failed!&quot;
    fi
else
    cordova platform add ios
    if [ \$? -eq 0 ]; then
        echo &quot;ios platform added sucessfully!&quot;
        cordova build ios
        if [ \$? -eq 0 ]; then
            echo &quot;ios build success!&quot;
        else
            echo &quot;ios build failed!&quot;
        fi
    else
        echo &quot;ios platform already added!&quot;
    fi
fi

}

build_ipa(){
cd platforms/ios/build/emulator/

mkdir ./Payload

cp -R &quot;\$PROJECTNAME.app&quot; ./Payload

cp \$CRTLOCATION Payload/\$PROJECTNAME.app/embedded.mobileprovision

zip -qr &quot;\$PROJECTNAME.ipa&quot; Payload/

rm -rf ./Payload
}

upload_ipa(){

echo &quot;uploading app file to installr..&quot;

UPLOADRESPONSE=`curl -H &quot;X-InstallrAppToken: \$APITOKEN&quot;  https://www.installrapp.com/apps.json -F &quot;qqfile=@\$PROJECTNAME.ipa&quot; -F &apos;releaseNotes=These are the release notes for first app&apos;`
APPID=`echo \$UPLOADRESPONSE | jq -r .appData.id`

echo &quot;app file uploaded appId : \$APPID&quot;

echo &quot;sending email notification..&quot;

EMAILRESPONSE=`curl -H &quot;X-InstallrAppToken: \$APITOKEN&quot; https://www.installrapp.com/apps/\$APPID/builds/latest/team.json -F &quot;notify=\$EMAIL&quot;`
EMAILSTATUS=`echo \$EMAILRESPONSE | jq -r .result`

echo &quot;email status:\$EMAILSTATUS&quot;
}

get_code
build_code
build_ipa
upload_ipa</command>
    </hudson.tasks.Shell>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>
>>