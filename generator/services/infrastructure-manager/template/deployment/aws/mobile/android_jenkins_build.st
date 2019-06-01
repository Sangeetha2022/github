android_jenkins_build(project_name,base_path,workspace,code_path,git_url,email,api_token) ::= <<
<?xml version='1.1' encoding='UTF-8'?>
<project>
  <actions/>
  <description></description>
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

build_apk(){

cd &quot;\$BASEPATH\$WORKSPACE\$CODEPATH&quot;

ionic cordova platform add android
if [ \$? -eq 0 ]; then
    echo "android platform added sucessfully!"
    ionic cordova build android --device
    if [ \$? -eq 0 ]; then
        echo "android build success!"
    else
        echo "android build failed!"
    fi
else
    echo "add android platform failed!"
fi

}

upload_apk(){

echo &quot;uploading app file to installr..&quot;

cd &apos;platforms/android/app/build/outputs/apk/debug&apos;

UPLOADRESPONSE=`curl -H &quot;X-InstallrAppToken: \$APITOKEN&quot;  https://www.installrapp.com/apps.json -F &quot;qqfile=@app-debug.apk&quot; -F &apos;releaseNotes=These are the release notes for apk app&apos;`
APPID=`echo \$UPLOADRESPONSE | jq -r .appData.id`

echo &quot;app file uploaded appId : \$APPID&quot;

echo &quot;sending email notification..&quot;

EMAILRESPONSE=`curl -H &quot;X-InstallrAppToken: \$APITOKEN&quot; https://www.installrapp.com/apps/\$APPID/builds/latest/team.json -F &quot;notify=\$EMAIL&quot;`
EMAILSTATUS=`echo \$EMAILRESPONSE | jq -r .result`

echo &quot;email status:\$EMAILSTATUS&quot;
}

get_code
build_apk
upload_apk</command>
    </hudson.tasks.Shell>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>
>>